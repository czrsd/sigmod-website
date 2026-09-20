import SkinPageClient from './SkinPageClient';

export default async function CoinPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: skinId } = await params;
    return <SkinPageClient skinId={skinId} />;
}
