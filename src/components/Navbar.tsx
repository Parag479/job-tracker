import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaBriefcase, FaChartLine, FaUser } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const NavContainer = styled.nav`
  background: linear-gradient(135deg, rgba(147, 51, 234, 0.95) 0%, rgba(79, 70, 229, 0.95) 100%);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)<{ active: boolean }>`
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.8)'};
  text-decoration: none;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
  font-size: 1.1rem;
  letter-spacing: 0.5px;

  &:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }

  ${props => props.active && `
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  `}

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 3px;
    background: #ffffff;
    transition: width 0.3s ease;
    border-radius: 2px;
  }

  &:hover::after {
    width: 50%;
  }

  ${props => props.active && `
    &::after {
      width: 50%;
    }
  `}
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const UserAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--gradient-purple);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const Navbar = () => {
  const location = useLocation();

  return (
    <IconContext.Provider value={{ size: '22px', style: { verticalAlign: 'middle' } }}>
      <NavContainer>
        <NavContent>
          <Logo>JobTracker</Logo>
          <NavLinks>
            <NavLink to="/" active={location.pathname === '/'}>
              {FaHome({})}
              Dashboard
            </NavLink>
            <NavLink to="/jobs" active={location.pathname === '/jobs'}>
              {FaBriefcase({})}
              Jobs
            </NavLink>
            <NavLink to="/analytics" active={location.pathname === '/analytics'}>
              {FaChartLine({})}
              Analytics
            </NavLink>
          </NavLinks>
          <UserSection>
            <UserAvatar>
              {FaUser({})}
            </UserAvatar>
          </UserSection>
        </NavContent>
      </NavContainer>
    </IconContext.Provider>
  );
};

export default Navbar; 