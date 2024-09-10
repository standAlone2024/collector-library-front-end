import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const ContentInput = styled.input.attrs<{ $isFocused: boolean }>(() => ({}))`
  flex: 2;
  padding: 5px;
  border: 1px solid ${props => props.$isFocused ? '#007bff' : '#ccc'};
  border-radius: 4px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

interface ContentProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: (inputRef: HTMLInputElement) => void;
}

export const BasicInput: React.FC<ContentProps> = ({ value, onChange, onFocus }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (inputRef.current) {
      onFocus(inputRef.current);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <ContentInput
      ref={inputRef}
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      $isFocused={isFocused}
    />
  );
};

export default BasicInput;