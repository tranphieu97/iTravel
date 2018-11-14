
export class Province {
    provinceID: string;
    provinceName: string;
    district: string[];
    mapID: string;

    constructor(provinceID: string, provinceName: string, district: string[], mapID: string) {
        this.provinceID = provinceID;
        this.provinceName = provinceName;
        this.mapID = mapID;
        this.district = district;
    }
}
