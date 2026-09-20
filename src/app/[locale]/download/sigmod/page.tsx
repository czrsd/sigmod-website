import { redirect } from 'next/navigation';

export default async function DownloadPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    redirect(`/${locale}/sigmod`);
}
