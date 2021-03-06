import React from "react"

interface NewsletterFormProps {
    includeCopy ?: boolean,
    copyTitle ?: string,
    copyDescription ?: string
}



export default function NewsletterForm({
    includeCopy = true,
    copyTitle = "Become a Better JavaScript Developer",
    copyDescription = "Easy, actionable steps to level up your JavaScript skills, right to your inbox. Enter your name and Email address below to subscribe:"
} : NewsletterFormProps) : JSX.Element {

    return (
        <form
            action="https://nicozerpa.us4.list-manage.com/subscribe/post?u=ec0f3452bbe2aefc374876e6c&amp;id=231939e8e0"
            method="post"
            target="_blank"
            className="newsletterForm">

            { includeCopy && copyTitle && <h3>{copyTitle}</h3> }
            { includeCopy && copyDescription && <p>{copyDescription}</p> }
            
            <div className="newsletterFormFields">
                <label className="newsletterFormFieldRow">
                    <span className="newsletterFormLabel">First Name *</span>
                    <input type="text" name="FNAME" required={ true }/>
                </label>
                <label className="newsletterFormFieldRow">
                    <span className="newsletterFormLabel">Email Address *</span>
                    <input type="email" name="EMAIL" required={ true }/>
                </label>
            </div>
            <div style={ {position: "absolute", left: "-5000px"} } aria-hidden="true">
                <input type="text" name="b_ec0f3452bbe2aefc374876e6c_231939e8e0" tabIndex={ -1 } defaultValue=""/>
            </div>
            
            <div className="newsletterFormButtons">
                <input type="submit" readOnly value="Subscribe" name="subscribe" className="button"/>
            </div>
        </form>
    )
}