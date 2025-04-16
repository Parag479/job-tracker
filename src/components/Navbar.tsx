import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBriefcase } from 'react-icons/fa';

const Nav = styled.nav`
  background-color: var(--bg-secondary);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid var(--border-color);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    font-size: 1.25rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  color: ${props => props.$isActive ? 'var(--primary-color)' : 'var(--text-primary)'};
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
  padding: 0.5rem 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-color);
    transform: scaleX(${props => props.$isActive ? 1 : 0});
    transition: transform 0.2s;
  }

  &:hover {
    color: var(--primary-color);

    &::after {
      transform: scaleX(1);
    }
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const Navbar = () => {
  const location = useLocation();

  return (
    <Nav>
      <NavContent>
        <Logo to="/">
          <IconWrapper>
            {FaBriefcase({})}
          </IconWrapper>
          <span>JobTracker</span>
        </Logo>
        <NavLinks>
          <NavLink to="/" $isActive={location.pathname === '/'}>
            Dashboard
          </NavLink>
          <NavLink to="/jobs" $isActive={location.pathname === '/jobs'}>
            Jobs
          </NavLink>
          <NavLink to="/add-job" $isActive={location.pathname === '/add-job'}>
            Add Job
          </NavLink>
        </NavLinks>
      </NavContent>
    </Nav>
  );
};

export default Navbar; 