import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';

import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import QuizContainer from '../src/components/QuizContainer';

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <Head>
        <link rel="icon" type="image/png" href="../static/favicon.png" key="title" />
        <title>AiQuiz - Um Quiz sobre Inteligência Artificial</title>
        <meta name="title" content="AiQuiz - Um Quiz sobre Inteligência Artificial" />
        <meta name="description" content="Teste os seus conhecimentos sobre a história da Inteligência Artificial 🤖"></meta>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://ai-quiz.idcesares.vercel.app/"/>
        <meta property="og:title" content="AiQuiz - Um Quiz sobre Inteligência Artificial"/>
        <meta property="og:description" content="Teste os seus conhecimentos sobre a história da Inteligência Artificial 🤖"/>
        <meta property="og:image" content={db.bg}/>
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://ai-quiz.idcesares.vercel.app/"/>
        <meta property="twitter:title" content="AiQuiz - Um Quiz sobre Inteligência Artificial"/>
        <meta property="twitter:description" content="Teste os seus conhecimentos sobre a história da Inteligência Artificial 🤖"/>
        <meta property="twitter:image" content={db.bg}></meta>
      </Head>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              router.push(`/quiz?name=${name}`);
              console.log('Fazendo uma submissão por meio do react');
            }}
            >
              <Input 
                name='nomeDoUsuario'
                onChange={(infosDoEvento) => setName(infosDoEvento.target.value)}
                placeholder="Digite seu nome"
                value={name}
                />
              <Button type="submit" disabled={name.length === 0}>
                {`Jogar como ${name}`}
              </Button>
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
      <GitHubCorner projectUrl="https://github.com/idcesares" />
    </QuizBackground>
  );
}
