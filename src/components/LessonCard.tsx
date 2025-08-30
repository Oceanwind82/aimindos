import styles from './LessonCard.module.css';
import type { Lesson } from '../lib/lessons';

interface LessonCardProps {
  lesson: Lesson;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson }) => {
  // Refactor adaptive difficulty color
  let difficultyClass = '';
  if (lesson.motivation?.adaptiveDifficulty === 'easy') {
    difficultyClass = styles['motivation-difficulty-easy'];
  } else if (lesson.motivation?.adaptiveDifficulty === 'normal') {
    difficultyClass = styles['motivation-difficulty-normal'];
  } else if (lesson.motivation?.adaptiveDifficulty === 'hard') {
    difficultyClass = styles['motivation-difficulty-hard'];
  }

  return (
    <div className={styles['lesson-card']}>
      {lesson.hook && <blockquote className={styles['lesson-hook']}>{lesson.hook}</blockquote>}
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>
      {lesson.storyline && (
        <div className={styles['lesson-storyline']}>
          <strong>Storyline:</strong> {lesson.storyline}
        </div>
      )}
      {lesson.creatorMode && (
        <div className={styles['lesson-creator']}>
          <span>Creator Mode Enabled</span>
        </div>
      )}
      {lesson.mentor && (
        <div className={styles['lesson-mentor']}>
          <strong>Mentor:</strong> {lesson.mentor}
        </div>
      )}
      {lesson.difficulty && (
        <div className={styles['lesson-difficulty']}>
          <strong>Difficulty:</strong> {lesson.difficulty}
        </div>
      )}
      {lesson.path && (
        <div className={styles['lesson-path']}>
          <strong>Path:</strong> {lesson.path}
        </div>
      )}
      {(lesson.audioUrl || lesson.videoUrl || lesson.demo) && (
        <div className={styles['lesson-media']}>
          {lesson.audioUrl && (
            <audio controls className={styles['lesson-media-audio']} src={lesson.audioUrl}>
              <track kind="captions" />
              Your browser does not support the audio element.
            </audio>
          )}
          {lesson.videoUrl && (
            <video
              controls
              className={styles['lesson-media-video']}
              src={lesson.videoUrl}
              width="220"
            >
              <track kind="captions" />
              Your browser does not support the video tag.
            </video>
          )}
          {lesson.demo && <span>Demo: {lesson.demo}</span>}
        </div>
      )}
      {lesson.bossBattle && (
        <div className={styles['lesson-boss']}>
          <strong>Boss Battle:</strong> {lesson.bossBattle.title}
          <br />
          <span>{lesson.bossBattle.description}</span>
          <br />
          <em>Challenge:</em> {lesson.bossBattle.challenge}
          <br />
          {lesson.bossBattle.reward && <span>Reward: {lesson.bossBattle.reward}</span>}
        </div>
      )}
      {lesson.quiz && lesson.quiz.length > 0 && (
        <div className={styles['lesson-quiz']}>
          <strong>Quiz:</strong>
          <ul>
            {lesson.quiz.map((q) => (
              <li key={q.id}>
                <span>{q.question}</span>
                {q.options && (
                  <ul>
                    {q.options.map((opt) => (
                      <li key={opt}>{opt}</li>
                    ))}
                  </ul>
                )}
                <em>Answer:</em> {q.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
      {lesson.microTask && (
        <div className={styles['lesson-microtask']}>
          <strong>MicroTask:</strong> {lesson.microTask.description}
        </div>
      )}
      {lesson.feedback && lesson.feedback.length > 0 && (
        <div className={styles['lesson-feedback']}>
          <strong>Feedback:</strong>
          <ul>
            {lesson.feedback.map((fb) => (
              <li key={fb.userId + (fb.comment || '')}>
                <span>{fb.comment}</span>
                {fb.rating && <span> ({fb.rating}/5)</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
      {lesson.motivation && (
        <div className={styles['lesson-motivation']}>
          <strong>Motivation:</strong>
          {lesson.motivation.message && (
            <div className={styles['motivation-message']}>
              <span>{lesson.motivation.message}</span>
            </div>
          )}
          {lesson.motivation.badge && (
            <div className={styles['motivation-badge']}>
              <span className={styles['motivation-badge-icon']} aria-label="badge" />
              <span>Badge: {lesson.motivation.badge}</span>
            </div>
          )}
          {typeof lesson.motivation.streakRequired === 'number' && (
            <div className={styles['motivation-streak']}>
              <span>Streak Required:</span>
              <div className={styles['motivation-streak-bar']}>
                <div
                  className={styles['motivation-streak-fill']}
                  data-width={Math.min(lesson.motivation.streakRequired ?? 0, 10) * 10}
                ></div>
              </div>
              <span>{lesson.motivation.streakRequired} days</span>
            </div>
          )}
          {lesson.motivation.adaptiveDifficulty && (
            <div className={styles['motivation-difficulty']}>
              <span className={difficultyClass}>
                Adaptive Difficulty: {lesson.motivation.adaptiveDifficulty}
              </span>
            </div>
          )}
          {lesson.motivation.feedbackType && (
            <div className={styles['motivation-feedback']}>
              <span>Feedback Type: {lesson.motivation.feedbackType}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonCard;
