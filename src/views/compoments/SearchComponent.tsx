import Router from 'next/router';
import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import { SearchResult } from '@api/SectionApi';

interface SearchComponentProps {
  handleSearch: (keyword: string, condition?: number) => Promise<SearchResult[] | undefined>;
  move_path: string;
  condition?: number;
}

const Container = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SearchResultOverlay = styled.div<{ $isVisible: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  display: ${props => (props.$isVisible ? 'block' : 'none')};
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const SearchResultThumbnail = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

const SearchResultLabel = styled.div`
  font-size: 16px;
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 8px;
`;

export const SearchComponent: React.FC<SearchComponentProps> = ({ handleSearch, condition, move_path }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchRef = useRef(
    debounce(async (term: string) => {
      if (term.trim().length === 0) {
        setSearchResults([]);
        setIsSearchResultsVisible(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await handleSearch(term, condition);
        if (results) {
          setSearchResults(results);
          setIsSearchResultsVisible(true);
        }
      } catch (err) {
        setError('검색 중 오류가 발생했습니다.');
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300)
  );

  const handleResultClick = (result: SearchResult) => {
    Router.push(`${move_path}/${result.id}`);
  };

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    debouncedSearchRef.current(term);
  }, []);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && resultsRef.current) {
      event.preventDefault();
      resultsRef.current.querySelector('div')?.focus();
    }
  };

  return (
    <Container>
      <SearchInput
        type="text"
        placeholder="검색어를 입력해 주세요"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-label="검색"
        aria-autocomplete="list"
        aria-controls="search-results"
        aria-expanded={isSearchResultsVisible}
      />
      <SearchResultOverlay 
        $isVisible={isSearchResultsVisible} 
        id="search-results"
        role="listbox"
        ref={resultsRef}
      >
        {isLoading && <LoadingIndicator>검색 중...</LoadingIndicator>}
        {error && <div>{error}</div>}
        {!isLoading && !error && searchResults.map((result, index) => (
          <SearchResultItem 
            key={result.id} 
            onClick={() => handleResultClick(result)}
            role="option"
            tabIndex={0}
            aria-selected={index === 0}
          >
            <SearchResultThumbnail src={result.thumb_path ? result.thumb_path : '/icons/no_photography.png'} alt="" />
            <SearchResultLabel>{result.label}</SearchResultLabel>
          </SearchResultItem>
        ))}
      </SearchResultOverlay>
    </Container>
  );
};

export default SearchComponent;