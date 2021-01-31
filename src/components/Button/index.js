import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  display:block;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  margin-top: 10px;
  border-radius: 10px;
  transition: ease-in-out 0.1s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    cursor: pointer;
  }

  &:disabled {
    background-color: gray;
    opacity: 0.7;
    cursor: not-allowed;

  }

  &[data-status="SUCCESS"] {
    background-color: ${({ theme }) => theme.colors.success};
  }
  &[data-status="ERROR"] {
    background-color: ${({ theme }) => theme.colors.wrong};
  }
`;

Button.propTypes = {
    type: PropTypes.oneOf(['submit', 'type', 'button']).isRequired,
    children: PropTypes.node.isRequired,
  };

export default Button;