import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getAllByText(/NEXBOT/i).length).toBeGreaterThan(0);
  });

  it('can open pre-order modal', () => {
    render(<App />);
    const preorderButtons = screen.getAllByRole('button', { name: /pre-order/i });
    fireEvent.click(preorderButtons[0]);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
