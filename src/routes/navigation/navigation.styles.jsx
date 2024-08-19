import styled from 'styled-components';

// Updated colors to match the new SCSS theme
const primaryColor = '#6b4226'; // Warm brown color
const secondaryColor = '#ffffff'; // White color
const backgroundColor = '#faf3e0'; // Light cream background color
const inputBackground = '#fffaf0'; // Soft cream input background color
const inputBorder = '#c0a080'; // Light brown border color
const textColor = '#4f3821'; // Dark brown text color
const buttonColor = '#d97a4a'; // Burnt orange button color
const buttonHover = '#c96b3e'; // Darker burnt orange for hover effect

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${primaryColor};
  color: ${secondaryColor};
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;

  a {
    color: ${secondaryColor};
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      color: ${buttonColor};
    }
  }
`;

export const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: ${secondaryColor};
`;

export const MobileNavToggle = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  color: ${secondaryColor};
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${buttonColor};
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const DesktopNav = styled.ul`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const MobileNav = styled.ul`
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background-color: ${backgroundColor};
  border-radius: 8px;

  @media (max-width: 767px) {
    display: flex;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  background-color: ${inputBackground};
  border: 1px solid ${inputBorder};
  color: ${textColor};
  padding: 0.5rem;
  border-radius: 8px;
  margin-right: 0.5rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${buttonColor};
    background-color: ${secondaryColor};
  }
`;

export const SearchButton = styled.button`
  background-color: ${buttonColor};
  border: 1px solid ${inputBorder};
  color: ${secondaryColor};
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${buttonHover};
    border-color: ${inputBorder};
  }
`;
