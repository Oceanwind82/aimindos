import React, { useState } from 'react';
import type { QuizQuestion } from '@/lib/lessons';

export interface QuizProps {
  questions: readonly QuizQuestion[];
}

export const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [answers, setAnswers] = useState<{ [id: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(id: number, value: string) {
    setAnswers((a) => ({ ...a, [id]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {questions.map((q) => (
        <div key={q.id} className="p-2 border rounded">
          <div className="font-semibold mb-1">{q.question}</div>
          {q.type === 'multiple-choice' && q.options ? (
            <div className="space-y-1">
              {q.options.map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`q${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                    disabled={submitted}
                  />
                  {opt}
                </label>
              ))}
            </div>
          ) : (
            <input
              type="text"
              className="border rounded px-2"
              value={answers[q.id] || ''}
              onChange={(e) => handleChange(q.id, e.target.value)}
              disabled={submitted}
              placeholder="Type your answer..."
            />
          )}
          {submitted && (
            <div className={answers[q.id] === q.answer ? 'text-green-600' : 'text-red-600'}>
              {answers[q.id] === q.answer ? 'Correct!' : `Answer: ${q.answer}`}
            </div>
          )}
        </div>
      ))}
      {!submitted && (
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      )}
    </form>
  );
};
