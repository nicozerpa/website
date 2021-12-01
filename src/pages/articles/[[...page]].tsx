import React from "react";
import Link from "next/link";
import { remark } from "remark";
import matter from "gray-matter";
import html from "remark-html";
import strip from "remark-strip-html";
import Layout from "../../components/layout";


interface Post {
    id: number,
    title: string
    description: string,
    slug: string,
    published: boolean
}

interface PageInfo {
    pageCount: number,
    currentPage: number
}

interface ArticlesProps {
    pageInfo: PageInfo,
    posts: Post[]
}


export async function getServerSideProps(context): Promise<{props: ArticlesProps}> {

    const currentPage = context.query.page ?? 1 as number;
    const perPage = 10;

    const fs = await import("fs");
    const path = await import("path");

    const articlesDir = path.join(process.cwd(), "src", "articles");

    const posts = new Array<Post>();
    for (const file of fs.readdirSync(articlesDir)) {

        if (file.trim().toLowerCase().match(/\.md$/)) {

            const rawPost = fs.readFileSync(
                path.join(articlesDir, file)
            ).toString();

            const parsedPost = matter(rawPost);
            const postMetaData = parsedPost.data as Post;
            
            if(postMetaData.published) {

                if (!postMetaData.description) {
                    let remarkResult = await remark();

                    const htmlDescription = String(await remarkResult.use(html).use(strip).process(parsedPost.content));
                    
                    remarkResult = await remark();
                    postMetaData.description = String(await remarkResult.use(strip).process(htmlDescription));

                    if(postMetaData.description.length > 280) {
                        postMetaData.description = postMetaData.description.substr(0, 140) + "...";
                    }
                }

                postMetaData.slug = "/" + file.trim().toLowerCase().replace(/\.md$/, "");
                posts.push(postMetaData);
            }
        }
    }

    posts.sort((a, b) => b.id - a.id);
    const pageCount = Math.ceil(posts.length / perPage);

    return {
        props: {
            pageInfo: {
                pageCount,
                currentPage
            },
            posts: posts.splice((currentPage - 1) * perPage, perPage)
        }
    };
}


export default function Articles({ pageInfo, posts }: ArticlesProps): JSX.Element {
    
    const paginationArray: React.ReactNode[] = [];
    let pagination : React.ReactNode;

    if (pageInfo.pageCount > 1) {
        const minPage = Math.max(1, pageInfo.currentPage - 2);
        const maxPage = Math.min(minPage + 4, pageInfo.pageCount);
        
        if (minPage > 1) {
            paginationArray.push(<Link key="1" href="/articles/">«</Link>)
        }

        for (let i = minPage; i <= maxPage; i++) {
            const queryString = i > 1 ? `${i}` : "";
            paginationArray.push(<Link key={ i } href={ `/articles/${queryString}` }>{ `${i}` }</Link>)
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