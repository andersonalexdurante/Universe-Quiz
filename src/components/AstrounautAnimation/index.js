import Lottie from "react-lottie";
import animationDataAstronaut from "../../assets/astronaut.json";
import styled from "styled-components";
import { motion } from "framer-motion";

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
    <Container
      as={motion.section}
      variants={{
        show: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 30 },
      }}
      initial="hidden"
      animate="show"
      transition={{ duration: 1, delay: 0.5 }}
    >
      <Lottie
        isClickToPauseDisabled={true}
        options={AnimationOptions(animationDataAstronaut)}
        height={500}
        width={500}
      />
    </Container>
  );
}
