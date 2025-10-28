import SubPageClient from './SubPageClient';

export default async function SubscriptionPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: subId } = await params;
    return <SubPageClient subId={subId} />;
}
