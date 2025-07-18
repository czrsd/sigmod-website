import { Glow } from '@/components/Glow';

export function GlowItems() {
    return (
        <>
            <Glow
                top='10vh'
                left='-2vw'
                width='500px'
                height='500px'
                opacity={0.15}
                blur='100px'
            />
            <Glow
                top='30vh'
                right='-32vw'
                width='600px'
                height='600px'
                opacity={0.16}
                blur='100px'
            />

            <Glow
                top='128vh'
                left='-2vw'
                width='600px'
                height='600px'
                opacity={0.175}
                blur='100px'
            />
            <Glow
                top='180vh'
                right='-26vw'
                width='600px'
                height='600px'
                opacity={0.175}
                blur='100px'
            />
        </>
    );
}
