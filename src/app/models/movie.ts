import { Collection } from "./collection";
import { Genre } from "./genre";
import { ProductionCompany } from "./production-company";

export interface Movie {
    id: number,
    title: string,
    genres: Genre[],
    tagline: string,
    overview: string,
    poster_path: string,
    release_date: string,
    backdrop_path: string,
    belongs_to_collection: Collection,
    production_companies: ProductionCompany[]
}