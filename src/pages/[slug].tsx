import React, { useEffect, useRef } from "react";
import Layout from "../components/layout";
import * as ArticleTypes from "../resources/article-types";
import highlight from "highlight.js/lib/core";
import highlightJS from "highlight.js/lib/languages/javascript";
import Head from "next/head";
import NewsletterForm from "../components/newsletter-form";


interface ServerSideProps {
    query: {
        slug: string
    }
}

interface ArticleProps {
    slug: string,
    article: ArticleTypes.Article,
    relatedArticles: ArticleTypes.Article[]
}

export async function getServerSideProps({ query: { slug } }: ServerSideProps): Promise<{ props: ArticleProps}> {
    const ArticlesService = await import("../resources/articles-service");

    return {
        props: {
            slug,
            article: await ArticlesService.getArticle(slug),
            relatedArticles: await ArticlesService.getSimilarArticles(slug)
        }
    }
}

export default function Article({ slug, article, relatedArticles }: ArticleProps): JSX.Element {

    if (!article) {
        return <Head>
            <meta httpEquiv="refresh" content="0;url=/" />
        </Head>
    }

    const articleBodyRef = useRef(null);

    useEffect(() => highlight.registerLanguage("javascript", highlightJS), []);

    useEffect(() => {
        if (articleBodyRef.current) {
            articleBodyRef.current.querySelectorAll("a[href]").forEach(function(link: HTMLAnchorElement) {
                link.setAttribute("target", "_blank");
            });

            articleBodyRef.current.querySelectorAll("pre code.language-javascript").forEach(
                function (item: HTMLElement) {
                    return highlight.highlightBlock(item);
                }
            );
        }
    });

    let relatedArticlesOutput: JSX.Element;

    if (relatedArticles.length > 0) {

        relatedArticlesOutput = <section className="relatedArticles textContentWidth">
            <h3>Related Articles</h3>
            <ul> {
                relatedArticles.map(
                    relatedArticle => <li key={relatedArticle.data.slug}>
                        <a href={relatedArticle.data.slug}>{relatedArticle.data.title}</a>
                    </li>
                    )
            } </ul>
        </section>
    } else {
        relatedArticlesOutput = null;
    }

    return (
        <Layout title={ article.data.title }>
            <Head>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@await_nico" />
                <meta name="twitter:creator" content="@await_nico" />
                <meta name="description" content={ article.data.description }/>
                <meta property="og:title" content={ article.data.title }/>
                <meta property="og:description" content={ article.data.description }/>
                <meta property="og:image" content={ `https://nicozerpa.com/smimage/${slug.replace(/(^\/|\/$)/g, "")}.png` }/>
                <meta property="og:type" content="article" />
            </Head>
            <article className="single">
                <h1>{ article.data.title }</h1>
                <div
                    ref={ articleBodyRef }
                    className="textContentWidth"
                    dangerouslySetInnerHTML={{ __html: article.content }}>
                </div>
            </article>
            {relatedArticlesOutput}
            <NewsletterForm/>
        </Layout>
    )
}