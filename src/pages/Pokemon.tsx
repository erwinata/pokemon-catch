import React from "react";
import { useParams } from "react-router-dom";

interface Props {}

interface IParams {
  name: string;
}

const Pokemon: React.FC<Props> = (props) => {
  const { name } = useParams<IParams>();

  return <div>Pokemon Page - {name}</div>;
};

export default Pokemon;
