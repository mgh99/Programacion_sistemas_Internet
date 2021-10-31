export type CharacterAPI = {
    id: string;
    name: string;
    status: string;
    species: string;
    episode: [string];
  };
  
  export type EpisodeAPI = {
    name: string;
    episode: string;
  };
  
  export type Character = Omit<CharacterAPI, "episode"> & {
    episode: Array<EpisodeAPI>;
    /*
    * Character ={
      id,name,status,species, episode(Character NO)=> episode=Array<EpisodeAPI>
    }
     */
  };
  export type Episode = EpisodeAPI;