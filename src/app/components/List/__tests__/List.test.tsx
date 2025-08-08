import { render, screen, fireEvent } from '@testing-library/react';
import List from '../index';
import { INPUT_PLACEHOLDER, NO_RESULTS_TEXT } from '../constants';
import { Result } from '@/app/interfaces';

describe('List Component', () => {
  const mockResults: Result[] = [
    {
      id: 1,
      name: 'Rick Sanchez',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      url: ''
    },
    {
      id: 2,
      name: 'Morty Smith',
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      url: ''
    }
  ];

  it('renders search input with correct placeholder', () => {
    render(<List results={mockResults} />);
    const searchInput = screen.getByPlaceholderText(INPUT_PLACEHOLDER);
    expect(searchInput).toBeInTheDocument();
  });

  it('filters characters when typing in search input', () => {
    render(<List results={mockResults} />);
    const searchInput = screen.getByPlaceholderText(INPUT_PLACEHOLDER);
    
    // Type 'rick' in the search input
    fireEvent.change(searchInput, { target: { value: 'rick' } });
    
    // Check if only Rick is displayed
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.queryByText('Morty Smith')).not.toBeInTheDocument();
  });
  
  it('displays no results message when no characters match the search', () => {
    render(<List results={mockResults} />);
    const searchInput = screen.getByPlaceholderText(INPUT_PLACEHOLDER);
    
    // Type a non-matching string in the search input
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    // Check if no results message is displayed
    expect(screen.getByText(NO_RESULTS_TEXT)).toBeInTheDocument();
  });
});
