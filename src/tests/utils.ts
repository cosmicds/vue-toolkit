import { vi } from "vitest";

/**
 * Mock out WebGL contexts
 */

class MockWebGLRenderingContext {
  canvas: HTMLCanvasElement;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }
};

class MockWebGL2RenderingContext extends MockWebGLRenderingContext {};

const WEBGL_CONTEXTS = {
  1: ["webgl", MockWebGLRenderingContext],
  2: ["webgl2", MockWebGL2RenderingContext],
  "experimental": ["experimental-webgl", MockWebGLRenderingContext],
} as const;

type WebGLVersion = keyof (typeof WEBGL_CONTEXTS);

export function mockWebGL(versions: WebGLVersion[]) {
  const contextsData = versions.map(v => WEBGL_CONTEXTS[v]);
  vi.stubGlobal("WebGLRenderingContext", MockWebGLRenderingContext)
  vi.stubGlobal("WebGL2RenderingContext", MockWebGL2RenderingContext)
  return vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(function (this: HTMLCanvasElement, contextID, _options) {
    const index = contextsData.findIndex(data => data[0] == contextID);
    if (index > -1) {
      const ContextType = contextsData[index][1];
      return new ContextType(this) as RenderingContext;
    }
    return null;
  });
}

export function mockWebGLCleanup() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  delete globalThis.WebGLRenderingContext; delete globalThis.WebGL2RenderingContext;
}
