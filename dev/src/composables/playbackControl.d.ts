import { engineStore } from '@wwtelescope/engine-pinia';
type WWTEngineStore = ReturnType<typeof engineStore>;
export declare function usePlaybackControl(store: WWTEngineStore, debug?: boolean): {
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    setSpeed: (rate: number) => void;
    timePlaying: import('vue').Ref<boolean, boolean>;
    clockRate: import('vue').Ref<number, number>;
};
export {};
