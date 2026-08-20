import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import NarrativesAndFAQ from '../NarrativesAndFAQ';

describe('NarrativesAndFAQ Component', () => {
  it('toggles FAQ answers correctly', () => {
    render(<NarrativesAndFAQ />);

    const firstQuestion = /What domestic chores can Nexbot manage\?/i;
    const firstAnswer = /Nexbot is fully trained to manage high-dexterity kitchen cooking/i;
    const secondQuestion = /Is Nexbot available for purchase today\?/i;
    const secondAnswer = /Alpha pre-orders are currently open globally/i;

    // Initially answers are hidden
    expect(screen.queryByText(firstAnswer)).not.toBeInTheDocument();
    expect(screen.queryByText(secondAnswer)).not.toBeInTheDocument();

    const firstBtn = screen.getByRole('button', { name: firstQuestion });
    expect(firstBtn).toHaveAttribute('aria-expanded', 'false');

    // Click first FAQ
    fireEvent.click(firstBtn);
    expect(firstBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(firstAnswer)).toBeInTheDocument();
    expect(screen.queryByText(secondAnswer)).not.toBeInTheDocument();

    // Click same FAQ to close
    fireEvent.click(firstBtn);
    expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(firstAnswer)).not.toBeInTheDocument();

    // Click second FAQ
    const secondBtn = screen.getByRole('button', { name: secondQuestion });
    fireEvent.click(secondBtn);
    expect(secondBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(secondAnswer)).toBeInTheDocument();
    expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(firstAnswer)).not.toBeInTheDocument();

    // Click first FAQ while second is open
    fireEvent.click(firstBtn);
    expect(firstBtn).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(firstAnswer)).toBeInTheDocument();
    expect(secondBtn).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(secondAnswer)).not.toBeInTheDocument();
  });
});
