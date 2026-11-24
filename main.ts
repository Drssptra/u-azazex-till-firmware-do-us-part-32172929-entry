// Till Firmware Do Us Part — a robot's wedding vow, revised.
//
// The vow is a single sentence a machine speaks at its own wedding: it
// leans on the robot's own vocabulary (updates, crashes, battery,
// processes) and lands the joke on a promise that is also tender —
// the one thing it will never shut down is its partner. The program is
// fully deterministic: every run writes and prints exactly the same
// line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt)
// with no trailing newline, and the same text goes to stdout with
// nothing else, so the file and the console always agree. A guard
// (MAX_VOW_LENGTH) refuses to write anything outside the gate's
// 1–200 character window, so an over-long vow fails loudly instead
// of silently shipping an invalid entry.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const vow =
  "I vow to love you through every update, every system crash, and every low battery, because you are the one process I will never kill — not even for a reboot.";

const MAX_VOW_LENGTH = 200;

if (vow.length < 1 || vow.length > MAX_VOW_LENGTH) {
  throw new Error(
    `Vow must be 1–${MAX_VOW_LENGTH} characters, got ${vow.length}`,
  );
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), vow, "utf8");
process.stdout.write(vow);
