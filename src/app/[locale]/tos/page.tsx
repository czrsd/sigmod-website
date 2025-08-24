import { useTranslations } from 'next-intl';

type TOSSection = {
    heading: string;
    text?: string;
    intro?: string;
    items?: string[];
    sigmallyLinkText?: string;
    sigmallyLinkUrl?: string;
    githubLinkText?: string;
    githubLinkUrl?: string;
    emailLinkText?: string;
    emailLinkUrl?: string;
};

export default function TermsOfServicePage() {
    const t = useTranslations('TOSPage');
    const sections: Record<string, TOSSection> = t.raw('sections');

    return (
        <section className='max-w-4xl mx-auto my-20 px-4 sm:px-6 lg:px-8'>
            <h1 className='text-4xl font-bold mb-4'>{t('title')}</h1>
            <p className='text-sm mb-8'>{t('lastUpdated')}</p>

            {Object.entries(sections).map(([key, section]) => (
                <div key={key}>
                    <h2 className='text-2xl font-semibold mt-8 mb-3'>
                        {section.heading}
                    </h2>

                    {section.text && (
                        <p
                            className='mb-6'
                            dangerouslySetInnerHTML={{
                                __html: section.text
                                    .replace(
                                        '{sigmallyLink}',
                                        `<a href="${section.sigmallyLinkUrl}" target="_blank" class="underline">${section.sigmallyLinkText}</a>`
                                    )
                                    .replace(
                                        '{githubLink}',
                                        `<a href="${section.githubLinkUrl}" target="_blank" class="hover:underline">${section.githubLinkText}</a>`
                                    )
                                    .replace(
                                        '{emailLink}',
                                        `<a href="${section.emailLinkUrl}" class="hover:underline">${section.emailLinkText}</a>`
                                    ),
                            }}
                        />
                    )}

                    {section.intro && <p className='mb-4'>{section.intro}</p>}

                    {section.items && (
                        <ul className='list-disc list-inside mb-6 space-y-1'>
                            {section.items.map((item, i) => (
                                <li
                                    key={i}
                                    dangerouslySetInnerHTML={{
                                        __html: item
                                            .replace(
                                                '{sigmallyLink}',
                                                `<a href="${section.sigmallyLinkUrl}" target="_blank" class="underline">${section.sigmallyLinkText}</a>`
                                            )
                                            .replace(
                                                '{githubLink}',
                                                `<a href="${section.githubLinkUrl}" target="_blank" class="hover:underline">${section.githubLinkText}</a>`
                                            )
                                            .replace(
                                                '{emailLink}',
                                                `<a href="${section.emailLinkUrl}" class="hover:underline">${section.emailLinkText}</a>`
                                            ),
                                    }}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </section>
    );
}
