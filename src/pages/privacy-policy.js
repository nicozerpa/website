import React from "react"
import Layout from "../components/layout"

export default function PrivacyPolicy() {
    
    return (
        <Layout title="Privacy Policy">
            <article className="single">
                <h1>Privacy Policy</h1>

                <div className="textContentWidth">
                    <h2>Who we are</h2>
                    <p>My website address is: https://nicozerpa.com.</p>
                    
                    <h2>What personal data we collect and why we collect it</h2>
                    <p>This site doesn’t directly store personal data. However, it uses third-party applications that might collect this kind of information.</p>
                    
                    <h3>Newsletter Subscriptions</h3>
                    <p>When you sign up for my newsletter, I store your first name and your email address in <a href="https://www.convertkit.com">MailChimp</a>, the third-party service that I use to manage my newsletter. This personal information can be used for marketing purposes.</p>
                    <p>Your email address is necessary to be able to send you the newsletter, and the first name is used to customise the emails.</p>
                    <p>I will not sell, loan or give this personal information to any other third-party under absolutely any circumstances.</p>
                    
                    <h3>Embedded content from other websites</h3>
                    <p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>
                    <p>These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.</p>
                    
                    <h3>Analytics</h3>
                    <p>This site uses a third party service, <a rel="noreferrer noopener" href="https://matomo.org/" target="_blank">Matomo</a>, in order to measure visitors and track the site traffic. When you visit my website, Matomo might obtain data that could be considered as personal information.</p>
                    <p>You can opt-out of Matomo tracking below:</p>

                    <iframe
                        title="Matomo opt-out page"
                        style={ {border: "1px solid #999", height: "200px", width: "90vw", maxWidth: "35rem"} }
                        src="https://matomo.nicozerpa.com/index.php?module=CoreAdminHome&amp;action=optOut&amp;language=en&amp;backgroundColor=ffffff&amp;fontColor=&amp;fontSize=&amp;fontFamily=sans-serif"/>

                    
                    <h2>Who we share your data with</h2>
                    <p>As commented before, your personal information is shared with MailChimp. These are the links to their privacy policies:</p>
                    <p>MailChimp: <a href="https://mailchimp.com/legal/privacy/">https://mailchimp.com/legal/privacy/</a></p>
                    <h2>Your contact information</h2>
                    <p>If you have any doubt, you cant contact me via email: <a href="mailto:nico@nicozerpa.com">nico@nicozerpa.com</a>.</p>
                </div>
            </article>
        </Layout>
    )
}