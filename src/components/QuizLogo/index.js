import styled from 'styled-components';
import React from 'react';

const Logo = styled.img`
  margin: 0 auto;
  width: 100%;
`

export default function QuizLogo({ className, defaultLogo }) {
  return (
    <Logo className={className} src={defaultLogo} alt="Logo AI Quiz" />
  );
};