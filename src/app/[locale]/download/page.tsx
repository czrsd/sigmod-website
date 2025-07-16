import Link from 'next/link';

export default function DownloadPage() {
    return (
        <div>
            <span>Downloads</span>
            <Link href={'/download/sigmod'}>SigMod</Link>
        </div>
    );
}
