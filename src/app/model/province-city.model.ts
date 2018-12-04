export class ProvinceCity {
    constructor(
        public _id: string,
        public provinceId: string,
        public provinceName: string,
        public districts: string[],
        public regionOfCountry: string,
        public mapId: string) { }
}
