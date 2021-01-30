import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-family: 'Lato', sans-serif;
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body {
    min-height: 100vh;
  }
  #__next {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" key="title" />
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
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
