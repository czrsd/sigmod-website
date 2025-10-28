import BundlePageClient from './BundlePageClient';

export default async function BundlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: bundleId } = await params;
    return <BundlePageClient bundleId={bundleId} />;
}
