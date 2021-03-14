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

function mobileNavMenu(toggleMobileMenu, mobileMenuMarginRight, setMobileMenuMarginRight) {
    setTimeout(() => {
        setMobileMenuMarginRight(0)
    }, 50);
    return (
        <div className="mobileMenu">
            <button
                aria-hidden="true"
                onClick={ toggleMobileMenu }
                className="mobileMenuBg">
            </button>
            <nav style={ { marginRight: `${mobileMenuMarginRight}vw` } }>
                <div className="mobileMenuScroll">{ headerNavItems() }</div>
                <button
                    onClick={ toggleMobileMenu }
                    className="mobileCloseMenu"
                    type="button">Close</button>
            </nav>
        </div>
    )
}

export default function Layout({ className, title, children }) {
    
    let copyrightYear = 2021;
    const currentYear = (new Date()).getFullYear();

    if (copyrightYear !== currentYear) {
        copyrightYear += `-${currentYear}`
    }

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mobileMenuMarginRight, setMobileMenuMarginRight] = useState(-45)

    const toggleMobileMenu = function() {
        setMobileMenuOpen(!mobileMenuOpen)
        setMobileMenuMarginRight(!mobileMenuOpen ? -45 : 0)
    }
    
    const headerNavItemsOutput = mobileNavMenu(toggleMobileMenu, mobileMenuMarginRight, setMobileMenuMarginRight);

    return (
        <div className={className || ""}>
            <Helmet>
                <title>{ title ? `${title} – ` : ""}Nico Zerpa, Your JavaScript Friend</title>
            </Helmet>
            <div className="contentWidth headerContentWidth">
                <header>
                    <Link to="/">
                        <img id="nicoZerpaLogo" alt="Nico Zerpa" src="/images/nicozerpa.svg"/>
                    </Link>
                    <button className="mobileMenuButton" type="button" onClick={ toggleMobileMenu }>Menu</button>
                    { !mobileMenuOpen && <nav>{ headerNavItemsOutput }</nav> }
                </header>
            </div>
            { mobileMenuOpen && headerNavItemsOutput }
            

            <main>
                { children }
            </main>
            <footer>
                <nav>
                    {
                        navLinks
                            .filter(item => item.in === "all" || item.in === "footer")
                            .map(item => <Link key={ item.url } to={ item.url }>{ item.label }</Link>)
                    }
                </nav>
                <div>© { copyrightYear } Nico Zerpa. All rights reserved.</div>
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
