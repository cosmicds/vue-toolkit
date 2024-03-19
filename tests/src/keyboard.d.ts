declare class KeyPressInfo {
    code: string;
    ctrl: boolean;
    alt: boolean;
    shift: boolean;
    meta: boolean;
    constructor(code: string, modifiers?: {
        ctrl?: boolean;
        alt?: boolean;
        shift?: boolean;
        meta?: boolean;
    });
    matches(event: KeyboardEvent): boolean;
}
export declare class KeyboardControlSettings {
    zoomIn: KeyPressInfo[];
    zoomOut: KeyPressInfo[];
    moveUp: KeyPressInfo[];
    moveDown: KeyPressInfo[];
    moveLeft: KeyPressInfo[];
    moveRight: KeyPressInfo[];
    moveAmount: number;
    constructor({ zoomIn, zoomOut, moveUp, moveLeft, moveDown, moveRight, moveAmount }: {
        zoomIn?: KeyPressInfo[] | undefined;
        zoomOut?: KeyPressInfo[] | undefined;
        moveUp?: KeyPressInfo[] | undefined;
        moveLeft?: KeyPressInfo[] | undefined;
        moveDown?: KeyPressInfo[] | undefined;
        moveRight?: KeyPressInfo[] | undefined;
        moveAmount?: number | undefined;
    });
    readonly actionTypes: readonly ["zoomIn", "zoomOut", "moveUp", "moveDown", "moveLeft", "moveRight"];
    makeListener(actionName: KeyboardControlSettings["actionTypes"][number], action: () => void): (e: KeyboardEvent) => void;
}
export {};
