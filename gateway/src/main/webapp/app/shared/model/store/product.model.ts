export interface IProduct {
    id?: number;
    name?: string;
    price?: number;
    imageContentType?: string;
    image?: any;
}

export class Product implements IProduct {
    constructor(public id?: number, public name?: string, public price?: number, public imageContentType?: string, public image?: any) {}
}
