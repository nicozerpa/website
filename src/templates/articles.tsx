import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet";


interface ArticlesProps {
    data: {
        articles: {
            posts: [
                {
                    frontmatter: {
                        id: number,
                        title: string
                    },
                    excerpt: string,
                    fields: {
                        slug: string
                    }
                }
            ],
            pageInfo: {
                pageCount: number,
                currentPage: number
            }
        }
    }
}

export default function Articles({ data } : ArticlesProps) : JSX.Element {
    const { posts, pageInfo } = data.articles

    const paginationArray: React.ReactNode[] = [];
    let pagination : React.ReactNode
    
    if (pageInfo.pageCount > 1) {
        const minPage = Math.max(1, pageInfo.currentPage - 2);
        const maxPage = Math.min(minPage + 4, pageInfo.pageCount);
        
        if (minPage > 1) {
            paginationArray.push(<Link key="1" to="/articles/">«</Link>)
        }

        for (let i = minPage; i <= maxPage; i++) {
            const queryString = i > 1 ? `${i}` : "";
            paginationArray.push(<Link key={ i } to={ `/articles/${queryString}` }>{ i }</Link>)
        }

        if (maxPage < pageInfo.pageCount) {
            paginationArray.push(<Link key={ pageInfo.pageCount } to={ `/articles/${pageInfo.pageCount}` }>»</Link>)
        }
        
        pagination = <div className="pagination">{ paginationArray }</div>
    }

    return (
        <Layout className="articleList" title="Articles">
            <Helmet>
                <link rel="canonical" href={ `https://nicozerpa.com/articles${data.articles.pageInfo.currentPage > 1 ? `/${data.articles.pageInfo.currentPage}  ` : '/'}` }/>
            </Helmet>

            <h1>Articles</h1>
            <div className="textContentWidth">
                { posts.map(post => (
                    <article key={ post.frontmatter.id }>
                        <h2><Link to={ post.fields.slug.replace(/\/\d+\./, "/") }>{ post.frontmatter.title }</Link></h2>
                        <p>{ post.excerpt }</p>
                    </article>
                ))}
                { pagination }
            </div>
        </Layout>
    )
}


export const PageQuery = graphql`
query ArticleListPosts($limit: Int!, $skip: Int!, ) {
    articles: allMarkdownRemark(
            limit: $limit,
            skip: $skip,
            sort: {
                fields: frontmatter___id,
                order: DESC
            },
            filter: {
                frontmatter: {
                    published: {
                        eq: true
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
        pageInfo {
            currentPage
            perPage
            pageCount
        }
    }
}  
`