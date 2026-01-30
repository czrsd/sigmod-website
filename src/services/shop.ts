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
    OrderStatusResponse,
    Skin,
    Boost,
    Server,
} from '@/types/shopTypes';

type Nullable<T> = T | null;

interface StripeOrderQuery {
    orderId: string;
    sessionId: string;
}

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
    Nullable<{
        specialBundles: Bundle[];
        limitedEndsAt: number;
        startedAt: number;
    }>
> => {
    try {
        const { data } = await axios.get<{
            specialBundles: Bundle[];
            limitedEndsAt: number;
            startedAt: number;
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

export const getAllSkins = async (): Promise<Nullable<Skin[]>> => {
    try {
        const { data } = await axios.get<{ skins: Skin[] }>(products.skins.all);
        return data.skins;
    } catch (err) {
        console.error('Error fetching all skins', err);
        return null;
    }
};

export const getSkin = async (id: string): Promise<Nullable<Skin>> => {
    try {
        const { data } = await axios.get<{ skin: Skin }>(
            products.skins.single(id)
        );
        return data.skin;
    } catch (err) {
        console.error(`Error fetching skin ${id}`, err);
        return null;
    }
};

export const getAllBoosts = async (): Promise<Nullable<Boost[]>> => {
    try {
        const { data } = await axios.get<{ boosts: Boost[] }>(
            products.boosts.all
        );
        return data.boosts;
    } catch (err) {
        console.error('Error fetching all boost packages', err);
        return null;
    }
};

export const getBoost = async (id: string): Promise<Nullable<Boost>> => {
    try {
        const { data } = await axios.get<{ boostPackage: Boost }>(
            products.boosts.single(id)
        );
        return data.boostPackage;
    } catch (err) {
        console.error(`Error fetching boost package ${id}`, err);
        return null;
    }
};

export const getAllPrivateServers = async (): Promise<Nullable<Server[]>> => {
    try {
        const { data } = await axios.get<{ servers: Server[] }>(
            products.servers
        );
        return data.servers;
    } catch (err) {
        console.error('Error fetching all servers', err);
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
    type: 'coins' | 'subscription' | 'bundle' | 'boost' | 'skin',
    productId: string,
    paymentMethod: string
): Promise<PurchaseResponse | null> => {
    try {
        const { data } = await axios.post<PurchaseResponse>(purchase, {
            userEmail: email,
            productId,
            productType: type,
            paymentMethod,
        });
        return data;
    } catch (err) {
        console.error(`Error purchasing ${type}`, err);
        return null;
    }
};

export const getOrderStatus = async (
    method: 'paypal' | 'stripe',
    data: string | StripeOrderQuery
): Promise<OrderStatusResponse | null> => {
    try {
        let payload:
            | { method: 'paypal'; token: string }
            | { method: 'stripe'; orderId: string; sessionId: string };

        if (method === 'paypal') {
            payload = { method, token: data as string };
        } else {
            const stripeData = data as StripeOrderQuery;
            payload = {
                method,
                orderId: stripeData.orderId,
                sessionId: stripeData.sessionId,
            };
        }

        const { data: res } = await axios.post<OrderStatusResponse>(
            orders.status,
            payload
        );
        return res;
    } catch (err) {
        console.error('Error getting order status', err);
        return null;
    }
};

export const cancelOrder = async (
    orderId: string,
    paymentMethod: string
): Promise<OrderStatusResponse | null> => {
    try {
        const { data } = await axios.post<OrderStatusResponse>(orders.cancel, {
            paymentMethod,
            orderId,
        });
        return data;
    } catch (err) {
        console.error('Error cancelling order', err);
        return null;
    }
};
