function QuestionDisplay({ question, onAnswer }) {
    console.log("Rendering QuestionDisplay with question:", question);
    if (!question) {
        return <div>Loading question...</div>;
    }
    return (
        <div>
            <h2>{question.questionNumber}/{question.totalQuestions}</h2>
            <h1>{question.question}</h1>
            {question.options.map((answer) => (
                <button
                key={answer}
                onClick={() => onAnswer(answer)}
                >
                {answer}
                </button>
            ))}
        </div>
    );
}

export default QuestionDisplay;