import styled from "@emotion/styled";
import { AppContext } from "context/context";
import { useActions } from "context/useActions";
import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import MyPokemonButton from "./MyPokemonButton";

interface Props {}

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 70px;
  z-index: 100;
  top: 0;
  background: #25252c;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const ContentContainer = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const Logo = styled.img`
  height: 50px;
`;

const Navbar: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const { showMyPokemon } = useActions(state, dispatch);

  const location = useLocation();
  const history = useHistory();

  const handle = {
    clickLogo: () => {
      if (location.pathname !== "/") {
        history.push("/");
      }
      showMyPokemon(false);
    },
  };

  return (
    <Container>
      <ContentContainer>
        <Logo src="/pokemon-logo.png" onClick={handle.clickLogo} />
        <MyPokemonButton />
      </ContentContainer>
    </Container>
  );
};

export default Navbar;
