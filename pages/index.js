import React from 'react';
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
import Link from '../src/components/Link';
import { motion } from 'framer-motion'

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState('');

  return (
    <QuizBackground 
      backgroundImage={db.bg}
      as={motion.section}
      transition={{ duration: 0.3 }}
      variants={{
        show: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      animate="show"
    >
      <QuizContainer>
        <QuizLogo 
          defaultLogo={db.defaultLogo}
          as={motion.section}
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
        />
        
        <Widget
          as={motion.section}
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.3
          }}
        >
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
              <Button 
                type="submit" 
                disabled={name.length === 0}
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {`Jogar como: ${name}`}
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          initial={{ scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.6
          }}
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>
            <ul>
            {db.external.map((linkExterno) => {
              let [projectName, githubUser] = new URL(linkExterno).host.split(".")
              return (
                <li key={linkExterno}>
                  <Widget.Topic
                  as={Link}
                  href={`/quiz/${projectName}___${githubUser}`}
                  >
                    {`${githubUser}/${projectName}`}
                  </Widget.Topic>
                </li>
              );
            })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
        as={motion.footer}
        initial={{ scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.9
        }} 
        />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/idcesares" />
    </QuizBackground>
  );
}
