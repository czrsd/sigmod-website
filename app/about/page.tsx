'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <section className='max-w-3xl mx-auto px-6 md:px-16 py-24 space-y-6'>
            <h1 className='text-4xl font-bold mb-6'>About Me & SigMod</h1>

            <h3 className='text-2xl font-semibold'>TL;DR</h3>
            <p>
                I'm Cursed from Germany, started coding around 2020, got hooked
                on Sigmally in 2022, created SigMod as a userscript mod
                improving on RingZero's original. Thanks to the community and
                collaborators like RingZero and yx, SigMod and Sigmally grew
                strong.
            </p>

            <hr />

            <h3 className='text-2xl font-semibold'>Longer story</h3>

            <p>
                Cool, so you're wondering who is behind this and why we even
                made all this?
            </p>

            <p>
                Let me introduce myself real quick before I start yapping. I'm{' '}
                <strong>Cursed</strong>, the owner of this website and SigMod.
                I'm from Germany and still kinda young. Don’t wanna expose too
                much here on a damn mod website, but I love programming — and
                funnily enough, I got more into coding because of Sigmally.
            </p>

            <p>
                I got my first PC around <strong>2020</strong>. Back then, I
                started messing around with Roblox and Lua, then moved on to C#
                using .NET making my own Windows Form Applications. Honestly, I
                didn’t understand much — but it was fun just pressing buttons
                and seeing something come out of it. That made me wanna learn
                more.
            </p>

            <p>
                This journey with SigMod started later around{' '}
                <strong>2022</strong>. I began building simple HTML sites first,
                and then stumbled into Sigmally.
            </p>

            <p>
                One day I googled “agario private server” and found Sigmally. I
                started playing every day — addicted. Got better and better, and
                one day someone called JB asked me to join <strong>THC</strong>.
                The best clan at that time. That’s when everything changed in my
                Sigmally career (yeah I said career, take it serious now).
            </p>

            <p>
                I got close to some cool people like <strong>Takeover</strong>,
                and of course <strong>Chrisey</strong> — the goat. Jenn? She’s
                not really part of the story, but definitely a meme in the OG
                Sigmally community and was part of the team. Anyway, when most
                of the old mods left, Chrisey stepped up and made big changes.
                Later, I joined the team too.
            </p>

            <p>
                I wanted to improve not just the Discord but also the game. I
                wasn’t a dev yet, so I couldn’t touch the actual code. But I
                could make my own <strong>mod</strong>.
            </p>

            <p>
                There was already a mod by <strong>RingZero</strong>, one of the
                best people I met in this whole community. He made the original
                “Sigmally Mod”. I took that, made some changes, and uploaded it
                to Greasyfork. I didn’t like the bookmarklet method he used —
                you had to click it every time you opened the game. So I made it
                a userscript. It ran in the background. That was the start of
                SigMod — the new generation of his mod.
            </p>

            <p>
                RingZero helped me a lot. SigMod wasn’t my only project, but it
                taught me the most. Even if it’s “just JavaScript”, it helped me
                understand how things work. He also helped me understand servers
                and how to set them up (like with nginx), which made it possible
                to run features like the tag system and keep them online for
                everyone to use.
            </p>

            <p>
                I'm doing this not just for myself, but also for all of you
                using the mod. So many showed love. Some didn’t — but most did.
                I still remember the <strong>PFMacro vs. SigMod</strong> drama
                caused by Nudo, the creator of PFMacro. But even there, the
                community was behind me. Got taken down once, but everything’s
                stable now.
            </p>

            <p>
                I’m really proud of what I’ve built. Maybe not the cleanest or
                most professional, but it works. And I gotta thank everyone who
                helped make SigMod what it is today. Whether you gave feedback,
                used it, or showed a smile when winning a giveaway — you made
                this worth it. That’s why I keep going.
            </p>

            <p>
                Since it’s not just SigMod anymore, <strong>yx</strong> decided
                to take things even further and improve Sigmally on another
                level with SigFixes. I respect his skills a lot — he really made
                Sigmally smooth and playable for so many more people. Without
                him, the game wouldn’t be where it is right now.
            </p>

            <div className='pt-6'>
                <Button variant='outline' asChild>
                    <Link
                        href='https://discord.gg/QyUhvUC8AD'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Join the Discord
                    </Link>
                </Button>
            </div>
        </section>
    );
}
