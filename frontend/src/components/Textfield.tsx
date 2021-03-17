import React, { FormEvent, KeyboardEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  value:string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder: string;
}

const Container = styled.div`
  position: relative;
  display: inline-flex;
  align-items: flex-end;
  width: 100%;
  flex-direction: column;
`;

const Field = styled.input`
  height: 16px;;
  width: 98%;
`;

const InputContainer = styled.div`
  height: 36px;
  align-items: center;
  width: 100%;
`;


function TextField(props: Props) {
  const { value: initialValue = '', placeholder='', onChange, onSubmit } = props;
  const [value, setValue] = useState(initialValue);

  useEffect( () => {
    setValue(initialValue);
  }, [initialValue]);

  function onValueChange(e: FormEvent<HTMLInputElement>): void {
    const { value: newValue } = e.currentTarget;
    setValue(newValue);
    if (typeof onChange === 'function') onChange(newValue);
  }

  function onClick(): void {
    if (typeof onSubmit !== 'function') return;
    onSubmit(value);
  }

  function onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      onClick();
    }
  }

  function renderField(): ReturnType<typeof Field> {
    return (
      <Field
        onChange={onValueChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        value={value}
      />
    )
  }

  return (
    <Container>
        <InputContainer>
          {renderField()}
        </InputContainer>
    </Container>
  );
}

export default TextField;
