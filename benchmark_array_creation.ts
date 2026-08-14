function baseline() {
  const countries = ["South Korea", "United States", "Japan", "Germany", "United Kingdom", "United Arab Emirates", "Singapore"];
  return countries;
}

const COUNTRIES = ["South Korea", "United States", "Japan", "Germany", "United Kingdom", "United Arab Emirates", "Singapore"];
function optimized() {
  return COUNTRIES;
}

const iterations = 10000000;

let start = performance.now();
for (let i = 0; i < iterations; i++) {
  baseline();
}
let end = performance.now();
console.log(`Baseline array creation: ${(end - start).toFixed(2)}ms`);

start = performance.now();
for (let i = 0; i < iterations; i++) {
  optimized();
}
end = performance.now();
console.log(`Optimized array reference: ${(end - start).toFixed(2)}ms`);
