import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
    {
        question:
            'I bought coins or a subscription and they do not appear on my account. What should I do?',
        answer: 'Refresh the page in your browser. Your displayed coins might not be up to date. If they still don’t appear after refreshing, please contact support.',
    },
    {
        question: 'What happens after I complete my PayPal payment?',
        answer: 'You’ll be redirected back to our site. There your order is confirmed, and the items are instantly added to your account.',
    },
    {
        question: 'What if I close the PayPal tab before it redirects back?',
        answer: 'No problem. You can reopen the site and check your order status — if the payment went through, your delivery will still be processed.',
    },
    {
        question: 'Can I use my purchase on multiple accounts?',
        answer: 'No, purchases are linked to the account you used during checkout. This keeps everything secure and fair.',
    },
    {
        question: 'What if I accidentally bought the wrong package?',
        answer: 'Contact support immediately. If the order hasn’t been confirmed yet, we can adjust or refund it.',
    },
];

export default function FAQ() {
    return (
        <section className='mx-10 sm:w-1/2 lg:w-1/3 space-y-6'>
            <h2 className='text-3xl font-semibold text-center mb-8'>FAQ</h2>
            <Accordion type='single' collapsible className='space-y-4'>
                {faqData.map(({ question, answer }, i) => (
                    <AccordionItem key={i} value={`general-${i}`}>
                        <AccordionTrigger>{question}</AccordionTrigger>
                        <AccordionContent className='text-left'>
                            {answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
