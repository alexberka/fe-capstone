import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// 'questionObj' includes a single question object with associated category object
// 'host' is a boolean that indicates whether user is in host view or not (defaults to false)
export default function QuestionCard({ questionObj, host, dragThis }) {
  return (
    // If host is set to true, clicking the card will direct to the question's details page with host tools
    // Otherwise, clicking will direct to player view of question (/question/[id] redirects if question isn't closed)
    <Link
      passHref
      href={`${host ? '/host' : ''}/question/${questionObj.firebaseKey}/${questionObj.gameQuestionId ? questionObj.gameQuestionId : ''}`}
    >
      <div className="q-card" draggable={dragThis} onDragStart={(e) => e.dataTransfer.setData('gameQuestionId', questionObj.gameQuestionId)}>
        <div className="q-card-tags">
          <p className="q-category" style={{ background: `${questionObj.category.color}` }}>
            {questionObj.category.name.toUpperCase()}
          </p>
          {host && questionObj.gameQuestionId && (
            <p className={`q-status status-${questionObj.status}`}>
              {questionObj.status.toUpperCase()}
            </p>
          )}
          {/* Include the date of last usage if in host view (creates date from ISO String in database) */}
          {host && !questionObj.gameQuestionId && (
            <p className="q-timestamp">
              {questionObj.lastUsed !== 'never'
                ? `Last Used: ${new Date(questionObj.lastUsed)
                  .toDateString()
                  .split(' ')
                  .slice(1)
                  .join(' ')}`
                : 'Last Used: Never'}
            </p>
          )}
        </div>
        <p className="q-card-text">
          {questionObj.question}
        </p>
      </div>
    </Link>
  );
}

QuestionCard.propTypes = {
  questionObj: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.string,
    lastUsed: PropTypes.string,
    firebaseKey: PropTypes.string,
    gameQuestionId: PropTypes.string,
    queue: PropTypes.number,
    status: PropTypes.string,
    timeOpened: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
      color: PropTypes.string,
    }),
  }).isRequired,
  host: PropTypes.bool,
  dragThis: PropTypes.bool,
};

QuestionCard.defaultProps = {
  host: false,
  dragThis: false,
};
