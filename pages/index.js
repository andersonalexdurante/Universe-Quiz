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
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=4528&q=80"
        />
      </Head>

      <Container>
        <QuizContainer>
          <QuizLogo />
          <Widget>
            <Widget.Header>
              <h1>Universo Quiz</h1>
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
                <Button type="submit" disabled={nameState.length === 0}>
                  Jogar
                </Button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              <h1>Outros Quizes Topzera</h1>
              <a href="https://alura-pokemon-quiz.daniloamsilva.vercel.app/">
                https://alura-pokemon-quiz.daniloamsilva.vercel.app/
              </a>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <AstrounautAnimation />
      </Container>

      <GithubCorner projectUrl="https://github.com/andersonalexdurante/Universe-Quiz" />
    </>
  );
}
