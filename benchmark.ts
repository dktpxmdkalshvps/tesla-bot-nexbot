const UPGRADES_LIST = Array.from({ length: 1000 }, (_, i) => ({ id: `upgrade-${i}` }));
const selectedUpgrades = Array.from({ length: 500 }, (_, i) => ({ id: `upgrade-${i * 2}` }));

function runBaseline() {
    let checkedCount = 0;
    for (const upgrade of UPGRADES_LIST) {
        const isChecked = selectedUpgrades.some(u => u.id === upgrade.id);
        if (isChecked) checkedCount++;
    }
    return checkedCount;
}

function runOptimized() {
    let checkedCount = 0;
    const selectedIds = new Set(selectedUpgrades.map(u => u.id));
    for (const upgrade of UPGRADES_LIST) {
        const isChecked = selectedIds.has(upgrade.id);
        if (isChecked) checkedCount++;
    }
    return checkedCount;
}

const iterations = 5000;

const startBaseline = performance.now();
for (let i = 0; i < iterations; i++) {
    runBaseline();
}
const endBaseline = performance.now();
console.log(`Baseline: ${(endBaseline - startBaseline).toFixed(2)}ms`);

const startOptimized = performance.now();
for (let i = 0; i < iterations; i++) {
    runOptimized();
}
const endOptimized = performance.now();
console.log(`Optimized: ${(endOptimized - startOptimized).toFixed(2)}ms`);
