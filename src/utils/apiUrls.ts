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
};

export const purchase = {
    coins: `${BASE_API}/purchase/coins`,
    subscription: `${BASE_API}/purchase/subscription`,
    bundle: `${BASE_API}/purchase/bundle`,
};

export const orders = {
    capture: `${BASE_API}/order/capture`,
    cancel: `${BASE_API}/order/cancel`,
};

export const sale = `${BASE_API}/sale`;
export const validateUser = (email: string) => `${BASE_API}/user/${email}`;
