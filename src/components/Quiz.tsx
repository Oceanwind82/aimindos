import React from 'react';

export interface QuizProps {
  questions: any[];
}

export const Quiz: React.FC<QuizProps> = ({ questions }) => (
  <div className="quiz">
    <h3>Quiz</h3>
    <p>Questions: {questions.length}</p>
  </div>
);
