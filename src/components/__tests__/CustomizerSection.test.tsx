import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import CustomizerSection, { getModuleIcon } from '../CustomizerSection';

describe('CustomizerSection Component', () => {
  describe('getModuleIcon', () => {
    it('returns the companion icon for "companion"', () => {
      render(getModuleIcon('companion'));
      expect(screen.getByTestId('icon-companion')).toBeInTheDocument();
      expect(screen.getByTestId('icon-companion')).toHaveClass('text-red-500');
    });

    it('returns the kitchen icon for "kitchen"', () => {
      render(getModuleIcon('kitchen'));
      expect(screen.getByTestId('icon-kitchen')).toBeInTheDocument();
      expect(screen.getByTestId('icon-kitchen')).toHaveClass('text-amber-500');
    });

    it('returns the security icon for "security"', () => {
      render(getModuleIcon('security'));
      expect(screen.getByTestId('icon-security')).toBeInTheDocument();
      expect(screen.getByTestId('icon-security')).toHaveClass('text-emerald-500');
    });

    it('returns the industrial icon for "industrial"', () => {
      render(getModuleIcon('industrial'));
      expect(screen.getByTestId('icon-industrial')).toBeInTheDocument();
      expect(screen.getByTestId('icon-industrial')).toHaveClass('text-blue-500');
    });

    it('returns the default star icon for unknown ids', () => {
      render(getModuleIcon('unknown-id'));
      expect(screen.getByTestId('icon-default')).toBeInTheDocument();
      expect(screen.getByTestId('icon-default')).toHaveClass('text-white');
    });
  });

  it('toggles upgrades and updates total price correctly', () => {
    const mockOnPreOrderSubmit = vi.fn();
    render(<CustomizerSection onPreOrderSubmit={mockOnPreOrderSubmit} />);

    // Initial total price (Base 19900 + Titanium Finish 0 + Companion Module 3000 = 22900)
    const initialPriceElement = screen.getByText('$22,900');
    expect(initialPriceElement).toBeInTheDocument();

    // Find the 'Long-Range Solid-State Core' button
    const upgradeGroup = screen.getByRole('group', { name: /Performance Upgrades/i });
    const longRangeButton = within(upgradeGroup).getByRole('button', { name: /Long-Range Solid-State Core/i });

    // Verify initial state is unpressed
    expect(longRangeButton).toHaveAttribute('aria-pressed', 'false');

    // Toggle on
    fireEvent.click(longRangeButton);
    expect(longRangeButton).toHaveAttribute('aria-pressed', 'true');

    // Total price should increase by 2500 (22900 + 2500 = 25400)
    expect(screen.getByText('$25,400')).toBeInTheDocument();

    // Test multiple upgrades
    const nanoSensoryButton = within(upgradeGroup).getByRole('button', { name: /Nano-Sensory Tactile Hands/i });
    fireEvent.click(nanoSensoryButton);
    expect(nanoSensoryButton).toHaveAttribute('aria-pressed', 'true');
    // Total price should increase by 1800 (25400 + 1800 = 27200)
    expect(screen.getByText('$27,200')).toBeInTheDocument();

    // Toggle off the first upgrade
    fireEvent.click(longRangeButton);
    expect(longRangeButton).toHaveAttribute('aria-pressed', 'false');
    expect(nanoSensoryButton).toHaveAttribute('aria-pressed', 'true');
    // Total price should drop by 2500 (27200 - 2500 = 24700)
    expect(screen.getByText('$24,700')).toBeInTheDocument();
  });
});
