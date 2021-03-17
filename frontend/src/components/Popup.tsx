import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import detectOutsideClick from '../utils/detectOutsideClick';

interface Props {
  open: boolean;
  children?: React.ReactNode;
  title?:string;
  onClose: () => void;
 }
  
const PopupContainer = styled.div`
  border-radius: 4px;
  background-color: white;
  border-color: 1px solid dimmed(0.15);
  position: fixed;
  z-index: 99;
  padding: 50px 24px 16px;
  width: calc(100% - 16px);
  top: calc(50% + 31px);
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  max-width: 600px;
  max-height: calc(100% - 78px);
  overflow: auto;
`;

const Background = styled.div`
  background-color: #a4b0be;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 98;
  top: 0;
  left: 0;
  opacity: 0.5;
`;

const Title = styled.div`
  height: 50px;
  position: absolute;
  top: 0;
  align-items: center;
  display: flex;
`;

function Popup(props: Props) {
  const { title = '', open = false, onClose, children } = props;
  const modal = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', e => detectOutsideClick(e, modal, onClose));
    return () => {
      document.removeEventListener('mousedown', e => detectOutsideClick(e, modal, onClose));
    };
  }, [modal, onClose]);

  return open ? (
    <>
      <Background />
      <PopupContainer ref={modal} >
        {title !== '' && <Title>{title}</Title>}
        {children}
      </PopupContainer>
    </>
  ) : null;
}

export default Popup;
