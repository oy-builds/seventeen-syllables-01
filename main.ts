// Seventeen Syllables of Debugging: writes one haiku about debugging
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const lines = [
  "Cursor blinks at three",
  "I add one print — bug runs clean",
  "delete it — chaos",
];

const text = lines.join("\n") + "\n";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, text, "utf8");

// Read the written file back and verify it matches, so a truncated
// or corrupted write fails loudly instead of being silently judged.
const written = readFileSync(outPath, "utf8");
if (written !== text) {
  console.error("error: written output does not match the haiku");
  process.exit(1);
}
