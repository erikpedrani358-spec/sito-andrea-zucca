import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const alt = "Andrea Zucca — fashion designer portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const file = await readFile(
    path.join(process.cwd(), "public/assets/stylist/01.jpg")
  );
  const src = `data:image/jpeg;base64,${file.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#050505",
        }}
      >
        <img
          src={src}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "44% 15%",
            opacity: 0.92,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.55) 38%, rgba(5,5,5,0.08) 72%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 64,
            bottom: 56,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontSize: 72,
              color: "#e8e8e8",
              letterSpacing: "-0.03em",
            }}
          >
            Andrea Zucca
          </span>
          <span
            style={{
              fontSize: 22,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8a8a8a",
            }}
          >
            Fashion Designer · Milano
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
