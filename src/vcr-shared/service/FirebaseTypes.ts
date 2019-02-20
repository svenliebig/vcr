export type UserFirebase = {
    name?: "string",
    series: Array<{ [key: string]: SeriesFirebase }>,
    uid?: string
}

export type EpisodeFirebase = {
    airDate: string,
    /**
     * index starts at 1
     *
     * @type {number}
     */
    episode: number,
    name: string,
    /**
     * index starts at 1
     *
     * @type {number}
     */
    season: number,
    watched: boolean
}

export type SeasonFirebase = {
    episodeAmount: number,
    episodes: Array<EpisodeFirebase>,
    seasonNumber: number
}

export type SeriesFirebase = {
    /**
     * @type {string}
     * @example
     * "2005-09-19"
     */
    airDate: string,
    backdropUrl: string,
    country: Array<string>,
    createdBy: Array<{
        credit_id: string,
        /**
         * 2 male 1 female
         *
         * @type {number}
         */
        gender: 1 | 2,
        id: number,
        name: string,
        profile_path?: string
    }>,
    episodeDuration: Array<number>,
    genres: Array<string>,
    id: number,
    isCompletlyWatched: boolean,
    name: string,
    overview: string
    posterUrl: string,
    rating: number,
    seasons: Array<SeasonFirebase>,
    status: string,
    votes: number,
    seasonsCount: number
    priority: number
}