import styled from "styled-components";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Lottie from "react-lottie";
import db from "../db.json";
import Widget from "../src/components/Widget";
import Footer from "../src/components/Footer";
import GithubCorner from "../src/components/GithubCorner";
import QuizBackground from "../src/components/QuizBackground";
import QuizLogo from "../src/components/QuizLogo";
import animationData from "../src/assets/astronaut.json";

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const [nameState, setNameState] = useState("");
  const router = useRouter();

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <title>Universo Quiz</title>
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
                <input
                  placeholder="Diz aí seu nome pra jogar :)"
                  onChange={function (event) {
                    event.preventDefault();
                    setNameState(event.target.value);
                  }}
                />
                <button type="submit" disabled={nameState.length === 0}>
                  Jogar
                </button>
              </form>
            </Widget.Content>
          </Widget>

          <Widget>
            <Widget.Content>
              <h1>Quizes da Galera</h1>
              <p>lorem ipsum dolor sit amet...</p>
            </Widget.Content>
          </Widget>
          <Footer />
        </QuizContainer>
        <Lottie
          isClickToPauseDisabled={true}
          options={defaultOptions}
          height={500}
          width={500}
        />
      </Container>

      <GithubCorner projectUrl="https://github.com/andersonalexdurante/Universe-Quiz" />
    </QuizBackground>
  );
}
