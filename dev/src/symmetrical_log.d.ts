type PNum = number | number[];
type ONum<T extends PNum> = T extends number ? number : number[];
export declare class SymmetricalLogTransform {
    private base;
    private logBase;
    constructor(base?: number);
    private log;
    sequence(max: number, index?: boolean): number[];
    private inverseTransform;
    private transform;
    fromSymLogIndex<T extends PNum>(value: T): ONum<T>;
    toSymlogIndex<T extends PNum>(value: T): ONum<T>;
}
export declare function makeSymmetric(right: number[]): number[];
export declare function linspace(start: number, stop: number, delta: number): number[];
export declare function symmLinspace(start: number, stop: number, delta: number): number[];
export {};
