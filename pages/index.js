import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Lottie from "react-lottie";
import Widget from "../src/components/Widget";
import Footer from "../src/components/Footer";
import GithubCorner from "../src/components/GithubCorner";
import QuizLogo from "../src/components/QuizLogo";
import Container from "../src/components/Container";
import QuizContainer from "../src/components/QuizContainer";
import Input from "../src/components/Input";
import Button from "../src/components/Button";
import Background from "../src/components/Background";
import AstrounautAnimation from "../src/components/AstrounautAnimation";
import animationDataBackground from "../src/assets/background.json";
import db from "../db.json";
import { motion } from "framer-motion";

export default function Home() {
  const [nameState, setNameState] = useState("");
  const router = useRouter();

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

  return (
    <>
      <Background>
        <Lottie
          isClickToPauseDisabled={true}
          options={AnimationOptions(animationDataBackground)}
          width={"100%"}
          height={"100%"}
        />
      </Background>
      <Head>
        <title>Home - Universo Quiz</title>
        <meta property="og:image" content="https://i.imgur.com/m8w4KbO.png" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
      </Head>
      <Container>
        <QuizContainer>
          <QuizLogo />

          <Widget
            as={motion.section}
            variants={{
              show: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Widget.Header>
              <h1>#Universo-Quiz</h1>
            </Widget.Header>
            <Widget.Content>
              <p>
                Teste seus conhecimentos de <strong>Astronomia!</strong>
              </p>
              <form
                onSubmit={function (event) {
                  event.preventDefault();
                  router.push(`/quiz?name=${nameState}`);
                }}
              >
                <Input
                  placeholder="Diz aí seu nome pra jogar :)"
                  onChange={function (event) {
                    event.preventDefault();
                    setNameState(event.target.value);
                  }}
                />
                <Button
                  type="submit"
                  disabled={nameState.length === 0}
                  as={motion.button}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Jogar
                </Button>
              </form>
            </Widget.Content>
          </Widget>
          <Widget
            as={motion.section}
            variants={{
              show: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Widget.Content>
              <h1 style={{ marginBottom: 20 }}>Outros Quizes Topzera</h1>
              <ul>
                {db.external.map((quiz) => {
                  const [projectName, githubUser] = quiz
                    .replace(/\//g, "")
                    .replace("https:", "")
                    .replace(".vercel.app", "")
                    .split(".");
                  return (
                    <li key={githubUser}>
                      <Widget.Topic>
                        {projectName}/{githubUser}
                      </Widget.Topic>
                    </li>
                  );
                })}
              </ul>
            </Widget.Content>
          </Widget>
          <Footer
            as={motion.section}
            variants={{
              show: { opacity: 1 },
              hidden: { opacity: 0 },
            }}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.5, delay: 1 }}
          />
        </QuizContainer>
        <AstrounautAnimation />
      </Container>
      <GithubCorner projectUrl="https://github.com/andersonalexdurante/Universe-Quiz" />
    </>
  );
}
