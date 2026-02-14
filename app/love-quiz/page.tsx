"use client";

import { useState } from "react";

const questions = [
    {
        question: "Who said 'I love you' first?",
        options: ["Me", "My partner", "Both together", "Not yet"],
    },
    {
        question: "Favorite activity together?",
        options: ["Watching movies", "Traveling", "Chatting", "Gaming"],
    },
    {
        question: "How often do you talk?",
        options: ["All day", "Every few hours", "Once a day", "Rarely"],
    },
    {
        question: "What's your relationship status?",
        options: ["Dating", "Engaged", "Married", "Complicated"],
    },
    {
        question: "How long have you been together?",
        options: ["Less than a year", "1-2 years", "3-5 years", "5+ years"],
    },
    {
        question: "Do you see a future together?",
        options: ["Definitely", "Probably", "Maybe", "Not sure"],
    },
    {
        question: "Best quality about your partner?",
        options: ["Kindness", "Humor", "Intelligence", "Loyalty"],
    },
    {
        question: "How do you celebrate together?",
        options: ["Dinner dates", "Surprises", "Quiet time", "Adventures"],
    },
    {
        question: "What's your love language?",
        options: ["Words", "Acts of service", "Gifts", "Quality time"],
    },
    {
        question: "How supportive are they?",
        options: ["Extremely", "Very", "Somewhat", "Not much"],
    },
];

export default function LoveQuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [finished, setFinished] = useState(false);

    function handleAnswer(option: string) {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setFinished(true);
        }
    }

    function restartQuiz() {
        setCurrentQuestion(0);
        setAnswers([]);
        setFinished(false);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 className="text-3xl font-bold mb-6">❤️ Love Quiz</h1>

            {!finished ? (
                <div>
                    <p className="text-sm text-gray-500 mb-2">Question {currentQuestion + 1} of {questions.length}</p>
                    <h2 className="text-xl mb-4">
                        {questions[currentQuestion].question}
                    </h2>

                    <div className="flex flex-col gap-3">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl mb-4">Quiz Finished ❤️</h2>

                    <p className="mb-4">
                        Your love strength: {Math.floor(Math.random() * 41) + 60}%
                    </p>

                    <button
                        onClick={restartQuiz}
                        className="px-6 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600"
                    >
                        Restart Quiz
                    </button>
                </div>
            )}
        </div>
    );
}
