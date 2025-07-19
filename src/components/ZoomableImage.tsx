import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
} from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Image, { ImageProps } from 'next/image';

type ZoomableImageProps = ImageProps & {
    zoomWidth?: number;
    zoomHeight?: number;
};

export function ZoomableImage({
    zoomWidth = 1200,
    zoomHeight = 800,
    className,
    ...props
}: ZoomableImageProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Image
                    {...props}
                    className={`rounded-xl border shadow cursor-zoom-in hover:scale-105 transition w-full h-full object-cover ${
                        className ?? ''
                    }`}
                />
            </DialogTrigger>
            <DialogContent className='max-w-4xl p-0 bg-transparent border-none shadow-none'>
                <VisuallyHidden>
                    <DialogTitle>Zoomed Image</DialogTitle>
                </VisuallyHidden>
                <Image
                    src={props.src}
                    alt={`Zoomed ${props.alt}`}
                    width={zoomWidth}
                    height={zoomHeight}
                    className='mx-auto rounded-xl'
                />
            </DialogContent>
        </Dialog>
    );
}
