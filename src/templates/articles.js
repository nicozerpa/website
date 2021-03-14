import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"


export default function Articles({ location, data }) {
    const { posts, pageInfo } = data.blog

    // const searchParams = new URLSearchParams(location.search)
    
    let pagination = [];
    if (pageInfo.pageCount > 1) {
        let minPage = Math.max(1, pageInfo.currentPage - 2);
        let maxPage = Math.min(minPage + 4, pageInfo.pageCount);
        
        if (minPage > 1) {
            pagination.push(<Link key="1" to="/articles/">«</Link>)
        }

        for (let i = minPage; i <= maxPage; i++) {
            const queryString = i > 1 ? `${i}` : "";
            pagination.push(<Link key={ i } to={ `/articles/${queryString}` }>{ i }</Link>)
        }

        if (maxPage < pageInfo.pageCount) {
            pagination.push(<Link key={ pageInfo.pageCount } to={ `/articles/${pageInfo.pageCount}` }>»</Link>)
        }

        pagination = <div className="pagination">{ pagination }</div>
    }

    return (
        <Layout className="articleList" title="Articles">
            <h1>Articles</h1>
            <div className="textContentWidth">
                { posts.map(post => (
                    <article key={ post.frontmatter.id }>
                        <h2><Link to={ post.fields.slug }>{ post.frontmatter.title }</Link></h2>
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
    blog: allMarkdownRemark(limit: $limit, skip: $skip, sort: { fields: frontmatter___id, order: DESC }) {
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