import Lottie from "react-lottie";
import animationDataAstronaut from "../../assets/astronaut.json";
import styled from "styled-components";

const Container = styled.div`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

function AnimationOptions(animation) {
  return {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
}

export default function AstrounautAnimation() {
  return (
    <Container>
      <Lottie
        isClickToPauseDisabled={true}
        options={AnimationOptions(animationDataAstronaut)}
        height={500}
        width={500}
      />
    </Container>
  );
}
