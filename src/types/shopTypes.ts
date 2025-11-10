export interface CoinPackage {
    _id: string;
    amount: number;
    price: number;
    original: number;
}

export interface SubPackage {
    _id: string;
    duration: number;
    price: number;
    original: number;
}

export interface Bundle {
    _id: string;
    name: string;
    coins: number;
    subscription: number;
    price: number;
    combined: string[];
    isLimited: boolean;
}

export interface FullBundle extends Bundle {
    coinPackage: CoinPackage;
    subPackage: SubPackage;
}

export interface PurchaseResponse {
    success: boolean;
    orderId: string;
    approveLink: string;
}

export interface OrderStatusResponse {
    success: boolean;
    message?: string;
    orderId: string;
    status: string;
    product: CoinPackage | SubPackage | Bundle;
    productType: 'coins' | 'subscription' | 'bundle';
    userData?: {
        email: string;
        fullName: string;
        imageURL: string;
        gold: number;
        previousGold?: number;
        subscription: number;
    };
}

export interface Order {
    orderId: string;
    timestamp: number;
    productType: string;
    productId: string;
}
