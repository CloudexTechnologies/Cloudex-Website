import { createImageUrlBuilder } from "@sanity/image-url";
import type { Image } from "sanity";
import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function urlFor(source: Image) {
  return builder.image(source).auto("format").fit("max");
}

/** 1200x630 social card derived from whichever image the document offers. */
export function ogImageUrl(source: Image | undefined | null) {
  if (!source) return undefined;
  return builder.image(source).width(1200).height(630).fit("crop").auto("format").url();
}
