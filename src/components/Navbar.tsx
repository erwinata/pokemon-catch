import styled from "@emotion/styled";
import { AppContext } from "context/context";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import mq from "utils/mediaqueries";

interface Props {}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarItem = styled.div`
  padding: 1.5rem 0.25rem 1rem;
  height: 70px;
  border-radius: 8px 8px 0 0;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: default;

  &.active {
    background: rgba(255, 255, 255, 0.2);
  }

  & h1 {
    transform: scale(1, 1);
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

  &:not(.active) h1:hover {
    color: rgba(0, 0, 0, 0.5);
  }

  &.active h1 {
    font-size: 1rem;
    ${mq.xs} {
      font-size: 1.3rem;
    }
    ${mq.sm} {
      font-size: 1.8rem;
    }
    color: white;
  }

  &.active div {
    background: rgb(243, 52, 77);
  }
  & div {
    background: rgba(0, 0, 0, 0.25);
    border-radius: 9999px;
    padding: 0.25rem 0.75rem;
    font-weight: 600;
    color: white;
    font-size: 0.8rem;
    ${mq.xs} {
      font-size: 1rem;
    }
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

  const { state, dispatch } = useContext(AppContext);

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
        {state.myPokemon.length > 0 && <div>{state.myPokemon.length}</div>}
      </NavbarItem>
    </Container>
  );
};

export default Navbar;
