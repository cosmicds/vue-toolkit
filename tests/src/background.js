var BackgroundImageset = /** @class */ (function () {
    function BackgroundImageset(displayName, imagesetName) {
        this.displayName = displayName;
        this.imagesetName = imagesetName;
    }
    return BackgroundImageset;
}());
export { BackgroundImageset };
export var skyBackgroundImagesets = [
    new BackgroundImageset("Optical (Terapixel DSS)", "Digitized Sky Survey (Color)"),
    new BackgroundImageset("Low-frequency radio (VLSS)", "VLSS: VLA Low-frequency Sky Survey (Radio)"),
    new BackgroundImageset("Infrared (2MASS)", "2Mass: Imagery (Infrared)"),
    new BackgroundImageset("Infrared (SFD dust map)", "SFD Dust Map (Infrared)"),
    new BackgroundImageset("Ultraviolet (GALEX)", "GALEX (Ultraviolet)"),
    new BackgroundImageset("X-Ray (ROSAT RASS)", "RASS: ROSAT All Sky Survey (X-ray)"),
    new BackgroundImageset("Gamma Rays (FERMI LAT 8-year)", "Fermi LAT 8-year (gamma)"),
];
//# sourceMappingURL=background.js.map