import React from 'react';
import styled from 'styled-components';

interface Props {
  src: string;
  height?: string;
  width?: string;
  onWatched?: () => void;
}

const Video = styled.video<Pick<Props, 'height' | 'width'>>`
  width: ${props => props.width ?? '500px'};
  height: ${props => props.height ?? 'auto'};
`;

function Card(props: Props) {
  const { src, width='', height='', onWatched } = props;

  function onEnded() {
    if(typeof onWatched !== 'function') return;
    onWatched();
  }

  return (
    <Video src={src} controls width={width} height={height} onEnded={onEnded}/>
  );
}

export default Card;
