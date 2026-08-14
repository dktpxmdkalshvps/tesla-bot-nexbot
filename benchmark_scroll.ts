function runBaseline(events: number) {
    let callCount = 0;
    let isScrolled = false;
    for (let i = 0; i < events; i++) {
        // baseline handler
        const handleScroll = () => {
            callCount++;
            if (i > 20) {
                isScrolled = true;
            } else {
                isScrolled = false;
            }
        };
        handleScroll();
    }
    return callCount;
}

function runOptimized(events: number) {
    let callCount = 0;
    let isScrolled = false;
    let ticking = false;

    // mock requestAnimationFrame
    const mockRaf = (cb: () => void) => {
        cb();
    };

    for (let i = 0; i < events; i++) {
        // optimized handler
        const handleScroll = () => {
            if (!ticking) {
                mockRaf(() => {
                    callCount++;
                    if (i > 20) {
                        isScrolled = true;
                    } else {
                        isScrolled = false;
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };
        handleScroll();
    }
    return callCount;
}

const EVENTS = 10000;
const baselineCalls = runBaseline(EVENTS);
const optimizedCalls = runOptimized(EVENTS);

console.log(`Simulated ${EVENTS} rapid scroll events:`);
console.log(`Baseline Handler Invocations: ${baselineCalls}`);
console.log(`Optimized Handler Invocations: ${optimizedCalls}`);
console.log(`Reduction in state updates: ${((baselineCalls - optimizedCalls) / baselineCalls * 100).toFixed(2)}%`);
