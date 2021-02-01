import styled from "styled-components";

const LinkQuiz = styled.div`
  display: block;
  color: ${({ theme }) => theme.colors.mainBg};
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: 15px;
  font-weight: 600;
  padding: 7px 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  text-decoration: none;
  transition: 0.25s;
  &:hover,
  &:focus {
    background-color: ${({ theme }) => `${theme.colors.secondary}90`};
  }
`;

export default LinkQuiz;
