import { defineComponent } from "vue";
import { WWTAwareComponent } from "@wwtelescope/engine-pinia";
import { KeyboardControlSettings } from "../keyboard";
import screenfull from "screenfull";
var defaultWindowShape = { width: 1200, height: 900 };
export default defineComponent({
    extends: WWTAwareComponent,
    props: {
        kcs: { type: KeyboardControlSettings, default: new KeyboardControlSettings({}) }
    },
    data: function () {
        return {
            fullscreenModeActive: false,
            resizeObserver: null,
            touchscreen: false,
            windowShape: defaultWindowShape,
        };
    },
    created: function () {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.touchscreen = ('ontouchstart' in window) || ('ontouchstart' in document.documentElement) || !!window.navigator.msPointerEnabled;
    },
    mounted: function () {
        var _this = this;
        if (screenfull.isEnabled) {
            screenfull.on("change", this.onFullscreenEvent);
        }
        // ResizeObserver not yet in TypeScript but we should start using it when
        // available. If we're in an iframe, our shape might change spontaneously.
        this.resizeObserver = new ResizeObserver(function (_entries) { return _this.onResizeEvent(); });
        this.resizeObserver.observe(this.$el);
        this.onResizeEvent();
        // Handling key presses
        window.addEventListener("keydown", this.kcs.makeListener("zoomIn", function () { return _this.doZoom(true); }));
        window.addEventListener("keydown", this.kcs.makeListener("zoomOut", function () { return _this.doZoom(false); }));
        window.addEventListener("keydown", this.kcs.makeListener("moveUp", function () {
            return _this.doMove(0, _this.kcs.moveAmount);
        }));
        window.addEventListener("keydown", this.kcs.makeListener("moveDown", function () {
            return _this.doMove(0, -_this.kcs.moveAmount);
        }));
        window.addEventListener("keydown", this.kcs.makeListener("moveLeft", function () {
            return _this.doMove(_this.kcs.moveAmount, 0);
        }));
        window.addEventListener("keydown", this.kcs.makeListener("moveRight", function () {
            return _this.doMove(-_this.kcs.moveAmount, 0);
        }));
    },
    destroyed: function () {
        var _a;
        if (screenfull.isEnabled) {
            screenfull.off("change", this.onFullscreenEvent);
        }
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.unobserve(this.$el);
    },
    methods: {
        doZoom: function (zoomIn) {
            if (zoomIn) {
                this.zoom(1 / 1.3);
            }
            else {
                this.zoom(1.3);
            }
        },
        doMove: function (x, y) {
            this.move({ x: x, y: y });
        },
        onFullscreenEvent: function () {
            // NB: we need the isEnabled check to make TypeScript happy even though it
            // is not necessary in practice here.
            if (screenfull.isEnabled) {
                this.fullscreenModeActive = screenfull.isFullscreen;
            }
        },
        onResizeEvent: function () {
            var width = this.$el.clientWidth;
            var height = this.$el.clientHeight;
            if (width > 0 && height > 0) {
                this.windowShape = { width: width, height: height };
            }
            else {
                this.windowShape = defaultWindowShape;
            }
        },
        blurActiveElement: function () {
            var active = document.activeElement;
            if (active instanceof HTMLElement) {
                active.blur();
            }
        }
    },
    computed: {
        fullscreenAvailable: function () {
            return screenfull.isEnabled;
        }
    }
});
//# sourceMappingURL=MiniDSBase.js.map