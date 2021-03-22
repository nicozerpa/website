"use strict"

import { spawn } from "child_process"
import { unlinkSync, createReadStream, createWriteStream, readFileSync} from "fs"
import { pack } from "tar-fs"
import { createGzip } from "zlib"
import { pipeline } from "stream"
import { promisify } from "util"
import { NodeSSH } from "node-ssh"
import { fileURLToPath } from "url"
import { dirname as nodeDirName } from "path"

const dirname = nodeDirName(nodeDirName(fileURLToPath(import.meta.url)))
process.chdir(dirname)

const config = JSON.parse(readFileSync("config/deploy.json"))


const pipelineP = promisify(pipeline)



function cmd(command, params = []) {

    console.log(`$ ${command} ${JSON.stringify(params)}`)

    const output = new Promise(function(resolve, reject) {
        const commandOutput = spawn(command, params, {detached: false, shell: true })
        commandOutput.stdout.on("data", function(data) {
            process.stdout.write(data.toString())
        })
        commandOutput.stderr.on("data", function(data) {
            process.stderr.write(data.toString())
        })
        
        commandOutput.on("close", function(errCode) {
            if (errCode == 0) {
                resolve(errCode, command, params)
            } else {
                reject(errCode, command, params)
            }
        })
    })

    return output;
}


function createTarball(filename, dirToCompress) {
    return new Promise(function(resolve, reject) {

        const tarStream = pack(".", {
            entries: [dirToCompress],
            dmode: parseInt(755, 8),
            fmode: parseInt(644, 0)
        })
        
        tarStream.pipe(createWriteStream(`${filename}.tar`))
        
        tarStream.on("end", async () => {

            const gzip = createGzip()
            const gzipSource = createReadStream(`${filename}.tar`)
            const gzipDestination = createWriteStream(`${filename}.tar.gz`)

            const output = await pipelineP(gzipSource, gzip, gzipDestination)

            unlinkSync(`${filename}.tar`)

            resolve(output)
        })
    })
}

async function main() {
    try {
        console.log("1) BUILDING");
        await cmd(`${dirname}/node_modules/.bin/gatsby`, ["build"])

        console.log("2) CREATING TARBALL");
        await createTarball("nicozerpacom", "public/");
        
        console.log("3) SENDING TARBALL");
        const ssh = new NodeSSH()

        await ssh.connect({
            "host": "direct.nicozerpa.com",
            "username": "nicolas",
            "privateKey": `${dirname}/config/${config.sshIdentityFile}`
        })

        await ssh.putFile(
            "nicozerpacom.tar.gz",
            "/home/nicolas/nicozerpa.com/nicozerpacom.tar.gz"
        )

        console.log("4) UNPACKING REMOTE TARBALL");
        await ssh.execCommand("/home/nicolas/nicozerpa.com/deploy.sh")

        ssh.dispose()

        console.log("5) REMOVING LOCAL TARBALL");
        unlinkSync("nicozerpacom.tar.gz")


    } catch(e) {
        console.error(e);
    }
}

main()