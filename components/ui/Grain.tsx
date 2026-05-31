/**
 * Animated film grain that sits above everything (below the cursor).
 * Pure CSS — no JS cost. Subtle by design so it never muddies the imagery.
 */
export default function Grain() {
  return <div className="noise-overlay animate-grain" aria-hidden />;
}
