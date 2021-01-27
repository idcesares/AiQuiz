import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.mainBg};
  border-radius: 4px;
  overflow: hidden;

  h1, h2, h3 {
    font-size: 24px;
    font-weight: 700;
    line-height: 1.3;
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  background-color: ${({ theme }) => theme.colors.primary};
  
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Input = styled.input`
  padding: 10px;
  font-size: 16px;
  display:block;
  width: 100%;
  border-radius: 10px;
`;

Widget.Button = styled.button`
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
  }

  &:disabled {
    background-color: gray;
    opacity: 0.7;
  }
`;
export default Widget;
