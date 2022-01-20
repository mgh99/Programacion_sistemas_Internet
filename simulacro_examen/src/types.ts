import { ObjectId } from "mongodb";

export type CharacterAPI = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: LocationAPI,
    location: LocationAPI,
    image: string,
    episode: [EpisodeAPI],
    created: string
}

export type EpisodeAPI = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: [CharacterAPI],
    created: string
}

export type LocationAPI = {
    id: number,
    name: string,
    type: string,
    dimension: string,
    residents: [CharacterAPI],
    created: string,
}

export type LocationJson = {
    name: string,
    url: string
}

export type FilterCharacter = {
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string
}