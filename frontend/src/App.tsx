import React from "react";
import styled from 'styled-components';
import RootView from './views/RootView';

const Container = styled.div`
  display: block;
`;

export default function App() {
  return (
    <Container>
      <RootView/>
    </Container>
  );
}
