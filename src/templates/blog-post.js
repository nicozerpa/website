import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import NewsletterForm from "../components/newsletter-form"

export default function BlogPost({ data }) {
    const post = data.markdownRemark;

    return (
        <Layout title={ post.frontmatter.title }>
          <article className="single">
            <h1>{ post.frontmatter.title }</h1>
            <div className="textContentWidth" dangerouslySetInnerHTML={{ __html: post.html }}></div>
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