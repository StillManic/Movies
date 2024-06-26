import { Movie } from "./movie";

export interface MoviePage {
    page: number,
    total_pages: number,
    total_results: number,
    results: Movie[]
}