import React from 'react';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';
import AlternativeForm from '../src/components/AlternativeForm';

function ResultWidget({ results }) {
  const totalQuestionsCorrect = results.filter((x) => x).length;
  const percentageCorrect = (100 * totalQuestionsCorrect)/results.length;
  return (
    <Widget>
      <Widget.Header>
        <h3>Resultado:</h3>
      </Widget.Header>
      { (percentageCorrect >= 80) 
        && <img alt="Resultados" 
          style={{ width: '100%', height: '200px', objectFit: 'cover', }} 
          src={db.quizImageResult.amazing}
          loading="lazy" />}
      { (percentageCorrect >= 50 && percentageCorrect < 80) 
        && <img alt="Resultados" 
          style={{ width: '100%', height: '200px', objectFit: 'cover', }} 
          src={db.quizImageResult.moreOrLess}
          loading="lazy" />}
      { (percentageCorrect < 50) 
        && <img alt="Resultados" 
          style={{ width: '100%', height: '200px', objectFit: 'cover', }} 
          src={db.quizImageResult.bad}
          loading="lazy" />}
      <Widget.Content>
        <p>
          Você acertou
          {' '}
          {totalQuestionsCorrect}
          {' '}
          perguntas
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${index}`}>
              Pergunta
              {' '}
              {index + 1}
              {': '}
              {result === true
                ? 'Acertou'
                : 'Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}


function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        <h3>Carregando...</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={db.loading}
      />
    </Widget>
  );
}

function QuestionWidget({ 
  question, 
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult
 }) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
  const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;
  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>
          {question.title}
        </h2>
        <p>
          {question.description}
        </p>

        <AlternativeForm 
        onSubmit={(infosDoEvento) => {
          infosDoEvento.preventDefault();
          setIsQuestionSubmitted(true);
          setTimeout(() => {
            addResult(isCorrect);
            onSubmit();
            setIsQuestionSubmitted(false);
            setSelectedAlternative(undefined);
          }, 1000)
        }}
        >
         {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmitted && alternativeStatus}
              >
                <input
                  style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
        </AlternativeForm>
      </Widget.Content>
    </Widget>
  )
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
};

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([])
  const totalQuestions = db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result
    ])
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000)
  }, []);
  
  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }
  
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget 
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmitQuiz}
          addResult={addResult}
          />
        )}
        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
      </QuizContainer>
    </QuizBackground>
  );
}