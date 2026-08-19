import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import SpecsSection from '../SpecsSection';

describe('SpecsSection Component', () => {
  it('renders correct category icons based on category name', () => {
    render(<SpecsSection />);

    // Find the tablist
    const tablist = screen.getByRole('tablist', { name: /Technical Specifications Categories/i });
    const tabs = within(tablist).getAllByRole('tab');

    expect(tabs.length).toBe(3);

    // Tab 0: "Physical & Dimensions" -> fallback -> Compass
    const tab0Icon = tabs[0].querySelector('svg');
    expect(tab0Icon).toHaveClass('lucide-compass');
    expect(tabs[0]).toHaveTextContent('Physical & Dimensions');

    // Tab 1: "Neural Compute & AI" -> includes "Compute" -> Cpu
    const tab1Icon = tabs[1].querySelector('svg');
    expect(tab1Icon).toHaveClass('lucide-cpu');
    expect(tabs[1]).toHaveTextContent('Neural Compute & AI');

    // Tab 2: "Actuation & Power" -> includes "Actuation" -> Zap
    const tab2Icon = tabs[2].querySelector('svg');
    expect(tab2Icon).toHaveClass('lucide-zap');
    expect(tabs[2]).toHaveTextContent('Actuation & Power');
  });
});
