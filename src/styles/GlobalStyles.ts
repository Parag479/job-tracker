import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    /* Light theme with new purple and mint colors */
    --primary-purple: #9B6ED6;
    --primary-purple-dark: #5E3A94;
    --primary-blue: #4B5FBD;
    --primary-mint: #4DCBA6;
    
    --bg-primary: #F5F5F5;
    --bg-secondary: #FFFFFF;
    --text-primary: #333333;
    --text-secondary: #666666;
    --border-color: #EEEEEE;
    
    /* Gradient backgrounds */
    --gradient-purple: linear-gradient(135deg, #9B6ED6 0%, #5E3A94 100%);
    --gradient-blue: linear-gradient(135deg, #4B5FBD 0%, #3A4A9F 100%);
    --gradient-mint: linear-gradient(135deg, #4DCBA6 0%, #3AA88A 100%);
    
    /* Status colors */
    --status-applied: var(--primary-purple);
    --status-interview: var(--primary-mint);
    --status-offer: var(--primary-blue);
    --status-rejected: #FF6B6B;
  }

  [data-theme='dark'] {
    --primary-purple: #B088E7;
    --primary-purple-dark: #7952B3;
    --primary-blue: #6272CD;
    --primary-mint: #5EDBB7;
    
    --bg-primary: #1A1A1A;
    --bg-secondary: #2D2D2D;
    --text-primary: #FFFFFF;
    --text-secondary: #B3B3B3;
    --border-color: #404040;
    
    /* Dark theme gradients */
    --gradient-purple: linear-gradient(135deg, #B088E7 0%, #7952B3 100%);
    --gradient-blue: linear-gradient(135deg, #6272CD 0%, #4B5FBD 100%);
    --gradient-mint: linear-gradient(135deg, #5EDBB7 0%, #4DCBA6 100%);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color 0.3s, color 0.3s;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  p {
    line-height: 1.6;
    margin-bottom: 1rem;
    color: var(--text-secondary);
  }

  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: var(--primary-hover);
    }
  }

  button {
    cursor: pointer;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-primary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary-hover);
  }

  /* Status colors */
  .status-applied {
    background-color: var(--info-color);
  }

  .status-interview {
    background-color: var(--warning-color);
  }

  .status-offer {
    background-color: var(--success-color);
  }

  .status-rejected {
    background-color: var(--error-color);
  }

  svg {
    font-size: 1.25rem;
  }
`;

export default GlobalStyles; 