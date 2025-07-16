export default function Preload() {
    return (
        <>
            <link
                rel='preload'
                href='/fonts/Inter_18pt-Regular.ttf'
                as='font'
                type='font/ttf'
                crossOrigin='anonymous'
            />
            <link
                rel='preload'
                href='/fonts/Inter_18pt-Bold.ttf'
                as='font'
                type='font/ttf'
                crossOrigin='anonymous'
            />
            <link
                rel='preload'
                as='image'
                href='/images/hero-banner.jpg'
                type='image/jpeg'
            />
        </>
    );
}
