import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const ModItem = ({ img, alt, title, desc, link }: any) => (
    <article className='flex flex-col md:flex-row items-center md:items-start gap-12 md:[&:nth-child(2)]:flex-row-reverse'>
        <div className='md:w-1/2 flex justify-center md:justify-end'>
            <Image
                src={img}
                width={600}
                height={400}
                alt={alt}
                className='rounded-lg shadow-lg'
                priority
            />
        </div>
        <div className='md:w-1/2 flex flex-col justify-center'>
            <h2 className='text-3xl font-semibold mb-4'>{title}</h2>
            <p className='text-base leading-relaxed text-muted-foreground'>
                {desc}
            </p>
            <div className='mt-6'>
                <Button asChild>
                    <Link href={link}>Learn More</Link>
                </Button>
            </div>
        </div>
    </article>
);

export function ModsSection() {
    const t = useTranslations('HomePage.mods');

    return (
        <section className='flex flex-col gap-24 px-6 md:px-16 py-32 max-w-screen-xl mx-auto'>
            <ModItem
                img='/preview/sigmod_menu.png'
                alt='SigMod preview'
                title={t('sigmod.title')}
                desc={t('sigmod.desc')}
                link='/sigmod'
            />
            <ModItem
                img='/preview/multibox.png'
                alt='SigFixes preview'
                title={t('sigfixes.title')}
                desc={t('sigfixes.desc')}
                link='/sigfixes'
            />
        </section>
    );
}
