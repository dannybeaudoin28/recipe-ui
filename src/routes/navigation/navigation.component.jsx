import React, { useState } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import {
  Nav,
  NavItem,
  Logo,
  MobileNavToggle,
  DesktopNav,
  MobileNav,
  SearchContainer,
  SearchInput,
  SearchButton,
} from './navigation.styles'

const Navigation = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [token, setToken] = useState(Cookies.get('token'));

  const logout = () => {
    Cookies.remove('token');
    localStorage.setItem('isAuthenticated', false);
    setToken(Cookies.get('token') || '');
  };

  return (
    <div>
      <Nav>
        <a href='/'><Logo>Recipe Saver</Logo></a>
        <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
          {isMobileNavOpen ? 'Close' : 'Menu'}
        </MobileNavToggle>
        <DesktopNav>
          {token === undefined && (
            <>
              <NavItem><a href="/">Home</a></NavItem>
              <NavItem><a href='/sign-up'>Sign Up</a> </NavItem>
            </>
          )}
          {token !== undefined && (
            <>
              <NavItem><a href='/recipes-post'>Post Recipe</a></NavItem>
              <NavItem><a href='/recipes-view'>View Recipes</a></NavItem>
              <NavItem><a href='/' onClick={logout}>Logout</a></NavItem>
            </>
          )}
        </DesktopNav>
        <MobileNav style={{ display: isMobileNavOpen ? 'flex' : 'none' }}>
          {token === undefined && (
            <>
              <NavItem><a href="/">Home</a></NavItem>
              <NavItem><a href='/sign-up'>Sign Up</a> </NavItem>
            </>
          )}
          {token !== undefined && (
            <>
              <NavItem><a href='/recipes-post'>Post Recipe</a></NavItem>
              <NavItem><a href='/recipes-view'>View Recipes</a></NavItem>
              <NavItem><a href='/' onClick={logout}>Logout</a></NavItem>
            </>
          )}
        </MobileNav>
      </Nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export default Navigation;