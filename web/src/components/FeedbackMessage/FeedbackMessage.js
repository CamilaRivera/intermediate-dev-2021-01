import React from 'react';

import './FeedbackMessage.scss';

// Currently hardcoded as an error message. Later it could be extended to dynamically handle messages types: error, info, success, etc.
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
