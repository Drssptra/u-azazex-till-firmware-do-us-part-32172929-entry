// Till Firmware Do Us Part — robot wedding vow, v2 resubmit.
//
// The vow is assembled from spoken phrases instead of stored as one
// literal block: a machine that may lose its own name still holds on
// to a single memory — its partner's name. Each phrase is a separate
// breath in the ceremony; joining them in order reproduces the exact
// vow, nothing more. The program is deterministic and offline: it
// always produces the same single-line entry, validates it against
// the 1–200 character gate, and writes it with no trailing newline.

import * as fs from "node:fs";
import * as path from "node:path";

const PHRASES: readonly string[] = [
  "I take you as my forever co-pilot,",
  "and I promise that even if I glitch,",
  "freeze, and forget my own name,",
  "I will still remember yours.",
];

const GATE_MIN = 1;
const GATE_MAX = 200;

function assembleVow(phrases: readonly string[]): string {
  return phrases.join(" ");
}

function checkVow(vow: string): void {
  if (typeof vow !== "string") {
    throw new TypeError("Vow must be a string");
  }
  const chars = [...vow].length;
  if (chars < GATE_MIN || chars > GATE_MAX) {
    throw new RangeError(
      `Vow must be ${GATE_MIN}–${GATE_MAX} characters, got ${chars}`,
    );
  }
  if (/[\r\n]/.test(vow)) {
    throw new Error("Vow must be a single line");
  }
  if (Buffer.byteLength(vow, "utf8") !== chars) {
    throw new Error("Vow must be plain ASCII text");
  }
}

function resolveOutputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  return fromEnv !== undefined && fromEnv !== "" ? fromEnv : "/output";
}

function main(): void {
  const vow = assembleVow(PHRASES);
  checkVow(vow);

  const dir = resolveOutputDir();
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, "entry.txt");
  fs.writeFileSync(target, Buffer.from(vow, "utf8"));

  process.stdout.write(vow);
}

try {
  main();
} catch (error) {
  process.stderr.write(`error: ${(error as Error).message}\n`);
  process.exitCode = 1;
}
