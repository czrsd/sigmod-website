'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <section className='max-w-3xl mx-auto px-6 md:px-16 py-24 space-y-6'>
            <h1 className='text-4xl font-bold mb-6'>About Me & SigMod</h1>

            <h3 className='text-2xl font-semibold'>TL;DR</h3>
            <p>
                I'm Cursed from Germany. I started coding around 2021, got
                hooked on Sigmally in 2022 and created SigMod as a userscript
                mod based on RingZero’s original. With support from people like
                RingZero and yx, both SigMod and Sigmally kept growing.
            </p>

            <hr />

            <h3 className='text-2xl font-semibold'>Longer story</h3>
            <p>
                So you're probably wondering who’s behind all this and why it
                exists.
            </p>

            <p>
                I'm Cursed, the owner of this website and SigMod. I'm from
                Germany and still kinda young. I enjoy programming, and
                surprisingly, Sigmally played a big role in getting me into it.
            </p>

            <p>
                I got my first PC around <strong>2020</strong>. After a while, I
                started messing around with Roblox and Lua, then moved to C# and
                made some basic Windows Form apps. I didn’t understand much at
                first, but it was fun pressing buttons and seeing stuff happen.
                That made me want to learn more.
            </p>

            <p>
                Around <strong>2022</strong> I started building simple HTML
                sites and came across Sigmally.
            </p>

            <p>
                I googled “agario private server” one day and found it. Started
                playing daily and got better over time. Eventually I joined the
                best clan at the time, and that’s when things really changed.
            </p>

            <p>
                Later I became part of the Sigmally team. I wanted to improve
                not just the Discord but also the game. I wasn't a dev yet, so I
                couldn’t touch the actual code—but I could make my own{' '}
                <strong>mod</strong>.
            </p>

            <p>
                There was already a mod by <strong>RingZero</strong>, one of the
                best people I met in the community. He made the original
                “Sigmally Mod”. I tweaked it, uploaded it to Greasyfork and made
                it run as a userscript instead of a bookmarklet. That’s how
                SigMod started.
            </p>

            <p>
                I'm not doing this just for myself, but also for everyone using
                the mod. A lot of people supported it. Some didn’t, but most
                did. I still remember the <strong>PFMacro vs. SigMod</strong>{' '}
                drama started by Nudo. Even then, the community backed me. The
                mod got taken down once, but now everything’s stable.
            </p>

            <p>
                I'm proud of what I’ve built. It’s not perfect, but it works and
                people use it. Big thanks to everyone who supported SigMod, gave
                feedback or just appreciated it. That’s what keeps me going.
            </p>

            <p>
                Since then, <strong>yx</strong> took things even further with
                SigFixes and made Sigmally way smoother for many more players.
                Without him, the game wouldn’t be where it is now.
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
