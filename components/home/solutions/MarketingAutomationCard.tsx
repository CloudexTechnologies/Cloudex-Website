"use client";

/**
 * Marketing automation — home page “Solutions” card.
 *
 * Solutions card 4/6 — “Marketing Automation.” No ticker; a static “Marketing Suite” panel.
 *
 * NOTE the irregular SSR shape, reproduced verbatim: Framer merged the desktop and phone
 * copies of the reveal wrapper into ONE `.ssr-variant.hidden-1lsm0lh` (they share the
 * `up40` entrance) and put a second level of `.ssr-variant` inside it for the two panel
 * paddings. Tablet keeps its own wrapper with a `right40` entrance. That is 2 outer
 * wrappers, not 3.
 *
 * Ported from `_source/live/home.html` section 06 "Solutions" (offsets 377438–686817) with
 * `tools/html2jsx.mjs`; image URLs rewritten through `_source/asset-map.json`.
 *
 * Framer SSRs one `.ssr-variant` copy of this card per breakpoint and hides the inactive
 * ones with the `hidden-*` rules in `app/framer/breakpoints.css` — all copies are rendered
 * here, exactly as Framer does. The copies are byte-identical apart from the entrance
 * direction (and, where noted, one padding custom property), so the shared markup lives in
 * a single `CardBody` and cannot drift between breakpoints (PLAN.md §6).
 *
 * The reveal wrapper reproduces Framer's SSR'd `will-change:transform; opacity:0;
 * transform:…`: ported as-is without `<ScrollReveal>` the card never becomes visible
 * (PLAN.md §1.5). Spring is MEASURED `{stiffness:300, damping:60, mass:1}`, threshold 0.5,
 * once — see `_source/behaviours/scroll-reveals.md`.
 */

import * as React from "react";
import type { CSSProperties } from "react";

import { ScrollReveal } from "@/components/primitives";

/** MEASURED `--1sebies` padding. Desktop and tablet share a value; phone differs. */
const PAD_WIDE = "31px 15px 30px 15px";
const PAD_PHONE = "10px 10px 20px 10px";

/** The heading + copy block, identical in every copy. */
function CardText() {
  return (
    <>
        <div className="framer-xnklsk" data-framer-name="Text">
          <div
            className="framer-xbup81"
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" } as CSSProperties}
          >
            <p
              className="framer-text framer-styles-preset-sbzkm0"
              data-styles-preset="E64lfTJ9Y"
              dir="auto"
            >
              <span
                style={{ "--framer-text-color": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))" } as CSSProperties}
                className="framer-text"
              >
                <strong className="framer-text">
                  Marketing Automation.
                </strong>
              </span>
              {" Run campaigns, follow-ups, and lead workflows automatically and efficiently."}
            </p>
          </div>
        </div>
    </>
  );
}

/** The “Marketing Suite” panel. Identical apart from `--1sebies`. */
function MarketingSuite({ pad }: { pad: string }) {
  return (
    <>
        <div className="framer-gz0wlp-container">
          <div
            className="framer-MyEeh framer-TPaq9 framer-BHHgS framer-k0Wn1 framer-ef99om framer-v-ef99om"
            data-framer-name="Marketing suit"
            style={{
              "--1sebies": pad,
              width: "100%",
            } as CSSProperties}
          >
            <div
              className="framer-ok3pnk"
              data-framer-name="Border"
              style={{
                background: "linear-gradient(180deg, var(--token-a4c33a8a-f7ec-4c7c-86b7-12a5561a333a, rgba(255, 255, 255, 0.3)) 0%, var(--token-12307017-6017-4dc2-bd95-03dd133b2bde, rgba(255, 255, 255, 0.1)) 21.83277027027027%, var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06)) 49.48620495495496%, rgba(0, 200, 240, 0) 100%)",
                borderBottomLeftRadius: "9px",
                borderBottomRightRadius: "9px",
                borderTopLeftRadius: "9px",
                borderTopRightRadius: "9px",
              } as CSSProperties}
            >
              <div
                className="framer-d44k2y"
                data-framer-name="Container"
                style={{
                  backgroundColor: "var(--token-462bfd45-cc6a-406c-b043-2bf80d378d7c, rgba(18, 18, 18, 0.7))",
                  mask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 53%) add",
                  WebkitMask: "linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 53%) add",
                  borderBottomLeftRadius: "8px",
                  borderBottomRightRadius: "8px",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                } as CSSProperties}
              >
                <div
                  className="framer-1nj9yqu"
                  data-framer-name="Top"
                  style={{ backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))" } as CSSProperties}
                >
                  <div className="framer-1huds0h" data-framer-name="Icon and name">
                    <div
                      data-framer-component-type="SVG"
                      {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                      className="framer-fkbr02"
                      aria-hidden="true"
                      style={{
                        imageRendering: "pixelated",
                        flexShrink: "0",
                      } as CSSProperties}
                    >
                      <div
                        className="svgContainer"
                        style={{
                          width: "100%",
                          height: "100%",
                          aspectRatio: "inherit",
                        } as CSSProperties}
                      >
                        <svg
                          style={{
                            width: "100%",
                            height: "100%",
                          } as CSSProperties}
                        >
                          <use href="#svg-131771748_1622" />
                        </svg>
                      </div>
                    </div>
                    <div
                      className="framer-1178yu9"
                      data-framer-component-type="RichTextContainer"
                      style={{
                        "--framer-link-text-color": "rgb(0, 153, 255)",
                        "--framer-link-text-decoration": "underline",
                        transform: "none",
                      } as CSSProperties}
                    >
                      <p
                        className="framer-text framer-styles-preset-141u1yr"
                        data-styles-preset="pAzayDUZg"
                      >
                        Marketing Suite
                      </p>
                    </div>
                  </div>
                  <div className="framer-1jdkwbn" data-framer-name="Nav dots">
                    <div
                      className="framer-1kpuyqp"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-dc401052-8456-42c8-a24e-d36945f44ebf, rgb(181, 0, 0))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                    <div
                      className="framer-bxqswq"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-957981e5-19a4-4a47-9eff-cfd3010c1560, rgba(255, 255, 255, 0.2))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                    <div
                      className="framer-1seq9vd"
                      data-framer-name="Dot"
                      style={{
                        backgroundColor: "var(--token-b8eab2dc-5184-478b-9216-aa7099687128, rgb(1, 117, 1))",
                        borderBottomLeftRadius: "7px",
                        borderBottomRightRadius: "7px",
                        borderTopLeftRadius: "7px",
                        borderTopRightRadius: "7px",
                      } as CSSProperties}
                    />
                  </div>
                </div>
                <div className="framer-rylj4g" data-framer-name="Bottom">
                  <div className="framer-120n8k0" data-framer-name="Lead search">
                    <div
                      className="framer-n6paux"
                      data-border="true"
                      data-framer-name="Icon holder"
                      style={{
                        "--border-bottom-width": "1px",
                        "--border-color": "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        "--border-left-width": "1px",
                        "--border-right-width": "1px",
                        "--border-style": "solid",
                        "--border-top-width": "1px",
                        backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                        borderBottomLeftRadius: "2px",
                        borderBottomRightRadius: "2px",
                        borderTopLeftRadius: "2px",
                        borderTopRightRadius: "2px",
                      } as CSSProperties}
                    >
                      <div
                        data-framer-component-type="SVG"
                        {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                        className="framer-o89oih"
                        aria-hidden="true"
                        style={{
                          imageRendering: "pixelated",
                          flexShrink: "0",
                        } as CSSProperties}
                      >
                        <div
                          className="svgContainer"
                          style={{
                            width: "100%",
                            height: "100%",
                            aspectRatio: "inherit",
                          } as CSSProperties}
                        >
                          <svg
                            style={{
                              width: "100%",
                              height: "100%",
                            } as CSSProperties}
                          >
                            <use href="#svg809634881_763" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="framer-1nvnqyt" data-framer-name="Text and bar">
                      <div
                        className="framer-9uvwwe"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--extracted-r6o4lv": "var(--token-fc24edca-c6a9-4002-9aa0-e67221fb322a, rgba(255, 255, 255, 0.7))",
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-1l55uzh"
                          data-styles-preset="nNXkfmGpR"
                          dir="auto"
                          style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-fc24edca-c6a9-4002-9aa0-e67221fb322a, rgba(255, 255, 255, 0.7)))" } as CSSProperties}
                        >
                          <strong className="framer-text">
                            Searching for leads…
                          </strong>
                        </p>
                      </div>
                      <div
                        className="framer-i1hphg"
                        data-framer-name="Process"
                        style={{
                          backgroundColor: "var(--token-afe38531-3ffb-413e-b141-aa2cba0b989e, rgba(255, 255, 255, 0.18))",
                          borderBottomLeftRadius: "1px",
                          borderBottomRightRadius: "1px",
                          borderTopLeftRadius: "1px",
                          borderTopRightRadius: "1px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-1aq7w4a"
                          style={{
                            background: "radial-gradient(39% 343% at 50% 50%, var(--token-ef339654-0b57-4e97-91bb-d6220ba70ab6, rgba(255, 255, 255, 0.8)) 0%, rgba(0, 114, 156, 0) 89.41617398648648%)",
                            willChange: "transform",
                            opacity: "1",
                            transform: "none",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="framer-6yn2sj"
                    data-framer-name="Dashboard"
                    style={{
                      backgroundColor: "var(--token-73249cc1-e13f-4b9a-9f8c-120463984349, rgba(255, 255, 255, 0.03))",
                      borderBottomLeftRadius: "4px",
                      borderBottomRightRadius: "4px",
                      borderTopLeftRadius: "4px",
                      borderTopRightRadius: "4px",
                    } as CSSProperties}
                  >
                    <div className="framer-1p7jkbl" data-framer-name="section heading">
                      <div
                        className="framer-1l5ole1"
                        data-framer-component-type="RichTextContainer"
                        style={{
                          "--framer-link-text-color": "rgb(0, 153, 255)",
                          "--framer-link-text-decoration": "underline",
                          transform: "none",
                        } as CSSProperties}
                      >
                        <p
                          className="framer-text framer-styles-preset-ayj2we"
                          data-styles-preset="nR64Va2dC"
                        >
                          <strong className="framer-text">
                            Outreaching Methods..
                          </strong>
                        </p>
                      </div>
                      <div
                        data-framer-component-type="SVG"
                        {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                        className="framer-6o7zwg"
                        aria-hidden="true"
                        style={{
                          imageRendering: "pixelated",
                          flexShrink: "0",
                        } as CSSProperties}
                      >
                        <div
                          className="svgContainer"
                          style={{
                            width: "100%",
                            height: "100%",
                            aspectRatio: "inherit",
                          } as CSSProperties}
                        >
                          <svg
                            style={{
                              width: "100%",
                              height: "100%",
                            } as CSSProperties}
                          >
                            <use href="#svg1083438117_497" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div
                      className="framer-1bqx6iv"
                      style={{ backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))" } as CSSProperties}
                    />
                    <div className="framer-ecy1bi" data-framer-name="Linkedin">
                      <div className="framer-1auckkp" data-framer-name="Icon and Label">
                        <div
                          data-framer-component-type="SVG"
                          {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                          className="framer-6jligs"
                          aria-hidden="true"
                          style={{
                            imageRendering: "pixelated",
                            flexShrink: "0",
                          } as CSSProperties}
                        >
                          <div
                            className="svgContainer"
                            style={{
                              width: "100%",
                              height: "100%",
                              aspectRatio: "inherit",
                            } as CSSProperties}
                          >
                            <svg
                              style={{
                                width: "100%",
                                height: "100%",
                              } as CSSProperties}
                            >
                              <use href="#svg343723450_985" />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="framer-1hy01nr"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--extracted-r6o4lv": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                            style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)))" } as CSSProperties}
                          >
                            Linkedin
                          </p>
                        </div>
                      </div>
                      <div
                        className="framer-1alond9"
                        style={{
                          backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                          borderBottomLeftRadius: "7px",
                          borderBottomRightRadius: "7px",
                          borderTopLeftRadius: "7px",
                          borderTopRightRadius: "7px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-q0r2i0"
                          style={{
                            backgroundColor: "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            borderBottomLeftRadius: "105px",
                            borderBottomRightRadius: "105px",
                            borderTopLeftRadius: "105px",
                            borderTopRightRadius: "105px",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-91dkok" data-framer-name="Email">
                      <div className="framer-1nhmf5x" data-framer-name="Icon and label">
                        <div
                          data-framer-component-type="SVG"
                          {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                          className="framer-1vigsei"
                          aria-hidden="true"
                          style={{
                            imageRendering: "pixelated",
                            flexShrink: "0",
                          } as CSSProperties}
                        >
                          <div
                            className="svgContainer"
                            style={{
                              width: "100%",
                              height: "100%",
                              aspectRatio: "inherit",
                            } as CSSProperties}
                          >
                            <svg
                              style={{
                                width: "100%",
                                height: "100%",
                              } as CSSProperties}
                            >
                              <use href="#svg-682395581_529" />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="framer-135pj7g"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                          >
                            Email
                          </p>
                        </div>
                      </div>
                      <div
                        className="framer-1jzamre"
                        style={{
                          backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                          borderBottomLeftRadius: "7px",
                          borderBottomRightRadius: "7px",
                          borderTopLeftRadius: "7px",
                          borderTopRightRadius: "7px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-1af18yt"
                          data-framer-name="Switch"
                          style={{
                            backgroundColor: "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                            borderBottomLeftRadius: "105px",
                            borderBottomRightRadius: "105px",
                            borderTopLeftRadius: "105px",
                            borderTopRightRadius: "105px",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-1p46yyl" data-framer-name="Messenger">
                      <div className="framer-itv9lx" data-framer-name="Icon and label">
                        <div
                          data-framer-component-type="SVG"
                          {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                          className="framer-ogz1re"
                          aria-hidden="true"
                          style={{
                            imageRendering: "pixelated",
                            flexShrink: "0",
                          } as CSSProperties}
                        >
                          <div
                            className="svgContainer"
                            style={{
                              width: "100%",
                              height: "100%",
                              aspectRatio: "inherit",
                            } as CSSProperties}
                          >
                            <svg
                              style={{
                                width: "100%",
                                height: "100%",
                              } as CSSProperties}
                            >
                              <use href="#svg921421248_950" />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="framer-1jjlnec"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--extracted-r6o4lv": "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                            style={{ "--framer-text-color": "var(--extracted-r6o4lv, var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255)))" } as CSSProperties}
                          >
                            Messenger
                          </p>
                        </div>
                      </div>
                      <div
                        className="framer-18ln2s2"
                        data-framer-name="Toggle"
                        style={{
                          backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                          borderBottomLeftRadius: "7px",
                          borderBottomRightRadius: "7px",
                          borderTopLeftRadius: "7px",
                          borderTopRightRadius: "7px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-1cwa6ru"
                          data-framer-name="Switch"
                          style={{
                            backgroundColor: "var(--token-55fce8bf-ab86-42dc-8b77-6335cf9cf588, rgb(255, 255, 255))",
                            borderBottomLeftRadius: "105px",
                            borderBottomRightRadius: "105px",
                            borderTopLeftRadius: "105px",
                            borderTopRightRadius: "105px",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-lbh7gt" data-framer-name="Cold calling">
                      <div className="framer-1vnhz9c" data-framer-name="Icon and Lable">
                        <div
                          data-framer-component-type="SVG"
                          {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                          className="framer-3e2dtg"
                          aria-hidden="true"
                          style={{
                            imageRendering: "pixelated",
                            flexShrink: "0",
                          } as CSSProperties}
                        >
                          <div
                            className="svgContainer"
                            style={{
                              width: "100%",
                              height: "100%",
                              aspectRatio: "inherit",
                            } as CSSProperties}
                          >
                            <svg
                              style={{
                                width: "100%",
                                height: "100%",
                              } as CSSProperties}
                            >
                              <use href="#svg-1913880184_1057" />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="framer-e9v19m"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                          >
                            Cold calling
                          </p>
                        </div>
                      </div>
                      <div
                        className="framer-arxemw"
                        style={{
                          backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                          borderBottomLeftRadius: "7px",
                          borderBottomRightRadius: "7px",
                          borderTopLeftRadius: "7px",
                          borderTopRightRadius: "7px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-1i4o1e8"
                          data-framer-name="Switch"
                          style={{
                            backgroundColor: "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                            borderBottomLeftRadius: "105px",
                            borderBottomRightRadius: "105px",
                            borderTopLeftRadius: "105px",
                            borderTopRightRadius: "105px",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-18r9c9o" data-framer-name="SMS">
                      <div className="framer-jv6fdi" data-framer-name="Icon and Lable">
                        <div
                          data-framer-component-type="SVG"
                          {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                          className="framer-1yvrcpf"
                          aria-hidden="true"
                          style={{
                            imageRendering: "pixelated",
                            flexShrink: "0",
                          } as CSSProperties}
                        >
                          <div
                            className="svgContainer"
                            style={{
                              width: "100%",
                              height: "100%",
                              aspectRatio: "inherit",
                            } as CSSProperties}
                          >
                            <svg
                              style={{
                                width: "100%",
                                height: "100%",
                              } as CSSProperties}
                            >
                              <use href="#svg1859317262_498" />
                            </svg>
                          </div>
                        </div>
                        <div
                          className="framer-1yolcnj"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                          >
                            SMS
                          </p>
                        </div>
                      </div>
                      <div
                        className="framer-11en35c"
                        data-framer-name="Toggle"
                        style={{
                          backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                          borderBottomLeftRadius: "7px",
                          borderBottomRightRadius: "7px",
                          borderTopLeftRadius: "7px",
                          borderTopRightRadius: "7px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-r1kva9"
                          data-framer-name="Switch"
                          style={{
                            backgroundColor: "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                            borderBottomLeftRadius: "105px",
                            borderBottomRightRadius: "105px",
                            borderTopLeftRadius: "105px",
                            borderTopRightRadius: "105px",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-1tiqx9u" data-framer-name="Whatsapp">
                      <div className="framer-n9swgw">
                        <svg
                          className="framer-X7Wxr framer-1yz39gp"
                          role="presentation"
                          viewBox="0 0 24 24"
                          style={{
                            "--1m6trwb": "1",
                            "--21h8s6": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                            "--pgex8v": "1.5",
                          } as CSSProperties}
                        >
                          <use href="#207206324" />
                        </svg>
                        <div
                          className="framer-12m73ou"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                          >
                            Whatsapp
                          </p>
                        </div>
                      </div>
                      <div
                        className="framer-o7qbzi"
                        data-framer-name="Toggle"
                        style={{
                          backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                          borderBottomLeftRadius: "7px",
                          borderBottomRightRadius: "7px",
                          borderTopLeftRadius: "7px",
                          borderTopRightRadius: "7px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-tokfoj"
                          data-framer-name="Switch"
                          style={{
                            backgroundColor: "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                            borderBottomLeftRadius: "105px",
                            borderBottomRightRadius: "105px",
                            borderTopLeftRadius: "105px",
                            borderTopRightRadius: "105px",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                    <div className="framer-1mwqf8a" data-framer-name="Instagram">
                      <div className="framer-4nbv16" data-framer-name="Text and lable">
                        <svg
                          className="framer-SHCqu framer-1tfbjr3"
                          role="presentation"
                          viewBox="0 0 24 24"
                          style={{
                            "--1m6trwb": "0.6",
                            "--21h8s6": "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                            "--pgex8v": "1.5",
                          } as CSSProperties}
                        >
                          <use href="#942143898" />
                        </svg>
                        <div
                          className="framer-qaz4u4"
                          data-framer-component-type="RichTextContainer"
                          style={{
                            "--framer-link-text-color": "rgb(0, 153, 255)",
                            "--framer-link-text-decoration": "underline",
                            transform: "none",
                          } as CSSProperties}
                        >
                          <p
                            className="framer-text framer-styles-preset-ayj2we"
                            data-styles-preset="nR64Va2dC"
                          >
                            Instagram
                          </p>
                        </div>
                      </div>
                      <div
                        className="framer-1r5l4x7"
                        data-framer-name="Toggle"
                        style={{
                          backgroundColor: "var(--token-e4b6e893-c43a-43a8-9eff-b692c24f7ea6, rgba(255, 255, 255, 0.06))",
                          borderBottomLeftRadius: "7px",
                          borderBottomRightRadius: "7px",
                          borderTopLeftRadius: "7px",
                          borderTopRightRadius: "7px",
                        } as CSSProperties}
                      >
                        <div
                          className="framer-c8btee"
                          data-framer-name="Switch"
                          style={{
                            backgroundColor: "var(--token-be5fd20d-23fc-463d-9ce0-7784436f5294, rgb(153, 153, 153))",
                            borderBottomLeftRadius: "105px",
                            borderBottomRightRadius: "105px",
                            borderTopLeftRadius: "105px",
                            borderTopRightRadius: "105px",
                          } as CSSProperties}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="framer-lubzf7"
              data-framer-name="Glow"
              style={{
                filter: "blur(41px)",
                WebkitFilter: "blur(41px)",
                transform: "translateX(-50%)",
              } as CSSProperties}
            >
              <div
                data-framer-component-type="SVG"
                {...({ parentsize: "0", _constraints: "[object Object]", rotation: "0", shadows: "" } as Record<string, string>)}
                className="framer-ht48ku"
                aria-hidden="true"
                style={{
                  imageRendering: "pixelated",
                  flexShrink: "0",
                } as CSSProperties}
              >
                <div
                  className="svgContainer"
                  style={{
                    width: "100%",
                    height: "100%",
                    aspectRatio: "inherit",
                  } as CSSProperties}
                >
                  <svg
                    style={{
                      width: "100%",
                      height: "100%",
                    } as CSSProperties}
                  >
                    <use href="#svg624784995_369" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export function MarketingAutomationCard() {
  return (
    <>
      {/* desktop + phone (Framer merged them: same entrance) */}
      <div className="ssr-variant hidden-1lsm0lh">
        <ScrollReveal
          className="framer-14esjf9"
          data-framer-name="Marketing automation"
          enter="up40"
        >
          <CardText />
          {/* desktop */}
          <div className="ssr-variant hidden-19fjg0f">
            <MarketingSuite pad={PAD_WIDE} />
          </div>
          {/* phone */}
          <div className="ssr-variant hidden-72rtr7">
            <MarketingSuite pad={PAD_PHONE} />
          </div>
        </ScrollReveal>
      </div>
      {/* tablet */}
      <div className="ssr-variant hidden-19fjg0f hidden-72rtr7">
        <ScrollReveal
          className="framer-14esjf9"
          data-framer-name="Marketing automation"
          enter="right40"
        >
          <CardText />
          <MarketingSuite pad={PAD_WIDE} />
        </ScrollReveal>
      </div>
    </>
  );
}

export default MarketingAutomationCard;
