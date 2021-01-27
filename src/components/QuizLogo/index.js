import styled from 'styled-components';
import React from 'react';

const Logo = ({ className }) => {
  return (
    <img className={className} src="../static/logo.svg" alt="Logo AI Quiz" />
  );
}

const QuizLogo = styled(Logo)`
  margin: 0 auto;
  width: 100%;
`

export default QuizLogo;
