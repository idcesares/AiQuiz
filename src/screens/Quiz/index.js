import React from 'react';
import { useRouter } from 'next/router'

import db from '../../../db.json'
import Widget from '../../components/Widget';
import QuizLogo from '../../components/QuizLogo';
import QuizBackground from '../../components/QuizBackground';
import Button from '../../components/Button';
import QuizContainer from '../../components/QuizContainer';
import AlternativeForm from '../../components/AlternativeForm';
import BackLinkArrow from '../../components/BackLinkArrow';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import correctAnimation from '../../lotties/correct-animation.json';
import wrongAnimation from '../../lotties/wrong-animation.json';
import Link from '../../components/Link';
import SocialShare from '../../components/SocialShare';

const correctOptions = {
  loop: false,
  autoplay: true,
  animationData: correctAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const wrongOptions = {
  loop: false,
  autoplay: true,
  animationData: wrongAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};


function ResultWidget({ results }) {
  const router = useRouter()
  const totalQuestionsCorrect = results.filter((x) => x).length;
  const percentageCorrect = (100 * totalQuestionsCorrect)/results.length;
  const playerName = router.query.name;
  return (
    <Widget
      defaultLogo={db.defaultLogo}
      as={motion.section}
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
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
          Olá, {playerName}! <br/>
          Você acertou
          {' '}
          {totalQuestionsCorrect}
          {' '}
          perguntas de 
          {' '}
          {results.length}
          {' '}
        </p>
        <ul>
          {results.map((result, index) => (
            <Widget.Topic.Result 
              key={`result__${index}`}
              as={motion.div}
              initial={{ scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: `0.${index}`
              }}
              data-status={result}
            >
              Pergunta
              {' '}
              {index + 1}
              {': '}
              {result === true
                ? <div>
                    <Lottie 
                      options={correctOptions}
                      height={40}
                      width={40}
                    />
                  </div>
                : <div>
                    <Lottie 
                      options={wrongOptions}
                      height={40}
                      width={40}
                    />
                  </div>}
            </Widget.Topic.Result>
          ))}
        </ul>
        <SocialShare />
        <Button type="button"> 
          <Link 
          href="/"
          style={{ 
            textDecoration: 'none', 
            color: 'white',
            width: '100%'
          }}
          >
            Tentar novamente
          </Link>
        </Button>
      </Widget.Content>
    </Widget>
  );
}


function LoadingWidget() {
  return (
    <Widget
      defaultLogo={db.defaultLogo}
      as={motion.section}
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      >
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
  const [hasAlternativeSelected, setHasAlternativeSelected] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
  return (
    <Widget
      defaultLogo={db.defaultLogo}
      as={motion.section}
      initial={{ scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{
          width: '100%',
          height: '200px',
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
            setHasAlternativeSelected(false);
          }, 2 * 1000)
        }}
        >
         {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            
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
                  onChange={() => {
                    setHasAlternativeSelected(true);
                    setSelectedAlternative(alternativeIndex);}}
                  type="radio"
                  checked={selectedAlternative === alternativeIndex}
                />
                {alternative}
              </Widget.Topic>
            );
          })}
          <Button 
            type="submit" 
            disabled={!hasAlternativeSelected}
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            data-status={isQuestionSubmitted && alternativeStatus}
          >
            {isCorrect && isQuestionSubmitted && 
              <div>
                <Lottie 
                  options={correctOptions}
                  height={40}
                  width={40}
                />
              </div>
            }
            {!isCorrect && isQuestionSubmitted && 
              <div>
                <Lottie 
                options={wrongOptions}
                  height={40}
                  width={40}
                />
              </div>
            }
            {
             !isQuestionSubmitted && "Confirmar"
            }
            
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

export default function QuizScreen({ externalQuestions, externalBg, defaultLogo }) {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [results, setResults] = React.useState([])
  const totalQuestions = externalQuestions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = externalQuestions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result
    ])
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1500)
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
    <QuizBackground backgroundImage={ externalBg }>
      <QuizContainer>
        <QuizLogo defaultLogo={defaultLogo} />
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