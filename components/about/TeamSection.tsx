/**
 * `/about` §06 — `<section class="framer-1af2gb1" data-framer-name="Team">`.
 * Source: `_source/live/about.html` bytes 263008–281488.
 *
 * SERVER COMPONENT (PLAN.md §3): the markup is completely static. The only interactive
 * parts are `AboutReveal` / `AboutBadge`, which are Client Components rendered from here
 * — legal, and it keeps three team cards' worth of markup out of the client bundle.
 *
 * Scroll reveals (PLAN.md §1.5), MEASURED (desktop / tablet / phone):
 *   `.framer-1xp0zoi`  "Heading"   animation3 (y 30)  delay 0    / 0    / 0
 *   `.framer-d6kp8h-container`     animation4 (y 75)  delay 0    / 0    / 0
 *   `.framer-swwl45-container`     animation4         delay 0.15 / 0.15 / 0
 *   `.framer-1cx501m-container`    animation4         delay 0.3  / 0.3  / 0
 *
 * Verbatim oddity kept on purpose: David's and Emma's LinkedIn URLs are capitalised
 * (`https://Linkedin.com`) while Bryan's is not (`https://linkedin.com`), and none of
 * them points at an actual profile. That is what the live site ships.
 */

import * as React from "react";

import type { ReducedMotionPolicy } from "@/components/primitives";

import {
  AboutBadge,
  AboutReveal,
  ABOUT_REVEAL_DELAYS,
  RoundedEdge,
  type AboutRevealDelays,
} from "./AboutParts";
import { TOKEN_BLACK, TOKEN_GREY, TOKEN_WHITE } from "./about-tokens";

/* -------------------------------------------------------------------------- */
/* Copy + assets — verbatim                                                    */
/* -------------------------------------------------------------------------- */

export const TEAM_BADGE = "Our team";
export const TEAM_HEADING = "The People Powering Cloudex Technologies Automation";
export const TEAM_LINK_LABEL = "LinkedIn";

export interface TeamMember {
  readonly containerClassName: string;
  readonly name: string;
  readonly role: string;
  readonly href: string;
  readonly delays: AboutRevealDelays;
  readonly image: {
    readonly width: number;
    readonly height: number;
    readonly alt: string;
    readonly src: string;
    readonly srcSet: string;
  };
}

const TEAM_IMAGE_SIZES =
  "(min-width: 1200px) max((min(min(100vw, 1200px) - 80px, 1154px) - 60px) / 3, 1px), (min-width: 810px) and (max-width: 1199.98px) max((min(min(100vw, 1200px) - 80px, 1154px) - 40px) / 2, 50px), (max-width: 809.98px) max(min(min(100vw, 1200px) - 48px, 1154px) - 20px, 50px)";

const { t1, t2, t3 } = ABOUT_REVEAL_DELAYS;

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    containerClassName: "framer-d6kp8h-container",
    name: "David Mishra",
    role: "Founder",
    href: "https://Linkedin.com",
    delays: { desktop: t1, tablet: t1, phone: t1 },
    image: {
      width: 4000,
      height: 6000,
      alt: "man wearing black notched lapel suit jacket in focus photography",
      src: "/assets/images/vZW3QExeafY8ogiiWnlsg3Z00.d7fb8b3a.jpg",
      srcSet:
        "/assets/images/vZW3QExeafY8ogiiWnlsg3Z00.5eb43bba.jpg 682w,/assets/images/vZW3QExeafY8ogiiWnlsg3Z00.ad01dcc4.jpg 1365w,/assets/images/vZW3QExeafY8ogiiWnlsg3Z00.6186b2ea.jpg 2730w,/assets/images/vZW3QExeafY8ogiiWnlsg3Z00.d7fb8b3a.jpg 4000w",
    },
  },
  {
    containerClassName: "framer-swwl45-container",
    name: "Emma Watson",
    role: "Workflow Expert",
    href: "https://Linkedin.com",
    delays: { desktop: t2, tablet: t2, phone: t1 },
    image: {
      // NOTE: the remote URL ends `.jpg` but Framer serves PNG bytes, so the local
      // mirror is `.png`. Taken from `_source/asset-map.json`, never derived.
      width: 1760,
      height: 2367,
      alt: "woman in black blazer standing",
      src: "/assets/images/0gsPrzDEBrQ4buIPWQfYgibSyVk.2eb0e45a.png",
      srcSet:
        "/assets/images/0gsPrzDEBrQ4buIPWQfYgibSyVk.6d75875b.png 761w,/assets/images/0gsPrzDEBrQ4buIPWQfYgibSyVk.87259613.png 1522w,/assets/images/0gsPrzDEBrQ4buIPWQfYgibSyVk.2eb0e45a.png 1760w",
    },
  },
  {
    containerClassName: "framer-1cx501m-container",
    name: "Bryan Lanister",
    role: "Prompt Eng.",
    href: "https://linkedin.com",
    delays: { desktop: t3, tablet: t3, phone: t1 },
    image: {
      width: 4160,
      height: 6240,
      alt: "man in black crew neck shirt",
      src: "/assets/images/PTJEIm6DqZaFpjtkxfshf1RIXr4.f75bf62b.jpg",
      srcSet:
        "/assets/images/PTJEIm6DqZaFpjtkxfshf1RIXr4.91c34663.jpg 682w,/assets/images/PTJEIm6DqZaFpjtkxfshf1RIXr4.023216d0.jpg 1365w,/assets/images/PTJEIm6DqZaFpjtkxfshf1RIXr4.c5380dab.jpg 2730w,/assets/images/PTJEIm6DqZaFpjtkxfshf1RIXr4.f75bf62b.jpg 4160w",
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Static styles, transcribed from the SSR                                     */
/* -------------------------------------------------------------------------- */

const RADIUS_20 = {
  borderBottomLeftRadius: "20px",
  borderBottomRightRadius: "20px",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
} as const;

const CARD_STYLE = {
  backgroundColor: TOKEN_BLACK,
  width: "100%",
  ...RADIUS_20,
} as React.CSSProperties;

const PLACEHOLDER_STYLE = { ...RADIUS_20 } as React.CSSProperties;

const BACKGROUND_WRAPPER_STYLE = {
  position: "absolute",
  borderRadius: "inherit",
  cornerShape: "inherit",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
} as React.CSSProperties;

const BACKGROUND_IMAGE_STYLE = {
  display: "block",
  width: "100%",
  height: "100%",
  borderRadius: "inherit",
  cornerShape: "inherit",
  objectPosition: "center",
  objectFit: "cover",
} as React.CSSProperties;

const DOWN_NOTCH_STYLE = {
  backgroundColor: TOKEN_BLACK,
  borderTopRightRadius: "18px",
} as React.CSSProperties;

const TOP_NOTCH_STYLE = {
  backgroundColor: TOKEN_BLACK,
  borderBottomLeftRadius: "18px",
} as React.CSSProperties;

const NAME_STYLE = {
  "--extracted-r6o4lv": TOKEN_WHITE,
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  transform: "none",
} as React.CSSProperties;

const ROLE_STYLE = {
  "--extracted-r6o4lv": TOKEN_GREY,
  "--framer-link-text-color": "rgb(0, 153, 255)",
  "--framer-link-text-decoration": "underline",
  transform: "none",
} as React.CSSProperties;

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export interface TeamSectionProps {
  members?: readonly TeamMember[];
  reducedMotion?: ReducedMotionPolicy;
  disabled?: boolean;
}

export function TeamSection({
  members = TEAM_MEMBERS,
  reducedMotion,
  disabled = false,
}: TeamSectionProps): React.ReactElement {
  return (
    <section className="framer-1af2gb1" data-framer-name="Team">
      <AboutReveal
        enter="up30"
        className="framer-1xp0zoi"
        data-framer-name="Heading"
        reducedMotion={reducedMotion}
        disabled={disabled}
      >
        <AboutBadge
          containerClassName="framer-1xaksyx-container"
          label={TEAM_BADGE}
        />
        <div
          className="framer-12345z3"
          data-framer-component-type="RichTextContainer"
          style={{ transform: "none" }}
        >
          <h2
            className="framer-text framer-styles-preset-1uc0rn1"
            data-styles-preset="f6v2ro_B_"
            dir="auto"
            style={
              { "--framer-text-alignment": "center" } as React.CSSProperties
            }
          >
            {TEAM_HEADING}
          </h2>
        </div>
      </AboutReveal>

      <div className="framer-1axjyxj" data-framer-name="Team member grid">
        {members.map((member) => (
          <div key={member.containerClassName} className="ssr-variant">
            <AboutReveal
              enter="up75"
              delays={member.delays}
              className={member.containerClassName}
              reducedMotion={reducedMotion}
              disabled={disabled}
            >
              <div
                className="framer-PKYWV framer-JesZO framer-TPaq9 framer-U04FB framer-151mdl7 framer-v-151mdl7"
                data-framer-name="Team card"
                style={CARD_STYLE}
              >
                <div
                  className="framer-2pprnn"
                  data-framer-name="Placeholder"
                  style={PLACEHOLDER_STYLE}
                >
                  <div
                    style={BACKGROUND_WRAPPER_STYLE}
                    data-framer-background-image-wrapper="true"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      decoding="async"
                      loading="lazy"
                      width={member.image.width}
                      height={member.image.height}
                      sizes={TEAM_IMAGE_SIZES}
                      srcSet={member.image.srcSet}
                      src={member.image.src}
                      alt={member.image.alt}
                      style={BACKGROUND_IMAGE_STYLE}
                    />
                  </div>

                  <div
                    className="framer-17pbrfs"
                    data-framer-name="Down notch"
                    style={DOWN_NOTCH_STYLE}
                  >
                    <RoundedEdge
                      className="framer-10f4ngx"
                      svgClassName="framer-9a75gb"
                    />
                    <RoundedEdge
                      className="framer-1we8k94"
                      svgClassName="framer-vodk1"
                    />
                    <div className="framer-sosm60" data-framer-name="Text">
                      <div
                        className="framer-yt3mhr"
                        data-framer-component-type="RichTextContainer"
                        style={NAME_STYLE}
                      >
                        <p
                          className="framer-text framer-styles-preset-o3oioe"
                          data-styles-preset="BgF22VJBv"
                          style={
                            {
                              "--framer-text-color": `var(--extracted-r6o4lv, ${TOKEN_WHITE})`,
                            } as React.CSSProperties
                          }
                        >
                          {member.name}
                        </p>
                      </div>
                      <div
                        className="framer-1nf9tkr"
                        data-framer-component-type="RichTextContainer"
                        style={ROLE_STYLE}
                      >
                        <p
                          className="framer-text framer-styles-preset-141u1yr"
                          data-styles-preset="pAzayDUZg"
                          style={
                            {
                              "--framer-text-color": `var(--extracted-r6o4lv, ${TOKEN_GREY})`,
                            } as React.CSSProperties
                          }
                        >
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="framer-gmz38y"
                    data-framer-name="Top Notch"
                    style={TOP_NOTCH_STYLE}
                  >
                    <div className="framer-9b27ms" data-framer-name="Text">
                      <div
                        className="framer-1aog91d"
                        data-framer-component-type="RichTextContainer"
                        style={{ transform: "none" }}
                      >
                        <p
                          className="framer-text framer-styles-preset-141u1yr"
                          data-styles-preset="pAzayDUZg"
                        >
                          <a
                            className="framer-text framer-styles-preset-19jv5cd"
                            data-styles-preset="nED4Usn5Z"
                            href={member.href}
                            target="_blank"
                            rel=""
                          >
                            {TEAM_LINK_LABEL}
                          </a>
                        </p>
                      </div>
                    </div>
                    <RoundedEdge
                      className="framer-1k8h1ro"
                      svgClassName="framer-ka7jv1"
                      rotate="rotate(-180deg)"
                    />
                    <RoundedEdge
                      className="framer-8mzx93"
                      svgClassName="framer-1bjhtnx"
                      rotate="rotate(180deg)"
                    />
                  </div>
                </div>
              </div>
            </AboutReveal>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TeamSection;
