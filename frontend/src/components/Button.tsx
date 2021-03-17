import React from 'react';
import styled from 'styled-components';

interface Props {
  label:string;
  [otherProps: string]: unknown;
}

const Button = styled.button`
  border: none;
  background-color: #74b9ff;
  height: 20px;
  border-radius: 3px;
  color: black;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    opacity: 0.6;
  }
  min-width: 60px;
`;


function TextField(props: Props) {
  const { label, ...others} = props;

  return (
    <Button {...others}>{label}</Button>
  );
}

export default TextField;
