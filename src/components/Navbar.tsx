import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import mq from "utils/mediaqueries";

interface Props {}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarItem = styled.div`
  padding: 1rem 0.25rem 0.5rem;
  border-radius: 8px 8px 0 0;
  width: 50%;
  transform: scale(1, 1);
  transition: 0.1s ease;
  cursor: default;

  &.active {
    background: rgba(255, 255, 255, 0.35);
  }

  & h1 {
    text-align: center;
    font-weight: bold;
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.25);
    ${mq.xs} {
      font-size: 1.2rem;
    }
    ${mq.sm} {
      font-size: 1.5rem;
    }
  }

  &:not(.active):hover {
    transform: scale(1.1, 1.1);
  }

  &.active h1 {
    font-size: 1rem;
    ${mq.xs} {
      font-size: 1.5rem;
    }
    ${mq.sm} {
      font-size: 2rem;
    }
    background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-left: var(--padding);
    padding-right: var(--padding);
    background-image: linear-gradient(90deg, #627bc1, #5cc3ff);
  }
`;

enum Page {
  WILD_POKEMON,
  MY_POKEMON,
}

const Navbar: React.FC<Props> = (props) => {
  const history = useHistory();
  const [activePage, setActivePage] = useState<Page>(Page.WILD_POKEMON);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") setActivePage(Page.WILD_POKEMON);
    if (location.pathname === "/mypokemon") setActivePage(Page.MY_POKEMON);
  }, [location.pathname]);

  const handle = {
    goToWildPokemon: () => {
      if (activePage !== Page.WILD_POKEMON) history.push("/");
    },
    goToMyPokemon: () => {
      if (activePage !== Page.MY_POKEMON) history.push("/mypokemon");
    },
  };

  return (
    <Container>
      <NavbarItem
        className={activePage === Page.WILD_POKEMON ? "active" : ""}
        onClick={handle.goToWildPokemon}
      >
        <h1>Wild Pokemon</h1>
      </NavbarItem>
      <NavbarItem
        className={activePage === Page.MY_POKEMON ? "active" : ""}
        onClick={handle.goToMyPokemon}
      >
        <h1>My Pokemon</h1>
      </NavbarItem>
    </Container>
  );
};

export default Navbar;
