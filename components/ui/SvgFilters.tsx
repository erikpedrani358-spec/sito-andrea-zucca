/**
 * Global SVG filter definitions.
 * Rendered once (hidden) so any element can reference them via CSS `filter`.
 * - #az-distress       → heavy torn / barbed-wire edge for runway titles
 * - #az-distress-soft  → subtler erosion for secondary headings
 * - #az-duotone-*      → image grading filters used on hover states
 */
export default function SvgFilters() {
  return (
    <svg
      aria-hidden
      focusable="false"
      style={{ position: "absolute", width: 0, height: 0 }}
    >
      <defs>
        <filter id="az-distress">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.16"
            numOctaves={3}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={11}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        <filter id="az-distress-soft">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.09"
            numOctaves={2}
            seed={3}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={5}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
