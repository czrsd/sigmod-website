import CoinPageClient from './CoinPageClient';

export default async function CoinPage({ params }: { params: { id: string } }) {
    const { id: coinId } = await params;
    return <CoinPageClient coinId={coinId} />;
}
