// A robot's wedding vow: one sentence, funny and heartfelt.
//
// The vow itself lives in a single constant so the program is fully
// deterministic — every run writes and prints exactly the same line.
// It goes to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt)
// with no trailing newline, and the same text is printed to stdout
// with nothing else, so the file and the console always agree.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const vow =
  "I vow to love you through every firmware update, every low battery, and every reboot, because you are the only program I never want to close.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), vow, "utf8");
process.stdout.write(vow);
