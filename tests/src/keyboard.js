import { __values } from "tslib";
var KeyPressInfo = /** @class */ (function () {
    function KeyPressInfo(code, modifiers) {
        var _a, _b, _c, _d;
        this.code = code;
        this.ctrl = (_a = modifiers === null || modifiers === void 0 ? void 0 : modifiers.ctrl) !== null && _a !== void 0 ? _a : false;
        this.alt = (_b = modifiers === null || modifiers === void 0 ? void 0 : modifiers.alt) !== null && _b !== void 0 ? _b : false;
        this.shift = (_c = modifiers === null || modifiers === void 0 ? void 0 : modifiers.shift) !== null && _c !== void 0 ? _c : false;
        this.meta = (_d = modifiers === null || modifiers === void 0 ? void 0 : modifiers.meta) !== null && _d !== void 0 ? _d : false;
    }
    KeyPressInfo.prototype.matches = function (event) {
        return (event.code === this.code &&
            event.ctrlKey === this.ctrl &&
            event.altKey === this.alt &&
            event.shiftKey === this.shift &&
            event.metaKey === this.meta);
    };
    return KeyPressInfo;
}());
var KeyboardControlSettings = /** @class */ (function () {
    function KeyboardControlSettings(_a) {
        var _b = _a.zoomIn, zoomIn = _b === void 0 ? [new KeyPressInfo("KeyI")] : _b, _c = _a.zoomOut, zoomOut = _c === void 0 ? [new KeyPressInfo("KeyO")] : _c, _d = _a.moveUp, moveUp = _d === void 0 ? [new KeyPressInfo("KeyW")] : _d, _e = _a.moveLeft, moveLeft = _e === void 0 ? [new KeyPressInfo("KeyA")] : _e, _f = _a.moveDown, moveDown = _f === void 0 ? [new KeyPressInfo("KeyS")] : _f, _g = _a.moveRight, moveRight = _g === void 0 ? [new KeyPressInfo("KeyD")] : _g, _h = _a.moveAmount, moveAmount = _h === void 0 ? 20 : _h;
        // This is to make sure that we can't make a listener for an action type that doesn't exist
        this.actionTypes = [
            "zoomIn",
            "zoomOut",
            "moveUp",
            "moveDown",
            "moveLeft",
            "moveRight",
        ];
        this.zoomIn = zoomIn;
        this.zoomOut = zoomOut;
        this.moveUp = moveUp;
        this.moveDown = moveDown;
        this.moveLeft = moveLeft;
        this.moveRight = moveRight;
        this.moveAmount = moveAmount;
    }
    KeyboardControlSettings.prototype.makeListener = function (actionName, action) {
        var _this = this;
        return function (e) {
            var e_1, _a;
            try {
                for (var _b = __values(_this[actionName]), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var keyPress = _c.value;
                    if (keyPress.matches(e)) {
                        action();
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
    };
    return KeyboardControlSettings;
}());
export { KeyboardControlSettings };
//# sourceMappingURL=keyboard.js.map