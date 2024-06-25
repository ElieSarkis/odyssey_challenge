import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledContainer = styled('div')({
  width: '100%',
  margin: '0',
  padding: '0',
  display: 'flex',
  paddingTop: '50px',
});

const StyledNavbar = styled('nav')({
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'start',
  fontWeight: 'bold',
  backgroundColor: 'black',
  padding: '10px 0',
  zIndex: 1000,
});

const StyledNavLink = styled(NavLink)({
  color: 'white',
  textDecoration: 'none',
  padding: '10px 20px',
  margin: '0 10px',
  '&.active': {
    color: '#6deb6d',
  },
});

const Navbar = () => {
  return (
    <StyledContainer>
      <StyledNavbar>
        <StyledNavLink
          to="welcome"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Welcome
        </StyledNavLink>
        <StyledNavLink
          to="products"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Products
        </StyledNavLink>
      </StyledNavbar>
      <Outlet />
    </StyledContainer>
  );
};

export default Navbar;
