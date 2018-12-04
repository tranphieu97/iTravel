export class Location {
    public _id: string;

    constructor(
        public locationName: string, // place
        public provinceCity: Array<string>,
        public gps: string,
        public address: string) { }
}
