import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"

export default function AboutMe() {
    
    const now = new Date();
    const nowYear = now.getFullYear();
    const nowMonthDay = (now.getMonth() + 1) * 100 + now.getDay();

    let myAge = nowYear - 1989;

    if (nowMonthDay < 1224) {
        myAge--;
    }

    return (
        <Layout title="About Me">
            <article className="single">
                <h1>About Me</h1>

                <figure className="aboutMeImage">
                    <img
                        loading="lazy"
                        src="/image/Yo_Linkedin.png"
                        alt="Nico Zerpa"
                        srcSet="/images/Yo_Linkedin.png 500w, /images/Yo_Linkedin-300x300.png 300w, /images/Yo_Linkedin-150x150.png 150w"
                        sizes="(max-width: 230px) 100vw, 230px"/>
                </figure>

                <div className="textContentWidth">
                    <p><strong>¡Hola!</strong> <span aria-label="Hand wawing emoji" role="img">👋</span> My name is
                    Nico Zerpa. I’m a self-taught software developer based in Buenos Aires, Argentina. I’ve been
                    coding since I was 13 years old (I’m { myAge } now), and professionally for 12 years and
                    counting. JavaScript is one of the first languages I’ve ever learned.</p>

                    <p>I love to explain complex things in simple terms, that’s why I want to help other
                        programmers (and aspiring programmers too) to understand one of the most important
                        languages of the Internet.</p>

                    <p>Do you want free advice and information about JavaScript? <Link to="/articles/">Check
                    out the articles</Link>.</p>

                    <p>If you want to contact me, send me an email to <a href="mailto:nico@nicozerpa.com">nico@nicozerpa.com</a>.</p>
                </div>
            </article>
        </Layout>
    )
}