import QuizLogo from "../src/components/QuizLogo";
import QuizContainer from "../src/components/QuizContainer";
import Container from "../src/components/Container";
import Widget from "../src/components/Widget";
import Button from "../src/components/Button";
import GithubCorner from "../src/components/GithubCorner";
import db from "../db.json";
import Lottie from "react-lottie";
import animationDataLoading from "../src/assets/loading.json";
import animationDataBackground from "../src/assets/background.json";
import { useState, useEffect } from "react";
import Background from "../src/components/Background";
import AstrounautAnimation from "../src/components/AstrounautAnimation";

export default function QuizPage() {
  const totalQuestions = db.questions.length;
  const [questionIndexState, setQuestionIndexState] = useState(0);
  const [currentQuestionState, setCurrentQuestState] = useState({});
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadingState(true);
    }, 1 * 1000);
  }, []);

  useEffect(() => {
    setCurrentQuestState(db.questions[questionIndexState]);
  }, [questionIndexState]);

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

  function handleSubmitQuiz() {
    const nextQuestion = questionIndexState + 1;

    if (nextQuestion < totalQuestions) {
      setQuestionIndexState(nextQuestion);
    } else {
      //resultado
    }
  }

  const QuestionWidget = ({
    currentQuestionState,
    totalQuestions,
    questionIndexState,
    onSubmit,
  }) => {
    const questionId = `question__${questionIndexState}`;
    return (
      <Widget>
        <Widget.Header>
          <h3>
            Pergunta {questionIndexState + 1} de {totalQuestions}
          </h3>
        </Widget.Header>
        <img
          src={currentQuestionState.image}
          alt="Imagem"
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
        />
        <Widget.Content>
          <h2>{currentQuestionState.title}</h2>
          <p>{currentQuestionState.description}</p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit();
            }}
          >
            {currentQuestionState.alternatives.map(
              (alternatives, alternativeIndex) => {
                const alternativeId = `alternative__${alternativeIndex}`;
                return (
                  <Widget.Topic as="label" htmlFor={alternativeId}>
                    <input id={alternativeId} name={questionId} type="radio" />
                    {alternatives}
                  </Widget.Topic>
                );
              }
            )}
            <Button type="submit">Confirmar</Button>
          </form>
        </Widget.Content>
      </Widget>
    );
  };

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
      <Container>
        <QuizContainer>
          <QuizLogo />
          {loadingState ? (
            <QuestionWidget
              currentQuestionState={currentQuestionState}
              totalQuestions={totalQuestions}
              questionIndexState={questionIndexState}
              onSubmit={handleSubmitQuiz}
            />
          ) : (
            <Widget>
              <Lottie
                isClickToPauseDisabled={true}
                options={AnimationOptions(animationDataLoading)}
                height={300}
                width={300}
              />
            </Widget>
          )}
        </QuizContainer>
        <AstrounautAnimation />
      </Container>
      <GithubCorner projectUrl="https://github.com/andersonalexdurante/Universe-Quiz" />
    </>
  );
}
