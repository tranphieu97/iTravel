export class Dictionary {
    private arrPairs: Array<{ key: string, value: any }>;

    constructor() {
        this.arrPairs = [];
    }

    add(key: string, value: any) {
        if (this.arrPairs.findIndex(x => x.key === key) === -1) {
            this.arrPairs.push({ key: key, value: value });
        }
    }

    addRange(arrPairs: [{key: string, value: any}]) {
        arrPairs.forEach(pair => {
            this.add(pair.key, pair.value);
        });
    }

    remove(key: string, value) {
        const index = this.arrPairs.findIndex(x => x.key === key);
        if (index !== -1) {
            this.arrPairs.splice(index, 1);
        }
    }

    getValue(key: string) {
        const index = this.arrPairs.findIndex(x => x.key === key);
        if (index !== -1) {
            return this.arrPairs[index].value;
        } else {
            return null;
        }
    }

    getKey(value: any) {
        const index = this.arrPairs.findIndex(x => x.key === value);
        if (index !== -1) {
            return this.arrPairs[index].key;
        } else {
            return null;
        }
    }
}
