export interface IAccount {
    _id: string;
    userId: string;
    stockId: string;
    purchaseAmount: number;
    price: number;
    shares: number;
    datetime: string;
}