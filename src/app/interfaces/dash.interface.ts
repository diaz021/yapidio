export interface Resultnews {
    articles: Array<any>;
    status: string;
    totalResults: number;
}


export interface NewsData {
    author: string;
    tittle: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
