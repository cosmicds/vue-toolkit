import { filterInPlace, isMobile, isWebGLEnabled } from "../utils";
import { describe, expect, it } from "vitest";
import { mockWebGL, mockWebGLCleanup } from "./utils";


describe("Test utilities", () => {

  it("should correctly filter primitives", () => {
    const integers = [1, 6, 4, 2, 5, 3];
    filterInPlace(integers, t => t > 3);
    expect(integers).toEqual([6, 4, 5]);

    const strings = [
      "alpha",
      "beta",
      "gamma",
      "delta",
      "epsilon",
      "zeta",
    ];
    filterInPlace(strings, s => s.length > 4 && s.charAt(0) != "e");
    expect(strings).toEqual(["alpha", "gamma", "delta"]);
  });

  it("Should correctly filter objects", () => {
    const objects = [
      { name: "Alice", id: 1 },
      { name: "Bob", id: 2 },
      { name: "Colin", id: 3},
    ];

    filterInPlace(objects, t => t.name == "Bob");
    expect(objects.length).toEqual(1);
    expect(objects).toContainEqual({ name: "Bob", id: 2});
  });


  it("should correctly determine whether WebGL2 is available", () => {
    const spy = mockWebGL([1]);
    try {
      expect(isWebGLEnabled(2)).toEqual(false);
    } finally {
      spy.mockRestore();
      mockWebGLCleanup();
    }

    const spy2 = mockWebGL([1, 2]);
    try {
      expect(isWebGLEnabled(2)).toEqual(true);
    } finally {
      spy2.mockRestore();
      mockWebGLCleanup();
    }
  });

  it("Should correctly detect whether a user agent string is from a mobile device", () => {

    const mobileUserAgents = [
      // iOS Safari (iPhone)
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",

      // iOS Safari (iPad)
      "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",

      // Android Chrome
      "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Mobile Safari/537.36",

      // Android Firefox
      "Mozilla/5.0 (Android 14; Mobile; rv:126.0) Gecko/126.0 Firefox/126.0",

      // Samsung Internet
      "Mozilla/5.0 (Linux; Android 14; SM-S928B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/26.0 Chrome/122.0.0.0 Mobile Safari/537.36",

      // iOS Chrome (still uses WebKit under the hood)
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/126.0.6478.54 Mobile/15E148 Safari/604.1",

      // Windows Phone (legacy, still shows up in old test suites)
      "Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15254",
    ];

    mobileUserAgents.forEach(userAgent => expect(isMobile(userAgent)).toBe(true));

    const desktopUserAgents = [
      // Chrome on Windows
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",

      // Chrome on macOS
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",

      // Firefox on Windows
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0",

      // Firefox on Linux
      "Mozilla/5.0 (X11; Linux x86_64; rv:127.0) Gecko/20100101 Firefox/127.0",

      // Safari on macOS
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",

      // Edge on Windows
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",

      // Chrome on Linux
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    ];

    desktopUserAgents.forEach(userAgent => expect(isMobile(userAgent)).toBe(false));
  });

});
