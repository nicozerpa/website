import React, { useState } from "react"
import { Helmet } from "react-helmet"
import "../styles/codePage.scss"


function updateCode(setCode : React.Dispatch<React.SetStateAction<string>>, element : HTMLPreElement) {
    element.querySelectorAll<HTMLElement>("*").forEach((element : HTMLElement) : void => {
        element.style.fontSize = "0.9rem"
        element.style.lineHeight = "1.2em"
    })
    setCode(element.innerHTML)
}

export default function Code() : JSX.Element {
    const [code, setCode] = useState<string>("")

    return <div className="codePage">
        <Helmet htmlAttributes={ { id: "codePage" } }/>

        <pre contentEditable={true} onInput={ (event) => updateCode(setCode, event.target as HTMLPreElement) }></pre>
        <pre>{ code }</pre>
    </div>
}