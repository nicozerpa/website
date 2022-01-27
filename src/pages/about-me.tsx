import React, { useEffect, useState, useRef } from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet";

function calculateAge() : number {
    const now : Date = new Date();
    const nowYear : number = now.getFullYear();
    const nowMonthDay : number = (now.getMonth() + 1) * 100 + now.getDay()

    let myAge : number = nowYear - 1989;

    if (nowMonthDay < 1224) {
        myAge--;
    }

    return myAge;
}

type Age = {
    inYears: number,
    inMsDynamic: number,
    inMsStatic: number
};

const formatter = Intl.NumberFormat("en-US");

export default function AboutMe({ path } : { path: string }) : JSX.Element {
    
    const [age, setAge] = useState<Age | null>(null);
    const ageSpan = useRef(null);
    const ageStaticSpan = useRef(null);

    useEffect(function() : () => void {
        const internalAgeInMsStatic = (new Date()).getTime() - (new Date("1989-12-24T00:00:00")).getTime();
        let internalAgeInMs = internalAgeInMsStatic;

        setAge({
            inYears: calculateAge(),
            inMsDynamic: internalAgeInMs,
            inMsStatic: internalAgeInMsStatic
        });
        
        const interval = setInterval(function() {
            internalAgeInMs += 761;

            const selection = window.getSelection();
            let updateAge : boolean;

            if (selection.containsNode(ageSpan.current, true)) {
                updateAge = selection.isCollapsed;
            } else {
                updateAge = true;
            }

            if (updateAge) {
                ageStaticSpan.current.style.display = "";
                setAge({
                    inYears: calculateAge(),
                    inMsDynamic: internalAgeInMs,
                    inMsStatic: internalAgeInMsStatic
                });
            } else {
                ageStaticSpan.current.style.display = "none";
            }
        }, 761);
        
        return function() : void {
            clearInterval(interval);
        }

    }, []);


    return (
        <Layout title="About Me" canonicalPath={ path }>
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
                    Nico Zerpa. I’m a self-taught software developer based in Buenos Aires, Argentina.

                    { age &&
                        <span ref={ ageSpan }> I’m <span aria-hidden="true">{formatter.format(age.inMsDynamic)}</span>
                            <span className="visuallyHidden" ref={ageStaticSpan}>{formatter.format(age.inMsStatic)}</span> milliseconds of
                            age <span aria-label="Tongue out emoji" role="img">😜</span>, that is { age.inYears } years.
                        </span>
                    }
                    
                    </p>
                    
                    <p>I’ve been coding since I was 13 years old, and professionally for 12 years and counting.
                    JavaScript is one of the first languages I’ve ever
                    learned.</p>

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