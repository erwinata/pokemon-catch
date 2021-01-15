import styled from "@emotion/styled";
import { AppContext } from "context/context";
import { useActions } from "context/useActions";
import React, { useContext, useState } from "react";
import { IPokemon } from "types/IPokemon";
import Button from "./Button";

interface Props {
  pokemon: IPokemon;
  onDone: () => any;
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  gap: 0.75rem;
  color: white;
`;

interface InputProps {
  error: boolean;
}
const Input = styled.input<InputProps>`
  background: rgba(255, 255, 255, 0.8);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  ${(props) => props.error && `background:  #f8a5a5`};
  ${(props) => props.error && `border:  #ee5151 3px solid`}
`;

const TextError = styled.div`
  font-size: 0.8rem;
  text-align: center;
  padding: 0.25rem 1rem;
  border-radius: 4px;
  background: #ee5151;
  color: white;
`;

const NamingForm: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const { addToMyPokemon } = useActions(state, dispatch);

  const [inputName, setInputName] = useState("");
  const [inputError, setInputError] = useState("");

  const handle = {
    submitForm: (e: any) => {
      e.preventDefault();

      if (inputName.length === 0) {
        setInputError("Nickname cannot be empty");
        return;
      }

      const successAddPokemon = addToMyPokemon({ ...props.pokemon, nickname: inputName });
      if (successAddPokemon) {
        props.onDone();
      } else {
        setInputError("Nickname already used");
      }
    },
    inputChange: (e: any) => {
      setInputError("");
      setInputName(e.target.value);
    },
  };

  return (
    <Form onSubmit={handle.submitForm}>
      <h1>Give Nickname</h1>
      <Input error={inputError !== ""} autoFocus value={inputName} onChange={handle.inputChange} />
      {inputError && <TextError>{inputError}</TextError>}
      <Button color="primary">OK</Button>
    </Form>
  );
};

export default NamingForm;
