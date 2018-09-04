export default class CreatedByModel {
    constructor(
        public id: number,
        public name: string,
        public credit_id?: string,
        public gender?: 1 | 2,
        public profile_path?: string,
    ) { }
}