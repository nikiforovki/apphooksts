import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from '@shared/CurentUser';
import { VscDiffAdded, VscAccount, VscGear } from 'react-icons/vsc';
import {
  StyledHeaderContainer,
  StyledLink,
  StyledLogo,
  StyledNavMenu,
  StyledLogoutButton,
} from './Header.styled';

const Header = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    return null;
  }
  const { currentUser, setCurrentUser } = context;
  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser(null);
  };

  return (
    <StyledHeaderContainer>
      <StyledLogo>
        <StyledLink to="/">Medium</StyledLink>
      </StyledLogo>
      <StyledNavMenu>
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>

          {!currentUser && (
            <>
              <li>
                <NavLink to="/signup">SignUp</NavLink>
              </li>
              <li>
                <NavLink to="/signin">SignIn</NavLink>
              </li>
            </>
          )}

          {currentUser && (
            <>
              <li>
                <VscDiffAdded />
                &nbsp;
                <NavLink to="/createArtical">New Post</NavLink>
              </li>
              <li>
                <VscGear />
                &nbsp;
                <NavLink to="/settings">Settings</NavLink>
              </li>

              <li>
                <NavLink
                  to="/userprofile"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <VscAccount />
                  &nbsp;
                  <span>{currentUser.name}</span>
                </NavLink>
              </li>
              <li>
                <StyledLogoutButton onClick={handleLogout}>
                  Logout
                </StyledLogoutButton>
              </li>
            </>
          )}
        </ul>
      </StyledNavMenu>
    </StyledHeaderContainer>
  );
};

export default Header;
