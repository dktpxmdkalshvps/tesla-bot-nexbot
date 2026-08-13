import { performance } from 'perf_hooks';
import { JSDOM } from 'jsdom';

// Simple polyfill for requestAnimationFrame
const dom = new JSDOM('<!DOCTYPE html><html><body><div id="overview"></div><div id="technology"></div><div id="customizer"></div><div id="specs"></div></body></html>');
const window = dom.window;

// Setup mock dimensions and scroll position
const mockSections = ["overview", "technology", "customizer", "specs"].map((id, index) => {
    const el = window.document.getElementById(id)!;
    Object.defineProperty(el, 'offsetTop', { value: index * 1000 });
    Object.defineProperty(el, 'offsetHeight', { value: 1000 });
    return el;
});

let scrollPosition = 0;
let callCount = 0;

// The original implementation
const originalHandleScroll = () => {
    callCount++;
    const sections = ["overview", "technology", "customizer", "specs"];
    const scrollPos = scrollPosition + 250;

    for (const section of sections) {
        const el = window.document.getElementById(section);
        if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                // setActiveSection(section);
                break;
            }
        }
    }
};

// A throttled implementation
let lastCallTime = 0;
let throttleTimer: any = null;
const throttledHandleScroll = () => {
    const now = Date.now();
    if (now - lastCallTime >= 100) {
        originalHandleScroll();
        lastCallTime = now;
    } else if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
            originalHandleScroll();
            throttleTimer = null;
            lastCallTime = Date.now();
        }, 100 - (now - lastCallTime));
    }
};

// Run baseline
console.log("Running baseline benchmark...");
callCount = 0;
const startOriginal = performance.now();
for (let i = 0; i < 100000; i++) {
    scrollPosition = i % 4000;
    originalHandleScroll();
}
const endOriginal = performance.now();
const timeOriginal = endOriginal - startOriginal;
const callsOriginal = callCount;
console.log(`Original: ${timeOriginal.toFixed(2)} ms, calls: ${callsOriginal}`);

// Run throttled
console.log("Running throttled benchmark...");
callCount = 0;
const startThrottled = performance.now();
for (let i = 0; i < 100000; i++) {
    scrollPosition = i % 4000;
    throttledHandleScroll();
}
const endThrottled = performance.now();
const timeThrottled = endThrottled - startThrottled;
const callsThrottled = callCount;
console.log(`Throttled: ${timeThrottled.toFixed(2)} ms, internal calls: ${callsThrottled}`);

console.log(`Improvement: ${((timeOriginal - timeThrottled) / timeOriginal * 100).toFixed(2)}% faster execution loop`);
console.log(`Function calls reduced by: ${((callsOriginal - callsThrottled) / callsOriginal * 100).toFixed(2)}%`);
