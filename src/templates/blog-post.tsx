import React, { useEffect, useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import NewsletterForm from "../components/newsletter-form"

interface BlogPostProps {
    data: {
        markdownRemark: {
            frontmatter: {
                title: string
            },
            html: string
        }
    }
}

export default function BlogPost({ data } : BlogPostProps) {
    const post = data.markdownRemark

    const articleBodyRef = useRef(null)

    useEffect(() => {
        if (articleBodyRef.current) {
            articleBodyRef.current.querySelectorAll("a[href]").forEach(function(link) {
                link.setAttribute("target", "_blank")
            })
        }
    })

    return (
        <Layout title={ post.frontmatter.title }>
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
        }
    }
}
`