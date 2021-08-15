import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import NewsletterForm from "../components/newsletter-form"

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

export default function Home({ data } : HomeProps): JSX.Element {
    const { posts } = data.blog

    return (
        <Layout className="homePage">
            <section role="banner" id="heroBanner">
                <div className="heroContainer">
                    <h1>Learning JavaScript can be a pain in the @#&amp;!</h1>
                    <NewsletterForm copyTitle={null} copyDescription="But I can give you a hand! Free newsletter to help you grow your JS skills:"/>
                </div>
            </section>

            <div className="textContentWidth">
                <p>You&rsquo;re eager to learn JavaScript, but you feel stuck.</p>
                <ul>
                    <li>There&rsquo;s so many JavaScript framework/libraries/stacks... and <strong>you don&rsquo;t know what to choose.</strong></li>
                    <li>Everything evolves so fast and <strong>you feel out of date.</strong></li>
                    <li><strong>You just don&rsquo;t get it</strong> and have to re-read the documentation every 👏 damn 👏 time👏 😫</li>
                    <li>You feel you&rsquo;re not a great JavaScript programmer even though you should be. <strong>You even feel like an impostor.</strong></li>
                </ul>
                <p>That&rsquo;s right, JavaScript <em>is</em> a difficult language, but let&rsquo;s put that aside for a moment. Now, imagine that...</p>
                <ul>
                    <li>When you start a new project, you&rsquo;re able <strong>to choose the best stack with confidence.</strong></li>
                    <li>You&rsquo;re up to date with all what happens in the JS world. <strong>Or even better, you know which trends to pay attention, and which ones you should ignore.</strong></li>
                    <li>You understand clearly what the docs say.</li>
                    <li>You&rsquo;re finally <strong>on your way to become a great JS developer 🎉.</strong></li>
                </ul>
                
                <p>The road to master JavaScript may be difficult, but you don&rsquo;t have to do it alone.</p>

                <p>Hola! 👋 My name is Nico, and I&rsquo;ve been creating software in JavaScript for
                    almost 2 decades. <strong>In my newsletter, I help people like you become awesome JavaScript developers.</strong></p>

                <p>I send emails every other monday, and it&rsquo;s 100% free.</p>

                <NewsletterForm includeCopy={false}/>

                
            </div>
        </Layout>
    );
}

export const pageQuery = graphql`
query HomePagePosts {
    blog: allMarkdownRemark(
        limit: 4,
        sort: {
            fields: frontmatter___id,
            order: DESC
        }
        filter: {
            frontmatter: {
                published: {
                    eq: 1
                }
            }
        }
    ) {
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