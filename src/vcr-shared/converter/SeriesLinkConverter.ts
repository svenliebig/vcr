import SeriesLinkModel from "../models/SeriesLinkModel"

export default class SeriesLinkConverter {
    public static firebaseObjectsToModelArray(firebase: any) {
        if (!firebase) {
            return []
        }

        const keys = Object.keys(firebase)

        if (keys.length === 0) {
            return []
        }

        return keys.map(SeriesLinkConverter.firebaseObjectToModel)
    }

    public static firebaseObjectToModel(firebase: any) {
        return new SeriesLinkModel(firebase.createdBy, firebase.type, firebase.link)
    }
}