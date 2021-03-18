import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

interface HomeProps {
    data : {
        blog: {
            posts: [{
                frontmatter: {
                    id: number,
                    title: string
                },
                fields: {
                    slug: string
                },
                excerpt: string
            }]
        }
    }
}

export default function Home({ data } : HomeProps) {
    const { posts } = data.blog

    return (
        <Layout className="homePage">
            <section role="banner" id="heroBanner">
                <div className="heroContainer">
                    <h1>¡Hola! My Name is Nico, and I’m Your JavaScript Friend</h1>
                    Whether you’re a beginner or advanced, I’ll help you level up your JavaScript skills
                </div>
            </section>

            <div className="textContentWidth">
                <div className="featuredArticles">
                    {posts.map( post => (
                        <article key={ post.frontmatter.id }>
                            <h2>
                                <Link to={ post.fields.slug }>{ post.frontmatter.title }</Link>
                            </h2>
                            <p>{ post.excerpt }</p>
                            <Link to={ post.fields.slug } className="readMore">Read More »</Link>
                        </article>
                    ))}
                </div>
                <div className="readMoreArticles">
                    <Link to="/articles/" className="button">Read More Articles</Link>
                </div>
            </div>
        </Layout>
    );
}

export const pageQuery = graphql`
query HomePagePosts {
    blog: allMarkdownRemark(limit: 4, sort: { fields: frontmatter___id, order: DESC }) {
        posts: nodes {
            fields {
                slug
            }
            frontmatter {
                title
                id
            }
            excerpt
            id
        }
    }
}
`