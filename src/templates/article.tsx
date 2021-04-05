import React, { useEffect, useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import NewsletterForm from "../components/newsletter-form"
import { Helmet } from "react-helmet"
import highlight from "highlight.js/lib/core"
import highlightJS from "highlight.js/lib/languages/javascript"

import "../styles/jscode.scss"

interface ArticleProps {
    data : {
        markdownRemark : {
            frontmatter : {
                title : string,
                description : string
            },
            html : string
        }
    }
}

export default function Article({ data } : ArticleProps) : JSX.Element {
    const post = data.markdownRemark

    const articleBodyRef = useRef(null)

    useEffect(() => {
        highlight.registerLanguage("javascript", highlightJS)
    }, [])

    useEffect(() => {
        if (articleBodyRef.current) {
            articleBodyRef.current.querySelectorAll("a[href]").forEach(function(link) {
                link.setAttribute("target", "_blank")
            })
            articleBodyRef.current.querySelectorAll("pre code.language-javascript").forEach(item => highlight.highlightBlock(item))
        }
    })

    return (
        <Layout title={ post.frontmatter.title }>
            <Helmet>
                <meta name="description" content={ post.frontmatter.description }/>
            </Helmet>
            <article className="single">
                <h1>{ post.frontmatter.title }</h1>
                <div
                    ref={ articleBodyRef }
                    className="textContentWidth"
                    dangerouslySetInnerHTML={{ __html: post.html }}>
                </div>
            </article>
            <NewsletterForm/>
        </Layout>
    )
}

export const query = graphql`
query BlogQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
        html
        frontmatter {
            title
            description
        }
    }
}
`