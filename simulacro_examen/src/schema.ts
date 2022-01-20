import { ApolloError, ApolloServer, gql} from "apollo-server";

export const typeDefs = gql`

type Character {
    id: ID!
    name: String
    status: String
    species: String
    type: String
    gender: String
    origin: Location
    location: Location
    episode: [Episode]!
    created: String
}

type Characters {
    info: Info
    results: [Character]
}

type Episode {
    id: ID
    name: String
    air_date: String
    episode: String
    characters: [Character]!
    created: String
}

type Episodes {
    info: Info
    results: [Episode]
}

type Info {
    count: Int
    pages: Int
    next: Int
    prev: Int
}

type Locations {
    info: Info
    results: [Location]
}

type Location {
    id: ID
    name: String
    type: String
    dimension: String
    residents: [Character]!
    created: String
}

input FilterCharacter {
    name: String
    status: String
    species: String
    type: String
    gender: String
}

input FilterEpisode {
    name: String
    episode: String
}

input FilterLocation {
    name: String
    type: String
    dimension: String
}

type Query {
    character(id: ID!): Character
    characters(page: Int, filter: FilterCharacter): Character
    charactersByIds(ids: [ID!]!): [Character]
}

`