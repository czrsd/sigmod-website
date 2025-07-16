'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { discordLink } from '@/utils/getLink';
import Link from 'next/link';

const faqData = {
    general: [
        {
            question: 'How to install the mods?',
            answer: (
                <>
                    Getting started is easy! Just follow our detailed or quick{' '}
                    <Link
                        href='/guide'
                        className='underline text-blue-400 hover:text-blue-500'
                    >
                        installation guide
                    </Link>
                    , and you’ll be up and running in no time.
                </>
            ),
        },
        {
            question:
                'I have the mods installed, but they are not working. What should I do?',
            answer: (
                <>
                    If your mods aren’t working despite being installed, the
                    most common issue is that developer mode isn’t enabled in
                    your userscript manager. Check the{' '}
                    <Link
                        href='/guide/developer-mode'
                        className='underline text-blue-400 hover:text-blue-500'
                    >
                        installation guide
                    </Link>{' '}
                    for a detailed walkthrough, but in short: Click the puzzle
                    icon in your browser’s top bar, select “Manage extensions”
                    and toggle on developer mode in the top right corner. After
                    that, you have to restart your browser. Enabling this
                    usually fixes the issue instantly. If not, please create a
                    ticket on our discord server and we will try to help you
                    further.
                </>
            ),
        },
        {
            question: 'Are tampermonkey and the userscripts safe?',
            answer: `Absolutely, because who wouldn’t trust installing random
               scripts from the internet to improve their game, right?
               But seriously — Tampermonkey is a well-established tool
               used by millions, and our userscripts only tweak your
               game experience without any funny business. There are
               also reviews on the script pages. So yeah, it’s safe.
               Use with confidence.`,
        },
        {
            question: 'Do I need both SigMod and SigFixes?',
            answer: `No, but using both gives the best performance and
               customization. They're designed to work together.`,
        },
        {
            question: 'Can I uninstall the mods anytime?',
            answer: `Yes, just disable or remove them from your userscript manager.`,
        },
    ],
    sigmod: [
        {
            question: 'What are the core features of SigMod?',
            answer: 'SigMod focuses on customization, macros, automation and an advanced tag system to enhance your Sigmally gameplay.',
        },
        {
            question: 'What customization options does SigMod offer?',
            answer: 'Change hotkeys, UI themes, game colors, play timer, custom fonts and name settings.',
        },
        {
            question: 'What is the tag system?',
            answer: 'An advanced system to organize and manage party tags, helping you track friends and teammates easily. It integrates with the minimap and chat, includes a party panel to monitor team scores, and shows teammate info for better in-game coordination.',
        },
        {
            question: 'How does the friend system work?',
            answer: 'Easily add, manage, and track friends in-game to stay connected.',
        },
        {
            question: 'How do I open the SigMod menu?',
            answer: 'Open the mod menu by clicking the gear icon in the game UI or pressing the "V" key on your keyboard.',
        },
        {
            question: 'Can I customize hotkeys and macros?',
            answer: 'Yes! SigMod lets you fully customize hotkeys and mouse macros to suit your playstyle and improve your efficiency.',
        },
        {
            question: 'Does SigMod affect game performance?',
            answer: 'SigMod is designed to be lightweight and focuses on customization rather than performance improvements. For performance boosts, use SigFixes.',
        },
    ],
    sigfixes: [
        {
            question: 'What does SigFixes improve?',
            answer: `SigFixes focuses on improving frame rates, reducing lag spikes, enabling multiboxing, and offering customization like draw delay, custom opacity, and name scaling.`,
        },
        {
            question: 'How does SigFixes help with multiboxing?',
            answer: 'SigFixes allows you to run multiple game instances in one browser tab, making multiboxing smoother and easier.',
        },
        {
            question: 'Will SigFixes affect my FPS?',
            answer: 'Yes, it significantly boosts FPS by optimizing the game’s rendering and reducing lag spikes.',
        },
        {
            question: 'Is SigFixes compatible with SigMod?',
            answer: 'Yes, they are fully compatible and designed to work together for the best gameplay experience.',
        },
        {
            question: 'How do I configure draw delay and other options?',
            answer: 'You can adjust these settings in the SigFixes mod menu. Each option has a handy "?" icon for detailed info.',
        },
    ],
};

export default function FAQPage() {
    return (
        <section className='max-w-4xl mx-auto px-6 md:px-16 py-24 space-y-16'>
            <h1 className='text-4xl font-bold text-center mb-12'>
                Frequently Asked Questions
            </h1>

            <section>
                <h2 className='text-2xl font-semibold mb-6'>General</h2>
                <Accordion type='single' collapsible className='space-y-4'>
                    {faqData.general.map(({ question, answer }, i) => (
                        <AccordionItem key={i} value={`general-${i}`}>
                            <AccordionTrigger>{question}</AccordionTrigger>
                            <AccordionContent>{answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            <section>
                <h2 className='text-2xl font-semibold mb-6'>SigMod Specific</h2>
                <Accordion type='single' collapsible className='space-y-4'>
                    {faqData.sigmod.map(({ question, answer }, i) => (
                        <AccordionItem key={i} value={`sigmod-${i}`}>
                            <AccordionTrigger>{question}</AccordionTrigger>
                            <AccordionContent>{answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            <section>
                <h2 className='text-2xl font-semibold mb-6'>
                    SigFixes Specific
                </h2>
                <p className='text-muted-foreground mb-4'>
                    All options have a <strong>?</strong> icon next to them —
                    click those to get detailed explanations of each feature.
                </p>
                <Accordion type='single' collapsible className='space-y-4'>
                    {faqData.sigfixes.map(({ question, answer }, i) => (
                        <AccordionItem key={i} value={`sigfixes-${i}`}>
                            <AccordionTrigger>{question}</AccordionTrigger>
                            <AccordionContent>{answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            <section className='flex flex-col items-center gap-3'>
                <p className='text-sm'>
                    Still need help? Join our Discord and open a support ticket
                    — we’ll help you out.
                </p>
                <Button variant={'outline'} asChild>
                    <Link
                        href={discordLink}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Join Discord
                    </Link>
                </Button>
            </section>
        </section>
    );
}
