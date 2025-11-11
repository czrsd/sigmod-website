'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';
import { CreditCard, Mail } from 'lucide-react';
import { verifyUser, purchaseItem } from '@/services/shop';
import { useTranslations } from 'next-intl';
import { Order } from '@/types/shopTypes';

export default function ProductCheckout({
    productType,
    productId,
}: {
    productType: 'coins' | 'subscription' | 'bundle';
    productId: string;
}) {
    const t = useTranslations('Shop.Products.Checkout');

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState<string>('stripe');

    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) setEmail(savedEmail);
    }, []);

    useEffect(() => {
        if (!email) return setEmailValid(null);

        const isEmailFormatValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isEmailFormatValid) {
            setEmailValid(false);
            return;
        }

        const timer = setTimeout(async () => {
            const isValid = await verifyUser(email);
            setEmailValid(isValid);
        }, 300);

        return () => clearTimeout(timer);
    }, [email]);

    const handlePurchase = async () => {
        if (!emailValid) return;
        setLoading(true);

        const result = await purchaseItem(
            email,
            productType,
            productId,
            method
        );

        setLoading(false);

        if (!result) return;

        if (result.approveLink) {
            const existingOrders: Order[] = JSON.parse(
                localStorage.getItem('orders') || '[]'
            );

            existingOrders.push({
                orderId: result.orderId,
                timestamp: Date.now(),
                productType,
                productId,
            });

            localStorage.setItem('orders', JSON.stringify(existingOrders));

            window.location.href = result.approveLink;
        }
    };

    return (
        <div className='flex flex-col gap-6 w-full lg:w-1/2 max-w-lg border-t lg:border-t-0 lg:border-l lg:pl-10 py-12'>
            <h2 className='text-3xl font-bold mb-2'>{t('title')}</h2>

            <div className='w-full flex flex-col gap-2'>
                <Label className='text-lg' htmlFor='email'>
                    <Mail size={24} />
                    {t('emailLabel')}
                </Label>
                <p className='text-xs text-neutral-500'>
                    {t('emailDescription')}
                </p>
                <Input
                    type='email'
                    id='email'
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full text-lg py-6 border ${
                        emailValid === null
                            ? ''
                            : emailValid
                            ? 'border-lime-500'
                            : 'border-red-500'
                    }`}
                />
                {emailValid === true && (
                    <span className='text-sm text-lime-500'>
                        {t('emailValid')}
                    </span>
                )}
                {emailValid === false && (
                    <span className='text-sm text-red-500'>
                        {t('emailInvalid')}
                    </span>
                )}
            </div>

            <div className='flex flex-col gap-2 w-full'>
                <Label className='text-lg'>
                    <CreditCard size={24} />
                    {t('paymentMethod')}
                </Label>
                <Select defaultValue={method} onValueChange={setMethod}>
                    <SelectTrigger className='w-full py-6 text-lg'>
                        <SelectValue
                            placeholder={t('selectPaymentPlaceholder')}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='stripe'>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src='/shop/stripe.svg'
                                    alt='Stripe'
                                    width={20}
                                    height={20}
                                />
                                <span>{t('stripe')}</span>
                            </div>
                        </SelectItem>
                        <SelectItem value='paypal' disabled>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src='/shop/paypal.svg'
                                    alt='PayPal'
                                    width={20}
                                    height={20}
                                />
                                <span>{t('paypal')}</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button
                variant='default'
                className='w-full text-lg py-6 cursor-pointer'
                onClick={handlePurchase}
                disabled={!emailValid || loading}
            >
                <Image
                    src={`/shop/${method}.svg`}
                    alt='PayPal'
                    width={20}
                    height={20}
                />
                {loading ? t('processing') : t('buy')}
            </Button>
        </div>
    );
}
