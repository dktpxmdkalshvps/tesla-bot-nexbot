import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import SplineViewer from '../SplineViewer';

describe('SplineViewer Component', () => {
  it('shows loading state initially and hides it after iframe loads', () => {
    render(<SplineViewer />);

    expect(screen.getByText('Connecting to 3D Interface...')).toBeInTheDocument();

    const iframe = screen.getByTitle('Nexbot 3D Interactive Model');
    expect(iframe).toBeInTheDocument();

    fireEvent.load(iframe);

    expect(screen.queryByText('Connecting to 3D Interface...')).not.toBeInTheDocument();
  });

  it('renders decorative HUD elements', () => {
    render(<SplineViewer />);

    expect(screen.getByText('Nexbot Optimus v2.0')).toBeInTheDocument();
    expect(screen.getByText('Full-Axis Simulation')).toBeInTheDocument();
  });
});
