export enum SeriesLinkTypes {
    Crunchyroll = "crunchyroll",
    Netflix = "netflix",
    BurningSeries = "burning-series",
    AmazonPrime = "amazon-prime"
}

export default class SeriesLinkModel {
    constructor(
        public readonly createdBy: string,
        public readonly type: SeriesLinkTypes,
        public readonly link: string
    ) { }
}