export interface ProductInterface {
    id?: number;
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
    categoryId: number;
}

export interface CreateProduct {
    name: string;
    price: number;
    stock: number;
    description: string;
    imageUrl: string;
    categoryId: number;
}

export interface UpdateProduct {
    name?: string;
    price?: number;
    stock?: number;
    description?: string;
    imageUrl?: string;
    categoryId?: number;
}

export interface StockProductCheck {
    productId: number,
    quantity: number
}


export interface StockCheckResponse {
    isSufficient: boolean;
    errors: string[];
  };