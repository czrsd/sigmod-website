import { Glow } from '@/components/Glow';

export function GlowItems() {
    return (
        <>
            <Glow
                top='10%'
                left='-25%'
                opacity={0.12}
                width='700px'
                height='700px'
                glowColorVar='--sidebar-primary'
            />
            <Glow
                top='10%'
                right='-10%'
                opacity={0.1}
                width='600px'
                height='600px'
                glowColorVar='--sidebar-primary'
            />
            <Glow
                top='15%'
                left='40%'
                opacity={0.1}
                width='450px'
                height='450px'
                glowColorVar='--sidebar-primary'
            />
            <Glow
                top='150%'
                left='-10%'
                opacity={0.1}
                width='450px'
                height='450px'
                glowColorVar='--sidebar-primary'
            />
            <Glow
                top='200%'
                right='-10%'
                opacity={0.1}
                width='450px'
                height='450px'
                glowColorVar='--sidebar-primary'
            />
        </>
    );
}
