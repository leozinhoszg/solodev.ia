/**
 * Detects if the current device is likely too weak for WebGL backgrounds.
 * Returns true when we should skip WebGL (e.g., fall back to a static image).
 */
export function detectLowEnd(): boolean {
  if (typeof window === "undefined") return true;

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return true;
  }

  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  if (typeof memory === "number" && memory < 4) return true;

  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) return true;

    const glCtx = gl as WebGLRenderingContext;
    const debugInfo = glCtx.getExtension("WEBGL_debug_renderer_info");
    if (debugInfo) {
      const renderer = glCtx
        .getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        ?.toString()
        .toLowerCase();
      if (
        renderer &&
        (renderer.includes("swiftshader") ||
          renderer.includes("software") ||
          renderer.includes("llvmpipe"))
      ) {
        return true;
      }
    }
  } catch {
    return true;
  }

  return false;
}
