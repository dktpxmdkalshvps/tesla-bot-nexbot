import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Header from '../Header';

describe('Header Component', () => {
  const mockOnPreOrderClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock scrollIntoView and getElementById
    window.HTMLElement.prototype.scrollIntoView = vi.fn();
    document.getElementById = vi.fn().mockReturnValue(document.createElement('div'));
    window.scrollTo = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the logo and desktop navigation elements', () => {
    const { container } = render(<Header onPreOrderClick={mockOnPreOrderClick} activeSection="overview" />);

    expect(screen.getByText('NEXBOT')).toBeInTheDocument();
    expect(screen.getByText('TESLA COLLABORATIVE')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Technology')).toBeInTheDocument();
    expect(screen.getByText('Customizer')).toBeInTheDocument();
    expect(screen.getByText('Specifications')).toBeInTheDocument();

    const preOrderBtn = container.querySelector('#header-preorder-btn');
    expect(preOrderBtn).toBeInTheDocument();
  });

  it('calls onPreOrderClick when desktop Pre-order button is clicked', () => {
    const { container } = render(<Header onPreOrderClick={mockOnPreOrderClick} activeSection="overview" />);

    const preOrderBtn = container.querySelector('#header-preorder-btn');
    if (preOrderBtn) {
      fireEvent.click(preOrderBtn);
    }

    expect(mockOnPreOrderClick).toHaveBeenCalledTimes(1);
  });

  it('applies aria-current to the active section link', () => {
    render(<Header onPreOrderClick={mockOnPreOrderClick} activeSection="technology" />);

    // There are both desktop and mobile links, but we can query all 'Technology' and check desktop
    const techButtons = screen.getAllByText('Technology');
    // Desktop navigation is typically the first one before mobile is open, or it could be hidden
    // Let's rely on role or just check the aria-current attribute on the element
    const techBtnDesktop = techButtons[0];
    expect(techBtnDesktop.closest('button')).toHaveAttribute('aria-current', 'true');

    const overviewButtons = screen.getAllByText('Overview');
    expect(overviewButtons[0].closest('button')).not.toHaveAttribute('aria-current');
  });

  it('toggles mobile menu and calls onPreOrderClick from mobile menu', () => {
    const { container } = render(<Header onPreOrderClick={mockOnPreOrderClick} activeSection="overview" />);

    const toggleBtn = container.querySelector('#mobile-menu-toggle');
    expect(toggleBtn).toBeInTheDocument();

    // Menu is closed initially
    expect(screen.queryByText('Pre-order Now')).not.toBeInTheDocument();

    // Open menu
    if (toggleBtn) {
      fireEvent.click(toggleBtn);
    }

    const mobilePreOrderBtn = screen.getByText('Pre-order Now');
    expect(mobilePreOrderBtn).toBeInTheDocument();

    // Click mobile pre-order button
    fireEvent.click(mobilePreOrderBtn);

    expect(mockOnPreOrderClick).toHaveBeenCalledTimes(1);

    // Menu should be closed after clicking pre-order
    expect(screen.queryByText('Pre-order Now')).not.toBeInTheDocument();
  });

  it('closes the mobile menu when Escape key is pressed', () => {
    const { container } = render(<Header onPreOrderClick={mockOnPreOrderClick} activeSection="overview" />);

    const toggleBtn = container.querySelector('#mobile-menu-toggle');
    if (toggleBtn) {
      fireEvent.click(toggleBtn); // Open menu
    }

    expect(screen.getByText('Pre-order Now')).toBeInTheDocument();

    // Press escape
    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' });

    expect(screen.queryByText('Pre-order Now')).not.toBeInTheDocument();
  });

  it('calls scrollIntoView when a navigation item is clicked', () => {
    const mockScrollIntoView = vi.fn();
    const mockElement = document.createElement('div');
    mockElement.scrollIntoView = mockScrollIntoView;
    document.getElementById = vi.fn().mockReturnValue(mockElement);

    render(<Header onPreOrderClick={mockOnPreOrderClick} activeSection="overview" />);

    const techButtons = screen.getAllByText('Technology');
    fireEvent.click(techButtons[0]);

    expect(document.getElementById).toHaveBeenCalledWith('technology');
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('updates background style on scroll', () => {
    // We mock window.scrollY getter
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });

    // In jsdom, requestAnimationFrame doesn't run automatically.
    // The component logic checks `window.scrollY > 20` inside `requestAnimationFrame`.
    // We can intercept the callback and call it manually during act().
    let rafCallback: FrameRequestCallback | null = null;
    const rafSpy = vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      rafCallback = cb;
      return 0;
    });

    const { container } = render(<Header onPreOrderClick={mockOnPreOrderClick} activeSection="overview" />);

    const header = container.querySelector('#main-header');

    // Initial state
    expect(header?.className).toContain('bg-transparent');

    // Simulate scroll down
    act(() => {
      window.scrollY = 50;
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      if (rafCallback) rafCallback(0);
    });

    expect(header?.className).toContain('bg-neutral-950/80');

    // Simulate scroll up
    act(() => {
      window.scrollY = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    act(() => {
      if (rafCallback) rafCallback(0);
    });

    expect(header?.className).toContain('bg-transparent');

    rafSpy.mockRestore();
  });

  it('calls window.scrollTo when the logo is clicked', () => {
    render(<Header onPreOrderClick={mockOnPreOrderClick} activeSection="overview" />);

    const logoButton = screen.getByLabelText('Scroll to top');
    fireEvent.click(logoButton);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
