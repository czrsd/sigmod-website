import CoinPageClient from './CoinPageClient';

export default async function CoinPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: coinId } = await params;
    return <CoinPageClient coinId={coinId} />;
}
