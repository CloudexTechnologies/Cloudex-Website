'use client';
import { LogoCloud } from '@/components/ui/logo-cloud-4';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

// All wordmark SVGs logo + text baked into the SVG from svgl.app
// _light variants = dark text on transparent (correct for light bg; dark: inverts to white)
const logos = [
  {
    src: 'https://svgl.app/library/react_wordmark_light.svg',
    alt: 'React',
  },
  {
    src: 'https://svgl.app/library/nextjs_logo_light.svg',
    alt: 'Next.js',
  },
  {
    src: 'https://svgl.app/library/supabase_wordmark_light.svg',
    alt: 'Supabase',
  },
  {
    src: 'https://svgl.app/library/openai_wordmark_light.svg',
    alt: 'OpenAI',
  },
  {
    src: 'https://svgl.app/library/vercel_wordmark.svg',
    alt: 'Vercel',
  },
  {
    src: 'https://svgl.app/library/anthropic_black_wordmark.svg',
    alt: 'Anthropic',
  },
  {
    src: 'https://svgl.app/library/postgresql-wordmark-light.svg',
    alt: 'PostgreSQL',
  },
  {
    src: 'https://svgl.app/library/langchain-wordmark-light.svg',
    alt: 'LangChain',
  },
  {
    src: 'https://svgl.app/library/tensorflow-wordmark-light.svg',
    alt: 'TensorFlow',
    width: 200,
    height: 36,
    scale: 1.5,
  },
];

export function LogoCloudSection() {
  return (
    <section
      style={{
        padding: '56px 0',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-2)',
        overflow: 'hidden',
      }}
    >
      <ScrollReveal>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            Our Tech Stack
          </span>
        </div>

        <LogoCloud logos={logos} />
      </ScrollReveal>
    </section>
  );
}
