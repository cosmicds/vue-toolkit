import { App } from 'vue';
/**
 * Mock out WebGL contexts
 */
declare class MockWebGLRenderingContext {
    canvas: HTMLCanvasElement;
    constructor(canvas: HTMLCanvasElement);
}
declare class MockWebGL2RenderingContext extends MockWebGLRenderingContext {
}
declare const WEBGL_CONTEXTS: {
    readonly 1: readonly ["webgl", typeof MockWebGLRenderingContext];
    readonly 2: readonly ["webgl2", typeof MockWebGL2RenderingContext];
    readonly experimental: readonly ["experimental-webgl", typeof MockWebGLRenderingContext];
};
type WebGLVersion = keyof (typeof WEBGL_CONTEXTS);
export declare function mockWebGL(versions: WebGLVersion[]): import('vitest').Mock<{
    (contextId: "2d", options?: CanvasRenderingContext2DSettings): CanvasRenderingContext2D | null;
    (contextId: "bitmaprenderer", options?: ImageBitmapRenderingContextSettings): ImageBitmapRenderingContext | null;
    (contextId: "webgl", options?: WebGLContextAttributes): WebGLRenderingContext | null;
    (contextId: "webgl2", options?: WebGLContextAttributes): WebGL2RenderingContext | null;
    (contextId: string, options?: any): RenderingContext | null;
}>;
export declare function mockWebGLCleanup(): void;
export declare function withSetup<T>(composable: () => T): [T, App];
export {};
