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

const handleResponse = async <T>(res: Response): Promise<T> => {
    if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
};

export const getProductInfo = async (
    id: string
): Promise<
    Nullable<{ product: Bundle | CoinPackage | SubPackage; type: string }>
> => {
    try {
        const res = await fetch(products.single(id));
        const data = await handleResponse<{
            product: Bundle | CoinPackage | SubPackage;
            type: string;
        }>(res);

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
        const res = await fetch(products.specialBundles);
        return await handleResponse(res);
    } catch (err) {
        console.error('Error fetching special bundles', err);
        return null;
    }
};

export const getAllDefaultBundles = async (): Promise<Nullable<Bundle[]>> => {
    try {
        const res = await fetch(products.bundles.all);
        const data = await handleResponse<{ bundles: Bundle[] }>(res);
        return data.bundles;
    } catch (err) {
        console.error('Error fetching all bundles', err);
        return null;
    }
};

export const getBundle = async (id: string): Promise<Nullable<Bundle>> => {
    try {
        const res = await fetch(products.bundles.single(id));
        const data = await handleResponse<{ bundle: Bundle }>(res);
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
        const res = await fetch(products.coins.single(id));
        const data = await handleResponse<{ coinPackage: CoinPackage }>(res);
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
        const res = await fetch(products.coins.all);
        const data = await handleResponse<{ coins: CoinPackage[] }>(res);
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
        const res = await fetch(products.subscriptions.single(id));
        const data = await handleResponse<{ subscriptionPackage: SubPackage }>(
            res
        );
        return data.subscriptionPackage;
    } catch (err) {
        console.error(`Error fetching subscription package ${id}`, err);
        return null;
    }
};

export const getAllSubPackages = async (): Promise<Nullable<SubPackage[]>> => {
    try {
        const res = await fetch(products.subscriptions.all);
        const data = await handleResponse<{ subscriptions: SubPackage[] }>(res);
        return data.subscriptions;
    } catch (err) {
        console.error('Error fetching all subscription packages', err);
        return null;
    }
};

export const getAllSkins = async (): Promise<Nullable<Skin[]>> => {
    try {
        const res = await fetch(products.skins.all);
        const data = await handleResponse<{ skins: Skin[] }>(res);
        return data.skins;
    } catch (err) {
        console.error('Error fetching all skins', err);
        return null;
    }
};

export const getSkin = async (id: string): Promise<Nullable<Skin>> => {
    try {
        const res = await fetch(products.skins.single(id));
        const data = await handleResponse<{ skin: Skin }>(res);
        return data.skin;
    } catch (err) {
        console.error(`Error fetching skin ${id}`, err);
        return null;
    }
};

export const getAllBoosts = async (): Promise<Nullable<Boost[]>> => {
    try {
        const res = await fetch(products.boosts.all);
        const data = await handleResponse<{ boosts: Boost[] }>(res);
        return data.boosts;
    } catch (err) {
        console.error('Error fetching all boost packages', err);
        return null;
    }
};

export const getBoost = async (id: string): Promise<Nullable<Boost>> => {
    try {
        const res = await fetch(products.boosts.single(id));
        const data = await handleResponse<{ boostPackage: Boost }>(res);
        return data.boostPackage;
    } catch (err) {
        console.error(`Error fetching boost package ${id}`, err);
        return null;
    }
};

export const getAllPrivateServers = async (): Promise<Nullable<Server[]>> => {
    try {
        const res = await fetch(products.servers);
        const data = await handleResponse<{ servers: Server[] }>(res);
        return data.servers;
    } catch (err) {
        console.error('Error fetching all servers', err);
        return null;
    }
};

export const getSale = async (): Promise<number> => {
    try {
        const res = await fetch(sale);
        const data = await handleResponse<{ sale: number }>(res);
        return data.sale ?? 1;
    } catch (err) {
        console.error('Error fetching sale', err);
        return 1;
    }
};

export const verifyUser = async (email: string): Promise<Nullable<boolean>> => {
    try {
        const res = await fetch(validateUser(email));
        const data = await handleResponse<{ isValid: boolean }>(res);
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
        const res = await fetch(purchase, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userEmail: email,
                productId,
                productType: type,
                paymentMethod,
            }),
        });

        return await handleResponse<PurchaseResponse>(res);
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

        const res = await fetch(orders.status, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        return await handleResponse<OrderStatusResponse>(res);
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
        const res = await fetch(orders.cancel, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethod,
                orderId,
            }),
        });

        return await handleResponse<OrderStatusResponse>(res);
    } catch (err) {
        console.error('Error cancelling order', err);
        return null;
    }
};
