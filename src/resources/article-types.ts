export interface Metadata {
    id: number,
    title: string
    description: string,
    slug: string,
    published: boolean,
    includeInSimilar: boolean
}

export interface Article {
    data: Metadata,
    content: string
}

interface PageInfo {
    pageCount: number,
    currentPage: number
}

export interface GetArticlesResult {
    pageInfo: PageInfo,
    articles: Metadata[]
}
