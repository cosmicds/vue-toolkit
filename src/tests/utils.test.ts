import { filterInPlace, isWebGLEnabled } from "../utils";
import { describe, expect, it, test } from "vitest";
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

});
