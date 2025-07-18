import { Glow } from '@/components/Glow';

export function GlowItems() {
    return (
        <>
            <Glow
                top='10vh'
                left='-7vw'
                opacity={0.18}
                width='700px'
                height='700px'
            />
            <Glow
                top='10vh'
                right='-34vw'
                opacity={0.1}
                width='600px'
                height='600px'
            />
            <Glow
                top='15vh'
                left='50vw'
                opacity={0.1}
                width='450px'
                height='450px'
            />
        </>
    );
}
