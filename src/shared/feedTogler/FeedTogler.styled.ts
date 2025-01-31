import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  font-size: 24px;
  font-weight: bold;
  color: #95979a;
  text-decoration: none;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
  }

  &.active {
    color: #36c009;
    text-decoration: underline;
    text-underline-offset: 10px;
    text-decoration-thickness: 4px;
  }
`;
