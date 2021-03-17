import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  children?: React.ReactNode;
  width?:string;
  height?: string;
}

const Container = styled.div<Pick<Props, 'height'|'width'>>`
  display: inline-block;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-top-color: #ddd;
  border-top-width: 0.5px;
  border-top-style: solid;
  margin: 0px 20px;
  border-bottom-color: #ddd;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-radius: 5px;
  width: ${props => props.width ?? '500px'};
  height: ${props => props.height ?? 'auto'};
  margin-bottom: 10px;
`;

const Title = styled.div`
  padding: 20px;
  font-weight: 600;
`;

const ChildrenContainer = styled.div`
  padding: 0 20px 20px;
`;

function Card(props: Props) {
  const { title = '', width, height } = props;

  return (
    <Container width={width} height={height}>
        <Title>{title}</Title>
        <ChildrenContainer>{props.children}</ChildrenContainer>
    </Container>
  );
}

export default Card;
