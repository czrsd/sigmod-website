import BoostPageClient from './BoostPageClient';

export default async function CoinPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: boostId } = await params;
    return <BoostPageClient boostId={boostId} />;
}
