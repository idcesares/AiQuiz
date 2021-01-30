import React from 'react';
import QuizScreen from '../../src/screens/Quiz';
import db from '../../db.json'

export default function QuizPage() {
    return (
        <QuizScreen 
        externalQuestions={db.questions}
        externalBg={db.bg}
        defaultLogo={db.defaultLogo}
        />
    );
}