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
import animationDataResult from "../src/assets/result.json";
import { useState, useEffect } from "react";
import Background from "../src/components/Background";
import AstrounautAnimation from "../src/components/AstrounautAnimation";
import { useRouter } from "next/router";

export default function QuizPage() {
  const router = useRouter();
  const screenStates = {
    QUIZ: "QUIZ",
    LOADING: "LOADING",
    SUBMIT: "SUBMIT",
    RESULT: "RESULT",
  };
  const { name } = router.query;

  const totalQuestions = db.questions.length;
  const [questionIndexState, setQuestionIndexState] = useState(0);
  const [currentQuestionState, setCurrentQuestState] = useState({});
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [resultsState, setResultsState] = useState(0);

  const questionId = `question__${questionIndexState}`;
  const [selectedAlternativeState, setSelectedAlternativeState] = useState(
    undefined
  );
  const hasAlternativeSelected = selectedAlternativeState !== undefined;
  const [isFormSubmitedState, setIsFormSubmitedState] = useState(false);
  const isCorrect = selectedAlternativeState === currentQuestionState.answer;
  const [questionsResultState, setQuestionsResultState] = useState([]);

  useEffect(() => {
    if (screenState !== screenStates.RESULT) {
      setTimeout(() => {
        setScreenState(screenStates.QUIZ);
      }, 3 * 1000);
    }
  }, [isFormSubmitedState]);

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

    setQuestionsResultState([...questionsResultState, isCorrect]);
    if (isCorrect) {
      setResultsState(resultsState + 1);
    }

    if (nextQuestion < totalQuestions) {
      setScreenState(screenStates.SUBMIT);
      setTimeout(() => {
        setQuestionIndexState(nextQuestion);
        setIsFormSubmitedState(false);
        setSelectedAlternativeState(undefined);
      }, 3 * 1000);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  console.log(screenState);

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
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.back();
            }}
          >
            <QuizLogo />
          </a>

          {screenState === screenStates.LOADING && (
            <Widget>
              <Lottie
                isClickToPauseDisabled={true}
                options={AnimationOptions(animationDataLoading)}
                height={300}
                width={300}
              />
            </Widget>
          )}
          {screenState === screenStates.QUIZ && (
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
                    setIsFormSubmitedState(true);
                    handleSubmitQuiz();
                  }}
                >
                  {currentQuestionState.alternatives.map(
                    (alternative, alternativeIndex) => {
                      const alternativeId = `alternative__${alternativeIndex}`;
                      const isSelected =
                        selectedAlternativeState === alternativeIndex;

                      return (
                        <Widget.Topic
                          as="label"
                          key={alternativeId}
                          htmlFor={alternativeId}
                          data-selected={isSelected}
                        >
                          <input
                            id={alternativeId}
                            name={questionId}
                            onClick={() =>
                              setSelectedAlternativeState(alternativeIndex)
                            }
                            type="radio"
                            disabled={isFormSubmitedState}
                          />
                          {alternative}
                        </Widget.Topic>
                      );
                    }
                  )}
                  <Button type="submit" disabled={!hasAlternativeSelected}>
                    Confirmar
                  </Button>
                </form>
              </Widget.Content>
            </Widget>
          )}
          {screenState === screenStates.SUBMIT && (
            <Widget>
              {isFormSubmitedState && isCorrect && (
                <Widget.Header>
                  <h3 style={{ fontSize: "50px" }}>
                    Você <span style={{ color: "#76ff03" }}>Acertou!</span>
                  </h3>
                </Widget.Header>
              )}
              {isFormSubmitedState && !isCorrect && (
                <Widget.Header>
                  <h3 style={{ fontSize: "50px" }}>
                    Você <span style={{ color: "#ff1744" }}>Errou!</span>
                  </h3>
                </Widget.Header>
              )}
            </Widget>
          )}
          {screenState === screenStates.RESULT && (
            <Widget>
              <Widget.Header>
                <h3>Parabéns, {name}!</h3>
              </Widget.Header>
              <Widget.Content>
                <h3>
                  Você acertou {resultsState} das {totalQuestions} questões!
                </h3>

                <ul>
                  {questionsResultState.map((result, index) => {
                    return (
                      <Widget.Topic key={index}>
                        {result ? (
                          <li style={{ color: "#76ff03" }}>
                            Questão {index + 1}: Acertou
                          </li>
                        ) : (
                          <li style={{ color: "#ff1744" }}>
                            {" "}
                            Questão {index + 1}: Errou
                          </li>
                        )}
                      </Widget.Topic>
                    );
                  })}
                </ul>
                <Lottie
                  isClickToPauseDisabled={true}
                  options={AnimationOptions(animationDataResult)}
                  width={200}
                  height={200}
                />

                <Button
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Retornar ao Menu
                </Button>
              </Widget.Content>
            </Widget>
          )}
        </QuizContainer>
        <AstrounautAnimation />
      </Container>
      <GithubCorner projectUrl="https://github.com/andersonalexdurante/Universe-Quiz" />
    </>
  );
}
