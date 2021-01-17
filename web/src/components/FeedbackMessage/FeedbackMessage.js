import React from 'react';

import './FeedbackMessage.scss';

const FeedbackMessage = ({ message, actionButton }) => {
  return (
    <div className="feedback-message">
      <div>{message}</div>
      {actionButton && (
        <button class="btn" onClick={actionButton.callback}>
          {actionButton.text}
        </button>
      )}
    </div>
  );
};

export default FeedbackMessage;
