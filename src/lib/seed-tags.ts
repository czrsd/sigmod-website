import dbConnect from './db';
import TagModel from '@/models/Tag';

const tags = [
    {
        name: 'Tips',
        slug: 'tips',
        color: '#3B82F6',
        description:
            'General advice and clever tricks to improve your Sigmally experience.',
    },
    {
        name: 'SigMod',
        slug: 'sigmod',
        color: '#8B5CF6',
        description:
            'Everything related to the main SigMod features and updates.',
    },
    {
        name: 'SigFixes',
        slug: 'sigfixes',
        color: '#EF4444',
        description:
            'Solutions for common bugs and technical issues within the game.',
    },
    {
        name: 'Config',
        slug: 'config',
        color: '#64748B',
        description:
            'Optimization settings and configuration files for a personalized setup.',
    },
    {
        name: 'Gameplay',
        slug: 'gameplay',
        color: '#10B981',
        description: 'Action-packed clips and tutorials on how to play better.',
    },
    {
        name: 'Installation',
        slug: 'installation',
        color: '#F59E0B',
        description:
            'Step-by-step guides on how to install mods and fixes correctly.',
    },
    {
        name: 'FPS Boost',
        slug: 'fps-boost',
        color: '#22C55E',
        description:
            'Specialized tweaks to get the maximum frames per second out of your browser.',
    },
    {
        name: 'Lag Fix',
        slug: 'lag-fix',
        color: '#F43F5E',
        description: 'Advanced settings to reduce network delay and input lag.',
    },
    {
        name: 'Keybinds',
        slug: 'keybinds',
        color: '#06B6D4',
        description: 'The best control schemes used by the top players.',
    },
    {
        name: 'Themes',
        slug: 'themes',
        color: '#EC4899',
        description:
            'Custom CSS and UI themes to change the look of your game.',
    },
    {
        name: 'Skins',
        slug: 'skins',
        color: '#D946EF',
        description:
            'Tutorials on how to create, upload, and use custom player skins.',
    },
    {
        name: 'Visuals',
        slug: 'visuals',
        color: '#84CC16',
        description:
            'Graphics adjustments, particle effects, and overlay settings.',
    },
    {
        name: 'Strategy',
        slug: 'strategy',
        color: '#14B8A6',
        description:
            'Tactical guides on movement, teaming, and dominating the leaderboard.',
    },
    {
        name: 'Pro-Play',
        slug: 'pro-play',
        color: '#FACC15',
        description:
            'High-level techniques and mechanics for competitive players.',
    },
    {
        name: 'Showcase',
        slug: 'showcase',
        color: '#6366F1',
        description:
            'Community highlights and displays of cool setups or skins.',
    },
    {
        name: 'Scripts',
        slug: 'scripts',
        color: '#000000',
        description:
            'Advanced scripting tutorials for extending mod functionality safely.',
    },
];

export async function seedTags() {
    try {
        await dbConnect();

        for (const tag of tags) {
            await TagModel.findOneAndUpdate({ slug: tag.slug }, tag, {
                upsert: true,
                new: true,
            });
        }
        console.log('✅ Tags with descriptions successfully seeded!');
    } catch (error) {
        console.error('❌ Error seeding tags:', error);
    }
}
