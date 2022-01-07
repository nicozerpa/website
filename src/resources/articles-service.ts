import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import strip from "remark-strip-html";
import { Article, Metadata, GetArticlesResult } from "./article-types";
import { TfIdf, TfIdfTerm } from "natural";
import computeCosineSimilarity from "compute-cosine-similarity";



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
                .use(html)
                .process(article.content)
        );

        return article;
    } else {
        return null;
    }
}



export async function getSimilarArticles(slug: string): Promise<Article[]> {
    const articlesDir = getArticlesDir();

    interface Doc {
        id: string,
        text: string
    }
    const tfidf = new TfIdf();
    const allDocs: Doc[] = [];

    interface Term extends TfIdfTerm {
        tf: number;
        idf: number;
    }
    
    type BowVector = number[];
    interface VectorWithId {
        id: string;
        vector: BowVector;
    }

    const terms = [];
    const allKeywords = new Set<string>();

    let index = -1;
    for (const file of fs.readdirSync(articlesDir)) {
        
        if (!file.trim().toLowerCase().match(/\.md$/)) continue;
        
        let remarkResult = remark();
        const parsedArticle = parseArticleFile(articlesDir, file);

        if (!parsedArticle.data.published) continue;
        if (!parsedArticle.data.includeInSimilar) continue;

        index++;
    
        let rawText = String(await remarkResult.use(html).process(parsedArticle.content));
        
        remarkResult = remark();
        rawText = String(await remarkResult.use(strip).process(rawText));

        const words = rawText
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, "")
            .split(" ");

        allDocs.push({
            id: file.trim().toLowerCase().replace(/\.md$/, ""),
            text: rawText
        });

        console.log(words);

        tfidf.addDocument(words);

        terms.push(
            (tfidf.listTerms(index) as Term[])
                .map((x) => ({ ...x, tfidf: (x as Term).tf * (x as Term).idf }))
                .sort((x, y) => y.tfidf - x.tfidf)
        );
    }


    const tfidfMapByDoc: Map<string, number>[] = [];
    terms.forEach(function (term, i) {
        tfidfMapByDoc[i] = new Map<string, number>();
        term.slice(0, 30).forEach((term) => {
            allKeywords.add(term.term);
            tfidfMapByDoc[i].set(term.term, term.tfidf);
        });
    });

    const bowVectors = new Map<string, BowVector>();
    allDocs.forEach(function (doc, i) {
        if (bowVectors === null) return;
        bowVectors.set(
            doc.id,
            Array.from(allKeywords)
                .map((keyword) => tfidfMapByDoc[i].get(keyword))
                .map((keyword) => (keyword === undefined ? 0 : keyword))
        );
    });

    const vectorSimilarityMemo = new Map<string, number>();
    function getMemoizedVectorSimilarity(v1: VectorWithId, v2: VectorWithId): number {
        const id = v1.id < v2.id ? `${v1.id} ${v2.id}` : `${v2.id} ${v1.id}`;
      
        const memoizedSimilarity = vectorSimilarityMemo.get(id);
        if (memoizedSimilarity !== undefined) return memoizedSimilarity;
      
        const similarity = calcVectorSimilarity(v1.vector, v2.vector);
        vectorSimilarityMemo.set(id, similarity);
      
        return similarity;
    }

    function calcVectorSimilarity(v1: BowVector, v2: BowVector): number {
        if (v1.length == v2.length) {
            return computeCosineSimilarity(v1, v2);
        }
    }

    function getRelatedPosts(id: string, bowVectors: Map<string, BowVector>): string[] {
        const vector = bowVectors.get(id);
        if (vector === undefined) return [];
      
        const vectorNode: VectorWithId = { id, vector };
      
        return [...bowVectors.entries()]
            .sort((x, y) => {
                const vectorX: VectorWithId = {
                    id: x[0],
                    vector: x[1],
                };
                const vectorY: VectorWithId = {
                    id: y[0],
                    vector: y[1],
                };

                return (
                    getMemoizedVectorSimilarity(vectorY, vectorNode) -
                    getMemoizedVectorSimilarity(vectorX, vectorNode)
                );
            })
            .map((x) => x[0]);
    }

    const relatedSlugs = getRelatedPosts(slug, bowVectors).slice(0, 4);

    const output: Article[] = [];

    for (const relatedSlug of relatedSlugs) {
        output.push(await getArticle(relatedSlug));
    }

    return output;
}