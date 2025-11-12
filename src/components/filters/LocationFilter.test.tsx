import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { LocationFilter } from './LocationFilter';
import { useFilterStore } from '@/stores/useFilterStore';
import { LOCATIONS } from '@/config/constants';

describe('LocationFilter', () => {
  beforeEach(() => {
    // Reset store to initial state before each test
    useFilterStore.setState({
      selectedLocation: LOCATIONS[0], // New York
      dateRange: { start: '2024-01-01', end: '2024-01-20' },
      selectedParameters: ['temperature'],
    });
  });

  it('should render with default location (New York)', () => {
    render(<LocationFilter />);
    
    const button = screen.getByRole('button', { name: /select location/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('New York, USA');
  });

  it('should display location label', () => {
    render(<LocationFilter />);
    
    const label = screen.getByText('Location');
    expect(label).toBeInTheDocument();
  });

  it('should show all locations when popover is opened', async () => {
    const user = userEvent.setup();
    render(<LocationFilter />);
    
    const button = screen.getByRole('button', { name: /select location/i });
    await user.click(button);
    
    // Check all 6 locations are displayed (using getAllByText since some text appears twice)
    expect(screen.getAllByText('New York, USA').length).toBeGreaterThan(0);
    expect(screen.getByText('London, UK')).toBeInTheDocument();
    expect(screen.getByText('Tokyo, Japan')).toBeInTheDocument();
    expect(screen.getByText('Sydney, Australia')).toBeInTheDocument();
    expect(screen.getByText('Mumbai, India')).toBeInTheDocument();
    expect(screen.getByText('São Paulo, Brazil')).toBeInTheDocument();
  });

  it('should update selected location when clicked', async () => {
    const user = userEvent.setup();
    render(<LocationFilter />);
    
    // Open popover
    const button = screen.getByRole('button', { name: /select location/i });
    await user.click(button);
    
    // Click on London
    const londonOption = screen.getByText('London, UK');
    await user.click(londonOption);
    
    // Check store was updated
    const state = useFilterStore.getState();
    expect(state.selectedLocation.name).toBe('London, UK');
    expect(state.selectedLocation.id).toBe('london');
  });

  it('should have proper ARIA attributes for accessibility', () => {
    render(<LocationFilter />);
    
    const button = screen.getByRole('button', { name: /select location/i });
    expect(button).toHaveAttribute('aria-label');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
  });
});

