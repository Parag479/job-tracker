import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: 2rem;
  margin-top: 4rem;
  border-top: 1px solid var(--border-color);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Attribution = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-color);
  }

  svg {
    font-size: 1.25rem;
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Footer = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <FooterContainer>
      <FooterContent>
        <Attribution>
          Designed by Parag Dubey – For every dreamer who won't quit.
        </Attribution>
        <ThemeToggle onClick={toggleTheme}>
          <IconWrapper>
            {isDarkMode ? FaSun({}) : FaMoon({})}
          </IconWrapper>
          {isDarkMode ? ' Light Mode' : ' Dark Mode'}
        </ThemeToggle>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 