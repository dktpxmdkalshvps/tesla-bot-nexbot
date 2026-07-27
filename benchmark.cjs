const { performance } = require('perf_hooks');

const NUM_ELEMENTS = 4;
const mockDom = new Map();
for (let i = 0; i < NUM_ELEMENTS; i++) {
  mockDom.set(`section-${i}`, {
    id: `section-${i}`,
    offsetTop: i * 1000,
    offsetHeight: 1000
  });
}

global.document = {
  getElementById: (id) => mockDom.get(id) || null
};
global.window = { scrollY: 1500 };

const sections = ["section-0", "section-1", "section-2", "section-3"];

function oldHandleScroll() {
  const scrollPosition = window.scrollY + 250;
  for (const section of sections) {
    const el = document.getElementById(section);
    if (el) {
      const top = el.offsetTop;
      const height = el.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        return section;
      }
    }
  }
}

// Cached version
const elements = sections.map(id => document.getElementById(id)).filter(Boolean);

function newHandleScroll() {
  const scrollPosition = window.scrollY + 250;
  for (const el of elements) {
    const top = el.offsetTop;
    const height = el.offsetHeight;
    if (scrollPosition >= top && scrollPosition < top + height) {
      return el.id;
    }
  }
}

const iterations = 10000000;

const start1 = performance.now();
for (let i = 0; i < iterations; i++) {
  oldHandleScroll();
}
const end1 = performance.now();

const start2 = performance.now();
for (let i = 0; i < iterations; i++) {
  newHandleScroll();
}
const end2 = performance.now();

console.log(`Baseline (getElementById inside loop): ${(end1 - start1).toFixed(2)}ms`);
console.log(`Optimized (cached elements): ${(end2 - start2).toFixed(2)}ms`);
console.log(`Improvement: ${(((end1 - start1) - (end2 - start2)) / (end1 - start1) * 100).toFixed(2)}%`);
