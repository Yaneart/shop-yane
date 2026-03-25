import { Helmet } from 'react-helmet-async';
import { Tabs } from '@/shared/ui/tabs';
import {
  Store,
  Truck,
  ShieldCheck,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { BreadCrumbs } from '@/shared/ui/breadcrumbs';

const values = [
  {
    icon: Store,
    title: 'Quality First',
    desc: 'We source only premium materials for every item in our collection.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    desc: 'Free delivery on orders over $100. Most orders ship within 24 hours.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Shopping',
    desc: 'Your data is protected with industry-standard encryption.',
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    desc: '30-day hassle-free return policy on all items.',
  },
];

const faqs = [
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 5-7 business days. Express shipping is available for 2-3 business days delivery.',
  },
  {
    q: 'What is your return policy?',
    a: 'We accept returns within 30 days of purchase. Items must be unworn and in original packaging.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes! We ship to most countries worldwide. Shipping costs and delivery times vary by location.',
  },
  {
    q: 'How can I track my order?',
    a: 'Once your order ships, you ll receive an email with a tracking number and link.',
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'You can modify or cancel your order within 1 hour of placing it. Contact our support team for help.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept Visa, Mastercard, PayPal, Apple Pay, and Google Pay.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-border border-b">
      <button
        onClick={() => setOpen(!open)}
        className="text-text flex w-full items-center justify-between py-4 text-left text-base font-medium"
      >
        {q}
        <ChevronDown
          size={20}
          className={`text-text-tertiary shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${open ? 'max-h-40 pb-4' : 'max-h-0'}`}
      >
        <p className="text-text-secondary text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-text text-xl font-bold">Our Story</h2>
        <p className="text-text-secondary mt-3 leading-relaxed">
          YaneSHOP started with a simple idea: create stylish, comfortable
          clothing that lets you express yourself. We combine modern design with
          quality materials to bring you apparel that stands out.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="bg-bg-secondary rounded-2xl p-5">
            <v.icon size={24} className="text-accent" />
            <h3 className="text-text mt-3 font-semibold">{v.title}</h3>
            <p className="text-text-tertiary mt-1 text-sm">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FaqSection() {
  return (
    <div>
      <h2 className="text-text mb-4 text-xl font-bold">
        Frequently Asked Questions
      </h2>
      <div className="border-border border-t">
        {faqs.map((faq) => (
          <FaqItem key={faq.q} q={faq.q} a={faq.a} />
        ))}
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-text text-xl font-bold">Get in Touch</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href="mailto:support@yaneshop.com"
          className="bg-bg-secondary hover:bg-bg-tertiary flex items-center gap-3 rounded-2xl p-5 transition-colors"
        >
          <Mail size={22} className="text-accent shrink-0" />
          <div>
            <p className="text-text text-sm font-semibold">Email</p>
            <p className="text-text-tertiary text-xs">support@yaneshop.com</p>
          </div>
        </a>
        <a
          href="https://t.me/Yaneart"
          target="_blank"
          rel="noreferrer"
          className="bg-bg-secondary hover:bg-bg-tertiary flex items-center gap-3 rounded-2xl p-5 transition-colors"
        >
          <Phone size={22} className="text-accent shrink-0" />
          <div>
            <p className="text-text text-sm font-semibold">Telegram</p>
            <p className="text-text-tertiary text-xs">@Yaneart</p>
          </div>
        </a>
        <div className="bg-bg-secondary flex items-center gap-3 rounded-2xl p-5">
          <MapPin size={22} className="text-accent shrink-0" />
          <div>
            <p className="text-text text-sm font-semibold">Address</p>
            <p className="text-text-tertiary text-xs">Moscow, Russia</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  const tabs = [
    { label: 'About Us', content: <AboutSection /> },
    { label: 'FAQ', content: <FaqSection /> },
    { label: 'Contacts', content: <ContactSection /> },
  ];

  return (
    <section className="page-fade-in mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Helmet>
        <title>About — YaneSHOP</title>
        <meta
          name="description"
          content="Learn about YaneSHOP, read our FAQ, or get in touch with us."
        />
      </Helmet>
      <BreadCrumbs items={[{ label: 'About' }]} />
      <h1 className="text-text mt-4 text-3xl font-bold">About YaneSHOP</h1>
      <div className="mt-6">
        <Tabs tabs={tabs} defaultIndex={0} />
      </div>
    </section>
  );
}
