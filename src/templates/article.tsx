import React, { useEffect, useRef } from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import NewsletterForm from "../components/newsletter-form"
import { Helmet } from "react-helmet"
import highlight from "highlight.js/lib/core"
import highlightJS from "highlight.js/lib/languages/javascript"

import "../styles/jscode.scss"

interface ArticleProps {
    data: {
        markdownRemark: ArticleData,
        relatedPosts: {
            nodes: RelatedPostNode[]
        }
    },
    pageContext: {
        slug: string,
        relatedFileAbsolutePaths: string[]
    }
}
interface ArticleData {
    frontmatter: {
        title: string,
        description: string,
        id: number,
        lastUpdated: number
    },
    html: string
}

interface RelatedPostNode {
    fields: {
        slug: string
    },
    frontmatter: {
        title: string
    },
    fileAbsolutePath: string
}

export default function Article({ data: { markdownRemark: post, relatedPosts }, pageContext } : ArticleProps) : JSX.Element {

    const articleBodyRef = useRef(null);

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

    let relatedArticlesOutput: JSX.Element;

    if (relatedPosts.nodes.length > 0) {

        const relatedPaths = pageContext.relatedFileAbsolutePaths;
        const sortedRelatedPosts: RelatedPostNode[] = [];

        for (const relatedPath of relatedPaths) {
            const foundNode = relatedPosts.nodes.find(node => node.fileAbsolutePath == relatedPath);
            if (foundNode) {
                sortedRelatedPosts.push(foundNode);
                if (sortedRelatedPosts.length >= 4) {
                    break;
                }
            }
        }

        relatedArticlesOutput = <section className="relatedArticles textContentWidth">
            <h3>Related Articles</h3>
            <ul> {
                sortedRelatedPosts.map(
                    node => <li key={node.fields.slug}>
                        <Link to={node.fields.slug.replace(/\/\d+?\./, "/")}>{node.frontmatter.title}</Link>
                    </li>
                    )
            } </ul>
        </section>
    } else {
        relatedArticlesOutput = null;
    }


    const year = Math.floor(post.frontmatter.lastUpdated / 10000);
    const month = Math.floor((post.frontmatter.lastUpdated - year * 10000) / 100);
    const day = post.frontmatter.lastUpdated - year * 10000 - month * 100;
    
    const isoDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;

    const usFriendlyDate = new Date(year, month - 1, day, 12, 0).toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
    

    return (
        <Layout title={ post.frontmatter.title }>
            <Helmet>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@await_nico" />
                <meta name="twitter:creator" content="@await_nico" />
                <meta name="description" content={ post.frontmatter.description }/>
                <meta property="og:title" content={ post.frontmatter.title }/>
                <meta property="og:description" content={ post.frontmatter.description }/>
                <meta property="og:image" content={ `https://nicozerpa.com/smimage/${pageContext.slug.replace(/(^\/|\/$)/g, "")}.png` }/>
                <meta property="og:type" content="article" />
                <link rel="canonical" href={ `https://nicozerpa.com${pageContext.slug}` }/>
            </Helmet>
            <article className="single">
                <div className="articleHeader">
                    <h1>{ post.frontmatter.title }</h1>
                    <div className="articleCreatedAt">
                        { post.frontmatter.id === post.frontmatter.lastUpdated ? "Published" : "Last updated"}
                        {" on "}
                        <time dateTime={ isoDate }>{ usFriendlyDate }</time>
                    </div>
                </div>
                <div
                    ref={ articleBodyRef }
                    className="textContentWidth"
                    dangerouslySetInnerHTML={{ __html: post.html }}>
                </div>
            </article>
            {relatedArticlesOutput}
            <NewsletterForm/>
        </Layout>
    )
}

export const query = graphql`
query BlogQuery($slug: String!, $relatedFileAbsolutePaths: [String!]!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
        html
        frontmatter {
            title
            description
            id
            lastUpdated
        }
    }
    relatedPosts: allMarkdownRemark(
        filter: {
            fileAbsolutePath: {in: $relatedFileAbsolutePaths},
            frontmatter: {
                includeInSimilar: {eq: true},
                published: {eq: true}
            }
        }
    ) {
        nodes {
            fields {
                slug
            }
            frontmatter {
                title
            }
            fileAbsolutePath
        }
    }
}  
`