export class Location {
    public _id: string;

    constructor(
        public provinceId: Array<string>,
        public locationName: string,
        public gps: string,
        public address: string) { }
}
