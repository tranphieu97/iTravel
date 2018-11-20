
export class SearchHistory {

    keyword: string;
    creationTime: Date;
    searchBy: string;

    constructor(keyword: string, searchBy: string) {
        this.keyword = keyword;
        this.creationTime = new Date(Date.now());
        this.searchBy = searchBy;
    }
}
