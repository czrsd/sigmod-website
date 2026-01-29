const BASE_API = 'https://api.sigmally.xyz';

export const products = {
    single: (id: string) => `${BASE_API}/product/${id}`,
    coins: {
        all: `${BASE_API}/products/coins`,
        single: (id: string) => `${BASE_API}/products/coins/${id}`,
    },
    subscriptions: {
        all: `${BASE_API}/products/subscriptions`,
        single: (id: string) => `${BASE_API}/products/subscriptions/${id}`,
    },
    bundles: {
        all: `${BASE_API}/products/bundles`,
        single: (id: string) => `${BASE_API}/products/bundles/${id}`,
    },
    specialBundles: `${BASE_API}/products/special-bundles`,
    skins: {
        all: `${BASE_API}/products/skins`,
        single: (id: string) => `${BASE_API}/products/skins/${id}`,
    },
    boosts: {
        all: `${BASE_API}/products/boosts`,
        single: (id: string) => `${BASE_API}/products/boosts/${id}`,
    },
    servers: `${BASE_API}/products/servers`,
};

export const purchase = `${BASE_API}/purchase`;

export const orders = {
    status: `${BASE_API}/order/status`,
    cancel: `${BASE_API}/order/cancel`,
};

export const sale = `${BASE_API}/sale`;
export const validateUser = (email: string) => `${BASE_API}/user/${email}`;
