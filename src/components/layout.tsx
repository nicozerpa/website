import React, { useState } from "react"
import { Link } from "gatsby"
import navLinks from "../resources/navbar.js"
import { Helmet } from "react-helmet"

function contactEmail() {
    window.location.href = "mailto:nico@nicozerpa.com";
}

function headerNavItems() {
    return navLinks
            .filter(item => item.in === "all" || item.in === "header")
            .map(item => <Link key={ item.url } to={ item.url } onClick={ event => event.stopPropagation() }>{ item.label }</Link>)
}

function mobileNavMenu(toggleMobileMenu: any, mobileMenuMarginRight: number, setMobileMenuMarginRight) {
    setTimeout(() => {
        setMobileMenuMarginRight(0)
    }, 50);
    return (
        <div className="mobileMenu">
            <div
                aria-hidden="true"
                onClick={ toggleMobileMenu }
                onKeyPress={ toggleMobileMenu }
                className="mobileMenuBg">
            </div>
            <nav role="region" aria-label="Menu Bar" style={ { marginRight: `${mobileMenuMarginRight}vw` } }>
                <div className="mobileMenuScroll">{ headerNavItems() }</div>
                <button
                    onClick={ toggleMobileMenu }
                    className="mobileCloseMenu"
                    type="button">Close</button>
            </nav>
        </div>
    )
}

interface LayoutProps {
    className ?: string,
    title ?: string,
    children ?: React.ReactNode
}

export default function Layout({ className, title, children }: LayoutProps) {

    const copyrightYear : number = 2021;
    const currentYear : number = (new Date()).getFullYear();

    let copyrightString : string = `${copyrightYear}`

    if (copyrightYear !== currentYear) {
        copyrightString += `-${currentYear}`
    }

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileMenuMarginRight, setMobileMenuMarginRight] = useState(-45)

    const toggleMobileMenu = function() : void {
        setMobileMenuOpen(!mobileMenuOpen)
        setMobileMenuMarginRight(!mobileMenuOpen ? -45 : 0)
    }
    
    return (
        <div className={className || ""}>
            <Helmet htmlAttributes={ {lang: "en"} }>
                <title>{ title ? `${title} – ` : ""}Nico Zerpa, Your JavaScript Friend</title>
            </Helmet>
            <div className="contentWidth headerContentWidth">
                <header>
                    <Link to="/">
                        <img id="nicoZerpaLogo" alt="Nico Zerpa" src="/images/nicozerpa.svg"/>
                    </Link>
                    <button className="mobileMenuButton" type="button" onClick={ toggleMobileMenu }>Menu</button>
                    { !mobileMenuOpen && <nav role="region" aria-label="Top Menu Bar">{ headerNavItems() }</nav> }
                </header>
            </div>
            { mobileMenuOpen && mobileNavMenu(toggleMobileMenu, mobileMenuMarginRight, setMobileMenuMarginRight) }
            

            <main>
                { children }
            </main>
            <footer>
                <nav role="region" aria-label="Bottom Menu Bar">
                    {
                        navLinks
                            .filter(item => item.in === "all" || item.in === "footer")
                            .map(item => <Link key={ item.url } to={ item.url }>{ item.label }</Link>)
                    }
                </nav>
                <div>© { copyrightString } Nico Zerpa. All rights reserved.</div>
                <div>
                    You can get in touch with me at:
                    <button onClick={ contactEmail } id="emailFooterButton" type="button">
                        <picture>
                            <source srcSet="/images/emailaddress@2x.png, /nzblogtheme/images/emailaddress@2x.png 1x"/>
                            <img src="/images/emailaddress.png" alt="nico&shy; [a&shy;t]&shy; nicozerpa.com" id="emailFooterImage"/>
                        </picture>
                    </button>
                </div>
            </footer>
        </div>
    )
}