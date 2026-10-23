import { ImageResponse } from "next/og";

export const alt = "Andrea Zucca — fashion designer portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social share card (WhatsApp / iMessage / X / LinkedIn).
 * A pure typographic brand lockup — AZ monogram, red sashiko stitch,
 * wordmark and tagline on ink — vector-sharp at any preview size,
 * no photography, consistent with favicon and app icons.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "#050505",
          backgroundImage:
            "radial-gradient(62% 52% at 50% 40%, rgba(225,6,0,0.16) 0%, rgba(5,5,5,0) 70%)",
        }}
      >
        {/* AZ monogram */}
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 190,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "#e8e8e8",
            display: "flex",
          }}
        >
          AZ
        </span>

        {/* Red sashiko stitch divider */}
        <div
          style={{
            width: 280,
            height: 3,
            marginTop: 34,
            marginBottom: 38,
            background:
              "repeating-linear-gradient(90deg, #e10600 0 12px, rgba(5,5,5,0) 12px 28px)",
            display: "flex",
          }}
        />

        {/* Wordmark */}
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontSize: 84,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "#e8e8e8",
            display: "flex",
          }}
        >
          Andrea Zucca
        </span>

        {/* Tagline */}
        <span
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "#8a8a8a",
            marginTop: 26,
            display: "flex",
          }}
        >
          FASHION DESIGNER — MILANO
        </span>

        {/* Corner metadata */}
        <span
          style={{
            position: "absolute",
            left: 56,
            bottom: 44,
            fontSize: 17,
            letterSpacing: "0.12em",
            color: "#5a5a5a",
            display: "flex",
          }}
        >
          45.4642° N / 9.1900° E
        </span>
        <span
          style={{
            position: "absolute",
            right: 56,
            bottom: 44,
            fontSize: 17,
            letterSpacing: "0.12em",
            color: "#5a5a5a",
            display: "flex",
          }}
        >
          www.andreazucca.eu
        </span>

        {/* Brand red baseline */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 6,
            background: "#e10600",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
