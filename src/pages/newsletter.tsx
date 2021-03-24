import React from "react"
import Layout from "../components/layout"
import NewsletterForm from "../components/newsletter-form"

export default function NewsletterPage() : JSX.Element {
    return (
        <Layout>
            <article className="single">
                <h1>Become a Better JavaScript Developer</h1>
                <div className="textContentWidth">
                    <p>Easy, actionable steps to level up your JavaScript skills, right to your inbox every week. Enter your name and Email address below to subscribe:</p>
                </div>
                <NewsletterForm includeCopy={ false }/>
            </article>
        </Layout>
    )
}