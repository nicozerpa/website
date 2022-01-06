import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import strip from "remark-strip-html";

interface Metadata {
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

export interface GetArticlesResult {
    pageInfo: PageInfo,
    articles: Metadata[]
}

export interface Article {
    data: Metadata,
    content: string
}

const getArticlesDir = () => path.join(process.cwd(), "src", "articles");

function parseArticleFile(dirName: string, fileName: string): Article {
    const article = matter(fs.readFileSync(path.join(dirName, fileName)).toString());

    return {
        data: article.data as Metadata,
        content: article.content
    }
}


export async function getArticles(page = 1, perPage = 10): Promise<GetArticlesResult> {
    
    const articlesDir = getArticlesDir();

    const articles = new Array<Metadata>();
    for (const file of fs.readdirSync(articlesDir)) {

        if (file.trim().toLowerCase().match(/\.md$/)) {

            const parsedArticle = parseArticleFile(articlesDir, file);
            const articleMetaData = parsedArticle.data;
            
            if(articleMetaData.published) {

                if (!articleMetaData.description) {
                    let remarkResult = remark();

                    const htmlDescription = String(await remarkResult.use(html).use(strip).process(parsedArticle.content));
                    
                    remarkResult = remark();
                    articleMetaData.description = String(await remarkResult.use(strip).process(htmlDescription));

                    if(articleMetaData.description.length > 280) {
                        articleMetaData.description = articleMetaData.description.substring(0, 140) + "...";
                    }
                }

                articleMetaData.slug = "/" + file.trim().toLowerCase().replace(/\.md$/, "");
                articles.push(articleMetaData);
            }
        }
    }

    articles.sort((a, b) => b.id - a.id);
    const pageCount = Math.ceil(articles.length / perPage);

    return {
        pageInfo: {
            pageCount,
            currentPage: page
        },
        articles: articles.splice((page - 1) * perPage, perPage)
    };
}

export async function getArticle(slug: string): Promise<Article | null> {
    const articlesDir = getArticlesDir();
    const fileName = `${slug}.md`;

    if (fs.existsSync(`${articlesDir}/${fileName}`)) {
        const article = parseArticleFile(articlesDir, fileName);
        const remarkResult = remark();

        article.content = String(
            await remarkResult
                .use(html, { sanitize: false })
                .process(article.content)
        );

        return article;
    } else {
        return null;
    }
}