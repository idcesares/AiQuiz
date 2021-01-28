import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';

const InputBase = styled.input`
  padding: 10px;
  font-size: 16px;
  display:block;
  width: 100%;
  border-radius: 10px;
`

export default function Input({ onChange, placeholder, ...props }) {
    return (
      <div>
          <InputBase 
            onChange={onChange}
            placeholder={placeholder}
            {...props}
          />
      </div>
    )
}

Input.defaultProps = {
    value: '',
};

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};