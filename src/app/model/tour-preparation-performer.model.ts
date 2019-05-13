export class TourPreparationPerformer {
    public memberName: string;
    public amount: number;
    public status: string;
    // PREPARING, FINISHED

    constructor(memberName: string, amount: number, status: string) {
        this.memberName = memberName;
        this.amount = amount;
        this.status = status;
    }
}