import { Glow } from '@/components/Glow';

export function GlowItems() {
    return (
        <>
            <Glow
                top='10vh'
                left='-5vw'
                opacity={0.12}
                width='700px'
                height='700px'
                glowColorVar='--sidebar-primary'
            />
            <Glow
                top='10vh'
                right='-28vw'
                opacity={0.1}
                width='600px'
                height='600px'
                glowColorVar='--sidebar-primary'
            />
            <Glow
                top='15vh'
                left='50vw'
                opacity={0.1}
                width='450px'
                height='450px'
                glowColorVar='--sidebar-primary'
            />
            <Glow
                top='150vh'
                left='-2vw'
                opacity={0.1}
                width='450px'
                height='450px'
                glowColorVar='--sidebar-primary'
            />
            <Glow
                top='200vh'
                right='-20vw'
                opacity={0.1}
                width='450px'
                height='450px'
                glowColorVar='--sidebar-primary'
            />
        </>
    );
}
