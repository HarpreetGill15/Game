function QuestionDisplay({ question, onAnswer }) {
    console.log("Rendering QuestionDisplay with question:", question);
    if (!question) {
        return <div>Loading question...</div>;
    }
    return (
        <div>
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