import React from "react";
import Link from "next/link";
import Layout from "../../components/layout";
import { GetArticlesResult } from "../../resources/article-types";


type ArticlesProps = GetArticlesResult;


export async function getServerSideProps({ query: { page }}: { query: { page: number}}): Promise<{props: ArticlesProps}> {

    const ArticlesService = await import("../../resources/articles-service");

    return {
        props: await ArticlesService.getArticles(page)
    }
}


export default function Articles({ pageInfo, articles }: ArticlesProps): JSX.Element {
    
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
                { articles.map(article => (
                    <article key={ article.id }>
                        <h2><Link href={ article.slug }>{ article.title }</Link></h2>
                        <p>{ article.description }</p>
                    </article>
                ))}
                { pagination }
            </div>
        </Layout>
    )
}