const day = process.argv[2];
const mode = process.argv[3];

if (!day) {
  console.error("Usage: npm run solve [dayNumber]");
  process.exit(1);
}

const run = async () => {
  try {
    const module = await import(`./day${day}/index.ts`);
    if (module.default) {
      module.default(mode);
    } else {
      console.error(`Day ${day} does not export a default function.`);
    }
  } catch (error) {
    console.error(`Error loading day ${day}:`, error);
  }
};

run();
