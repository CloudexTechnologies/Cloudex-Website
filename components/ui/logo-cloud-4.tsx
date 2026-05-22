'use client';
import { cn } from '@/lib/utils';
import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { ProgressiveBlur } from '@/components/ui/progressive-blur';

export type Logo = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<'div'> & {
  logos: Logo[];
};

export function LogoCloud({ logos, className, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        'relative w-full py-6',
        className,
      )}
      {...props}
    >
      <InfiniteSlider gap={48} reverse speed={50}>
        {logos.map((logo) => (
          <div
            key={`logo-${logo.alt}`}
            className="flex items-center justify-center"
            style={{ width: logo.width ?? 140, height: logo.height ?? 36 }}
          >
            <img
              alt={logo.alt}
              className="pointer-events-none select-none dark:brightness-0 dark:invert"
              style={{ height: '100%', width: 'auto', maxWidth: '100%' }}
              loading="lazy"
              src={logo.src}
            />
          </div>
        ))}
      </InfiniteSlider>

      <ProgressiveBlur
        blurIntensity={0.35}
        className="pointer-events-none absolute -top-8 -bottom-8 left-0 w-[160px]"
        direction="left"
      />
      <ProgressiveBlur
        blurIntensity={0.35}
        className="pointer-events-none absolute -top-8 -bottom-8 right-0 w-[160px]"
        direction="right"
      />
    </div>
  );
}
