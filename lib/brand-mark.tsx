import { ImageResponse } from "next/og";

export const azMarkStyle = {
  background: "#050505",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative" as const,
};

export const azTextStyle = {
  fontFamily: "Georgia, serif",
  fontStyle: "italic" as const,
  fontSize: 28,
  color: "#e8e8e8",
  letterSpacing: "-0.04em",
  lineHeight: 1,
};

export const azAccentStyle = {
  position: "absolute" as const,
  bottom: 0,
  left: 0,
  right: 0,
  height: 3,
  background: "#e10600",
};

export async function renderAzImage(size: number) {
  const fontSize = Math.round(size * 0.44);

  return new ImageResponse(
    (
      <div style={azMarkStyle}>
        <span style={{ ...azTextStyle, fontSize }}>AZ</span>
        <div style={{ ...azAccentStyle, height: Math.max(2, Math.round(size * 0.08)) }} />
      </div>
    ),
    {
      width: size,
      height: size,
    }
  );
}
