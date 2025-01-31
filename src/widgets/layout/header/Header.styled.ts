import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledHeaderContainer = styled.div`
  display: flex;
  max-width: 1320px;
  margin: 50px auto;
  padding: 0 0px;
`;

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  color: inherit;
`;

export const StyledLogo = styled.div`
  width: 50px;
  height: 50px;
  margin-left: 50px;
  color: #008000;
  font-size: 24px;
  text-decoration: none;
`;

export const StyledNavMenu = styled.nav`
  margin-left: auto;
  font-size: 24px;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  li {
    margin-right: 15px;
    display: flex;
    align-items: center;
  }

  a {
    color: #696969;
    text-decoration: none;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
  }

  a:hover {
    color: #c3bebe;
  }

  .active {
    color: #c3bebe;
  }
`;

export const StyledLogoutButton = styled.button`
  background: none;
  border: none;
  color: #696969;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;

  &:hover {
    color: #c3bebe;
  }
`;
