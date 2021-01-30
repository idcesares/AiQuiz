import React from 'react';
import QuizScreen from '../../src/screens/Quiz';
import { ThemeProvider } from 'styled-components'
import db from '../../db.json'

export default function QuizDaGaleraPage({ dbExterno }) {
    return (
        <ThemeProvider theme={dbExterno.theme}>
            <QuizScreen 
                externalQuestions={dbExterno.questions}
                externalBg={dbExterno.bg}
                defaultLogo={db.aluraLogo}
            />
        </ThemeProvider>
    );
}

export async function getServerSideProps(context) {
   const [projectName, githubUser] = context.query.id.split('___');
   const dbExterno = await fetch(`https://${projectName}.${githubUser}.vercel.app/api/db`)
        .then((serverResponse) => {
            if(serverResponse.ok) {
                return serverResponse.json();
            }
            throw new Error('Error while retrieving data from server');
        })
        .then((convertedResponse) => {
            return convertedResponse;
        })
        .catch((err) => {
            console.error(err)
        })

    return {
        props: {
            dbExterno,
        },
    }
}