import {
  a as a1,
  b as b1,
  c as c1,
  d as d1,
  e as e1,
  local as local1,
  default as default1,
  def as def1,
} from "package-named";
it("should optimize named reexports from side effect free module", () => {
  expect(a1).toBe("a");
  expect(b1).toBe("b");
  expect(c1).toBe("x");
  expect(d1).toBe("y");
  expect(e1).toBe("x");
  expect(local1).toBe("local");
  expect(default1).toBe("local-default");
  expect(def1).toBe("default");
});

import { a as a2, b as b2, local as local2 } from "package-star";
it("should optimize star reexports from side effect free module", () => {
  expect(a2).toBe("a");
  expect(b2).toBe("b");
  expect(local2).toBe("local");
});

import {
  a as a3,
  b as b3,
  local as local3,
  outer as outer3,
} from "package-reexport";
it("should optimize a used star reexport from module with side effects", () => {
  expect(a3).toBe("a");
  expect(b3).toBe("b");
  expect(local3).toBe("local");
  expect(outer3).toBe("outer");
});

import { outer as outer4 } from "package-reexport-unused";
it("should optimize a unused star reexport from module with side effects", () => {
  expect(outer4).toBe("outer");
});

import { c as c5 } from "package-full";
it("should allow to import the whole module and pick without duplicating the module", () => {
  expect(c5).toEqual({ c: 1 });
  const fullModule = require("package-full");
  expect(fullModule.a).toEqual("a");
  expect(fullModule.b).toEqual("b");
  expect(fullModule.c).toEqual({ c: 1 });
  expect(fullModule.local).toEqual("local");
  expect(fullModule.default).toEqual("local-default");
  expect(fullModule.def).toEqual("default");

  // Check for identity
  expect(fullModule.c).toBe(c5);
});

import { a as a6 } from "package-reexport-side-effect";
import { effects as effects6 } from "package-reexport-side-effect/check-side-effect";
it("should run side effects of a reexporting module with side effects", () => {
  expect(a6).toBe("a");
  expect(effects6).toEqual(["side-effect.js", "side-effect2.js", "index.js"]);
});

import { a as a7 } from "package-reexport-tla-side-effect";
import { effects as effects7 } from "package-reexport-tla-side-effect/check-side-effect";
it("should run side effects of a reexporting module with side effects (async modules)", () => {
  expect(a7).toBe("a");
  expect(effects7).toEqual(["side-effect.js", "side-effect2.js", "index.js"]);
});

import { effects as effects8 } from "package-require-side-effect/check-side-effect";
it("should run side effects of a reexporting module with side effects (async modules)", () => {
  expect(effects8).toEqual([]);
  require("package-require-side-effect");
  expect(effects8).toEqual(["side-effect.js", "side-effect2.js", "index.js"]);
});
