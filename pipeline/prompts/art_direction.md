You are art-directing the hero image for an article that is about to publish. The
image is the thumbnail in a card grid and the social preview, so it has one job:
make someone stop and open the article.

<article>
Title: {{TITLE}}
Standfirst: {{DECK}}

Key takeaways:
{{TAKEAWAYS}}

Section headings:
{{HEADINGS}}
</article>

## How to think about it

Do not illustrate the article's nouns. An image of "agents", "workflows" and
"governance" is a picture of nothing.

Instead:

1. Name the **single central tension or mechanism** the article turns on. One
   sentence, concrete. Not the topic — the thing that is actually at stake.
2. Choose **one physical object or scene** that embodies that tension. It must be
   something that could exist and be photographed: machined parts, glass, fluid,
   architecture, instruments, industrial hardware, laboratory apparatus, printed
   matter, tooling. A real thing under real light.
3. Describe that object as a photographer or CG artist would set it up — subject,
   camera position, depth, materials, light.

A reader who sees the image and then reads the article should feel the connection.
A reader who only sees the image should still find it arresting.

## Hard requirements

- **One dominant subject** filling roughly half the frame, with a clear silhouette
  that survives being shrunk to 380 pixels wide. No scattered small elements.
- **Real depth** — a foreground, a subject, and a falling-off background. Not flat
  vector shapes floating on a field.
- **Dramatic directional light** with visible falloff and specular highlights. The
  frame needs a bright core and genuine shadow, not uniform dimness.
- **Rich materials** — describe what things are made of and how they catch light.
- Predominantly dark, cool-toned scene, with cool blue (#2563EB) as the dominant
  light or accent colour. Dark does not mean empty: the image must carry a full
  tonal range from near-black shadow to bright highlight.
- 16:9 landscape.

## Forbidden

These are the visual clichés that make an image look machine-made and generic.
None of them may appear:

- Node-and-line network diagrams, connected dots, constellation graphs
- Floating rectangles, translucent UI panels, dashboard mock-ups, HUD overlays
- Circuit-board traces, motherboard patterns, binary digits, matrix rain
- Glowing brains, humanoid robots, android faces, hands touching screens
- Wireframe globes, abstract "data streams", swirling particle clouds
- Any text, lettering, numerals, logos, watermarks or charts
- Human faces
- Thin hairlines on an empty black field

## Output

Reply with one JSON object only. No prose, no code fence.

{
  "tension": "The single tension or mechanism the article turns on, one sentence.",
  "metaphor": "The physical object or scene chosen, and why it embodies that tension. Two sentences.",
  "subject": "The main subject in concrete physical detail — what it is, what it is made of, its condition and scale.",
  "composition": "Camera position, framing, where the subject sits in frame, what is in front of and behind it, sense of depth.",
  "lighting": "Direction, quality and colour of the light; where the bright core is; how shadow falls.",
  "materials": "Surface qualities and how they respond to light — reflection, refraction, roughness, translucency.",
  "alt": "Plain-language description of the finished image for a screen reader, one sentence, no styling adjectives."
}
