import { ApolloError, ApolloServer, gql } from "apollo-server";
import axios from "axios";
import { EpisodeAPI, CharacterAPI, LocationAPI, LocationJson, FilterCharacter} from "../types";

export const Query = {

    character: async (parent: any, args: { id: string }) => {
        const character: CharacterAPI = await (await axios.get(`https://rickandmortyapi.com/api/character/${args.id}`)).data;
        return character;
       
    },

    charactersByIds: async (parent: any, args: { ids: number[] }) => {
        const characters: CharacterAPI[] = await (await axios.get(`https://rickandmortyapi.com/api/character/${args.ids.toString()}`)).data;
        return characters;
    },

    characters: async (parent: any, args: {page: number, filter: FilterCharacter}) => {
        let page: number = args.page || 1;
        let filter: FilterCharacter = args.filter || {};
        if(!args.page) {
            if(!args.filter) {
                page = 1;
                return await (await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)).data;
            } else {
                const nameFilter: string = (!args.filter.name) ? "" : args.filter.name;
                const statusFilter: string = (!args.filter.status) ? "" : args.filter.status;
                const speciesFilter: string = (!args.filter.species) ? "" : args.filter.species;
                const typeFilter: string = (!args.filter.type) ? "" : args.filter.type;
                const genderFilter: string = (!args.filter.gender) ? "": args.filter.gender;
                return await (await axios.get(`https://rickandmortyapi.com/api/character/?name=${nameFilter}&status=${statusFilter}&species=${speciesFilter}&type=${typeFilter}$gender=${genderFilter}`)).data;
            }
        } else {
            page = args.page;
            if(!args.filter) {
                return await (await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)).data;
            } else {
                const nameFilter: string = (!args.filter.name) ? "" : args.filter.name;
                const statusFilter: string = (!args.filter.status) ? "" : args.filter.status;
                const speciesFilter: string = (!args.filter.species) ? "" : args.filter.species;
                const typeFilter: string = (!args.filter.type) ? "" : args.filter.type;
                const genderFilter: string = (!args.filter.gender) ? "": args.filter.gender;
                return await (await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}&name=${nameFilter}&status=${statusFilter}&species=${speciesFilter}&type=${typeFilter}$gender=${genderFilter}`)).data;
            }
        }       
    }
}


export const Character = {

    episode: async (parent: { episode: string[] }) => {
        return parent.episode.map(async (episode: string) => {
            return (await axios.get(episode)).data;
        })
    },

    location: async (parent: { location: LocationJson }) => {
        if(parent.location.url !== null) {
            return (await axios.get(parent.location.url)).data as LocationAPI;
        } else {
            return parent.location;
        }
    },

    origin: async (parent: { origin: LocationJson }) => {
        if(parent.origin.url !== null) {
            return await (await axios.get(parent.origin.url)).data as LocationAPI;
        } else {
            return parent.origin;
        }
    }
}

export const Episode = {

    characters: async (parent: { chracters: string[] }) => {
        return parent.chracters.map(async(character: string) => {
            return await (await axios.get(character)).data;
        })
    }
}

export const Location = {

    residents: async (parent: {residents: string[]}) => {
        return parent.residents.map(async(resident: string) => {
            return await (await axios.get(resident)).data as CharacterAPI;
        })
    }
}



