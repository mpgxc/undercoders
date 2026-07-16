"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  /** A self-contained HTML document (doctype, head, styles, body). */
  html: string;
  title: string;
};

/**
 * Renders a self-contained HTML article inside a same-origin `srcDoc` iframe so
 * its bespoke styles, fonts and SVGs are fully isolated from the blog's CSS.
 * The frame auto-sizes to its content and re-measures on load and on resize.
 */
export function RichPostFrame({ html, title }: Props) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1200);

  const measure = useCallback(() => {
    const doc = ref.current?.contentDocument;
    if (doc?.documentElement) {
      setHeight(doc.documentElement.scrollHeight);
    }
  }, []);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;

    measure();

    const onWindowResize = () => measure();
    window.addEventListener("resize", onWindowResize);

    let observer: ResizeObserver | undefined;
    const doc = iframe.contentDocument;
    if (doc?.body && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => measure());
      observer.observe(doc.body);
    }

    return () => {
      window.removeEventListener("resize", onWindowResize);
      observer?.disconnect();
    };
  }, [html, measure]);

  return (
    <iframe
      ref={ref}
      title={title}
      srcDoc={html}
      onLoad={measure}
      loading="lazy"
      sandbox="allow-same-origin allow-popups"
      className="block w-full rounded-xl border border-neutral-200 "
      style={{ height }}
    />
  );
}

export default RichPostFrame;
