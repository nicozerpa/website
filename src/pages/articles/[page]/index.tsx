import React from "react";
import Link from "next/link";
import Layout from "../components/layout";
import { remark } from "remark";
import matter from "gray-matter";
import html from "remark-html";

interface Post {
    id: number,
    title: string
    description: string,
    slug: string
}



export async function getServerSideProps() {

    const fs = await import("fs");
    const path = await import("path");

    const articlesDir = path.join(process.cwd(), "src", "articles");

    async function listArticles(): Promise<Post[]>
    {
        const output = new Array<Post>();
        for (const file of fs.readdirSync(articlesDir)) {

            if (file.trim().toLowerCase().match(/\.md$/)) {

                const rawPost = fs.readFileSync(
                    path.join(articlesDir, file)
                ).toString();

                const postMetaData = matter(rawPost).data as Post;
                
                postMetaData.slug = "/" + file.trim().toLowerCase().replace(/\.md$/, "");

                output.push(postMetaData);
            }
        }

        output.sort((a, b) => b.id - a.id);

        return output;
    }


    const posts = await listArticles();
    

    // Pass data to the page via props
    return {
        props: {
            posts
        }
    };
}


export default function Articles({ posts } : { posts: Post[] } ) : JSX.Element {
    //const { posts, pageInfo } = data.articles

    const pageInfo = {
        pageCount: 1,
        currentPage: 1
    };

    
    const paginationArray: React.ReactNode[] = [];
    let pagination : React.ReactNode
    
    if (pageInfo.pageCount > 1) {
        const minPage = Math.max(1, pageInfo.currentPage - 2);
        const maxPage = Math.min(minPage + 4, pageInfo.pageCount);
        
        if (minPage > 1) {
            paginationArray.push(<Link key="1" href="/articles/">«</Link>)
        }

        for (let i = minPage; i <= maxPage; i++) {
            const queryString = i > 1 ? `${i}` : "";
            paginationArray.push(<Link key={ i } href={ `/articles/${queryString}` }>{ i }</Link>)
        }

        if (maxPage < pageInfo.pageCount) {
            paginationArray.push(<Link key={ pageInfo.pageCount } href={ `/articles/${pageInfo.pageCount}` }>»</Link>)
        }
        
        pagination = <div className="pagination">{ paginationArray }</div>
    }

    return (
        <Layout className="articleList" title="Articles">
            <h1>Articles</h1>
            <div className="textContentWidth">
                { posts.map(post => (
                    <article key={ post.id }>
                        <h2><Link href={ post.slug }>{ post.title }</Link></h2>
                        <p>{ post.description }</p>
                    </article>
                ))}
                { pagination }
            </div>
        </Layout>
    )
}

/*
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
`*/