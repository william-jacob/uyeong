import React, { ChangeEvent, memo } from 'react';
import styled from '@_settings/styled';

interface Props {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  spellCheck?: string;
}

const StyledTextarea = styled.textarea`
  // border: 1px solid red;
  background-color: #eff1f3;
  border: none;
  padding-right: 20px;
  height: 85%;
  resize: none; //textarea 크기조절 막기
`;

const TextareaBox = ({ value, onChange, placeholder, spellCheck }: Props) => {
  return (
    <StyledTextarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      spellCheck={spellCheck ? 'false' : 'true'}
    />
  );
};

export default memo(TextareaBox);
