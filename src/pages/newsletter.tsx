import React from "react";
import { Link } from "gatsby"
import NewsletterForm from "../components/newsletter-form";

export default function Newsletter(): JSX.Element {
    return <div className="newsletterPageContainer">
        <Link to="/"><img id="nicoZerpaLogo" alt="Nico Zerpa" src="/images/nicozerpa.svg"/></Link>
        <NewsletterForm/>
    </div>
}