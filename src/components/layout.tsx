import React, { useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head";
import navLinks from "../resources/navbar.js"

interface LayoutProps {
    className ?: string,
    title ?: string,
    children ?: React.ReactNode
}


export default function Layout({ className, title, children }: LayoutProps) : JSX.Element {

    const copyrightYear = 2021;
    const currentYear : number = (new Date()).getFullYear();

    let copyrightString = `${copyrightYear}`

    if (copyrightYear !== currentYear) {
        copyrightString += `-${currentYear}`
    }

    const [darkMode, setDarkMode] = useState(false)

    useEffect(function() {
        let newDarkMode : boolean;
        const darkModeFromLocalStorage = localStorage.getItem("darkMode")

        if (darkModeFromLocalStorage === null) {
            newDarkMode = matchMedia("(prefers-color-scheme: dark)").matches
        } else {
            newDarkMode = darkModeFromLocalStorage == "1"
        }
        
        if (newDarkMode) document.documentElement.classList.add("darkMode");
        
        setDarkMode(newDarkMode);
    }, []);

    const toggleDarkMode = function() {
        localStorage.setItem("darkMode", darkMode ? "0" : "1")
        setDarkMode(!darkMode);

        if (!darkMode) document.documentElement.classList.add("darkMode");
        else document.documentElement.classList.remove("darkMode");
    }

    const navLinksContent : React.ReactNode = navLinks 
            .filter(item => item.in === "all" || item.in === "header")
            .map(item => <Link key={ item.url } href={ item.url }>{ item.label }</Link>)
    /*<html lang="en" className={ darkMode ? "darkMode" : "" }/>lelele*/
    return (
        <div className={className || ""}>
            <Head>
                <title>{ title ? `${title} – ` : ""}Nico Zerpa, Your JavaScript Friend</title>
                <meta name="description" content="Whether you’re a beginner or advanced, I’ll help you level up your JavaScript skills"/>
                <link rel="alternate" type="application/rss+xml" title="Nico Zerpa RSS Feed"  href="/rss.xml" />
            </Head>
            <div className="contentWidth headerContentWidth">
                <header>
                    <Link href="/">
                        <img id="nicoZerpaLogo" alt="Nico Zerpa" src="/images/nicozerpa.svg"/>
                    </Link>
                    <nav role="region" aria-label="Top Menu Bar">
                        <button className="mobileMenuButton" type="button">Menu</button>
                        <div className="mobileMenuContainer" onClick={ event => event.stopPropagation() }>
                            { navLinksContent }
                            
                            <button
                                id="toggleDarkMode"
                                title={darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
                                onClick={ toggleDarkMode }>
                                <div className="innerDiv"/>
                            </button>
                        </div>
                    </nav>
                </header>
            </div>
            

            <main>
                { children }
            </main>
            <footer>
                <nav role="region" aria-label="Bottom Menu Bar">
                    {
                        navLinks
                            .filter(item => item.in === "all" || item.in === "footer")
                            .map(item => <Link key={ item.url } href={ item.url }>{ item.label }</Link>)
                    }
                </nav>
                <div>© { copyrightString } Nico Zerpa. All rights reserved.</div>
                <div>
                    You can get in touch with me at: <a href="mailto:nico@nicozerpa.com">nico@nicozerpa.com</a>
                    .
                </div>
            </footer>
        </div>
    )
}
