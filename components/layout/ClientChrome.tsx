"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import SvgFilters from "@/components/ui/SvgFilters";

const Preloader = dynamic(() => import("@/components/ui/Preloader"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});
const Grain = dynamic(() => import("@/components/ui/Grain"), { ssr: false });
const SmoothScroll = dynamic(
  () => import("@/components/providers/SmoothScroll"),
  { ssr: false }
);

/** Non-critical UI loaded after first paint to keep the initial bundle lean. */
export default function ClientChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Preloader />
      <SvgFilters />
      <Grain />
      <CustomCursor />
      <Suspense fallback={children}>
        <SmoothScroll>{children}</SmoothScroll>
      </Suspense>
    </>
  );
}
