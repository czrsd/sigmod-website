import axios from 'axios';
import {
    products,
    purchase,
    sale,
    validateUser,
    orders,
} from '@/utils/apiUrls';
import {
    Bundle,
    CoinPackage,
    SubPackage,
    PurchaseResponse,
    CaptureOrderResponse,
} from '@/types/shopTypes';

type Nullable<T> = T | null;

export const getProductInfo = async (
    id: string
): Promise<
    Nullable<{ product: Bundle | CoinPackage | SubPackage; type: string }>
> => {
    try {
        const { data } = await axios.get(products.single(id));
        return { product: data.product, type: data.type };
    } catch (err) {
        console.error('Error fetching special bundles', err);
        return null;
    }
};

export const getSpecialBundles = async (): Promise<
    Nullable<{ specialBundles: Bundle[]; limitedEndsAt: number }>
> => {
    try {
        const { data } = await axios.get<{
            specialBundles: Bundle[];
            limitedEndsAt: number;
        }>(products.specialBundles);
        return data;
    } catch (err) {
        console.error('Error fetching special bundles', err);
        return null;
    }
};

export const getAllDefaultBundles = async (): Promise<Nullable<Bundle[]>> => {
    try {
        const { data } = await axios.get<{ bundles: Bundle[] }>(
            products.bundles.all
        );
        return data.bundles;
    } catch (err) {
        console.error('Error fetching all bundles', err);
        return null;
    }
};

export const getBundle = async (id: string): Promise<Nullable<Bundle>> => {
    try {
        const { data } = await axios.get<{ bundle: Bundle }>(
            products.bundles.single(id)
        );
        return data.bundle;
    } catch (err) {
        console.error(`Error fetching bundle ${id}`, err);
        return null;
    }
};

export const getCoinPackage = async (
    id: string
): Promise<Nullable<CoinPackage>> => {
    try {
        const { data } = await axios.get<{ coinPackage: CoinPackage }>(
            products.coins.single(id)
        );
        return data.coinPackage;
    } catch (err) {
        console.error(`Error fetching coin package ${id}`, err);
        return null;
    }
};

export const getAllCoinPackages = async (): Promise<
    Nullable<CoinPackage[]>
> => {
    try {
        const { data } = await axios.get<{ coins: CoinPackage[] }>(
            products.coins.all
        );
        return data.coins;
    } catch (err) {
        console.error('Error fetching all coin packages', err);
        return null;
    }
};

export const getSubscriptionPackage = async (
    id: string
): Promise<Nullable<SubPackage>> => {
    try {
        const { data } = await axios.get<{ subscriptionPackage: SubPackage }>(
            products.subscriptions.single(id)
        );
        return data.subscriptionPackage;
    } catch (err) {
        console.error(`Error fetching subscription package ${id}`, err);
        return null;
    }
};

export const getAllSubPackages = async (): Promise<Nullable<SubPackage[]>> => {
    try {
        const { data } = await axios.get<{ subscriptions: SubPackage[] }>(
            products.subscriptions.all
        );
        return data.subscriptions;
    } catch (err) {
        console.error('Error fetching all subscription packages', err);
        return null;
    }
};

export const getSale = async (): Promise<number> => {
    try {
        const { data } = await axios.get<{ sale: number }>(sale);
        return data.sale ?? 1;
    } catch (err) {
        console.error('Error fetching sale', err);
        return 1;
    }
};

export const verifyUser = async (email: string): Promise<Nullable<boolean>> => {
    try {
        const { data } = await axios.get<{ isValid: boolean }>(
            validateUser(email)
        );
        return data.isValid;
    } catch (err) {
        console.error(`Error verifying user ${email}`, err);
        return null;
    }
};

export const purchaseItem = async (
    email: string,
    type: 'coins' | 'subscription' | 'bundle',
    productId: string
): Promise<PurchaseResponse | null> => {
    try {
        const endpoints = {
            coins: purchase.coins,
            subscription: purchase.subscription,
            bundle: purchase.bundle,
        };
        const { data } = await axios.post<PurchaseResponse>(endpoints[type], {
            userEmail: email,
            productId,
        });
        return data;
    } catch (err) {
        console.error(`Error purchasing ${type}`, err);
        return null;
    }
};

export const captureOrder = async (
    token: string,
    payerId: string
): Promise<CaptureOrderResponse | null> => {
    try {
        const { data } = await axios.post<CaptureOrderResponse>(
            orders.capture,
            {
                token,
                payerId,
            }
        );
        return data;
    } catch (err) {
        console.error('Error capturing order', err);
        return null;
    }
};

export const cancelOrder = async (
    token: string
): Promise<CaptureOrderResponse | null> => {
    try {
        const { data } = await axios.post<CaptureOrderResponse>(orders.cancel, {
            token,
        });
        return data;
    } catch (err) {
        console.error('Error cancelling order', err);
        return null;
    }
};
