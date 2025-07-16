import { GaugeCircle, Layers, MousePointerClick } from 'lucide-react';
import { useTranslations } from 'next-intl';

const icons = [GaugeCircle, Layers, MousePointerClick];

export function CoreFeatures() {
    const t = useTranslations('SigFixesPage.CoreFeatures');

    const features = ['performance', 'multiboxing', 'input'].map((key, i) => ({
        Icon: icons[i],
        title: t(`${key}.title`),
        description: t(`${key}.desc`),
    }));

    return (
        <section className='grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto py-14 text-center'>
            {features.map(({ Icon, title, description }) => (
                <div
                    key={title}
                    className='space-y-4 flex flex-col items-center'
                >
                    <div className='relative w-12 h-12'>
                        <svg width='0' height='0'>
                            <defs>
                                <linearGradient
                                    id='blue_gradient'
                                    x1='0'
                                    y1='0'
                                    x2='24'
                                    y2='24'
                                    gradientUnits='userSpaceOnUse'
                                >
                                    <stop offset='0%' stopColor='purple' />
                                    <stop offset='100%' stopColor='blue' />
                                </linearGradient>
                            </defs>
                        </svg>
                        <Icon
                            className='w-full h-full'
                            style={{ stroke: 'url(#blue_gradient)' }}
                        />
                    </div>
                    <h3 className='text-2xl font-semibold'>{title}</h3>
                    <p className='text-muted-foreground'>{description}</p>
                </div>
            ))}
        </section>
    );
}
