import React from 'react';
import { renderToString } from 'react-dom/server';
import NarrativesAndFAQ from './src/components/NarrativesAndFAQ';

const iterations = 10000;
const start = performance.now();

for (let i = 0; i < iterations; i++) {
  renderToString(<NarrativesAndFAQ />);
}

const end = performance.now();
console.log(`Rendered ${iterations} times in ${end - start} ms`);
