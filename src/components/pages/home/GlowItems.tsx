import { Glow } from '@/components/Glow';

export function GlowItems() {
    return (
        <>
            <Glow
                top='10%'
                left='-10%'
                width='500px'
                height='500px'
                opacity={0.15}
                blur='100px'
            />
            <Glow
                top='30%'
                right='-10%'
                width='600px'
                height='600px'
                opacity={0.175}
                blur='100px'
            />

            <Glow
                top='128%'
                left='-20%'
                width='600px'
                height='600px'
                opacity={0.175}
                blur='100px'
            />
            <Glow
                top='200%'
                right='-20%'
                width='600px'
                height='600px'
                opacity={0.175}
                blur='100px'
            />
        </>
    );
}
