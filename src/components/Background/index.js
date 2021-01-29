import styled from "styled-components";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  position: absolute;

  flex: 1;
  @media screen and (max-width: 500px) {
    &:after {
      content: "";

      display: block;
      width: 100%;

      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
  }
`;

export default Background;
