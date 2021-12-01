import React from "react";
import Link from "next/link"
import NewsletterForm from "../components/newsletter-form";

export default function Newsletter(): JSX.Element {
    return <div className="newsletterPageContainer">
        <Link href="/"><img id="nicoZerpaLogo" alt="Nico Zerpa" src="/images/nicozerpa.svg"/></Link>
        <NewsletterForm/>
    </div>
}