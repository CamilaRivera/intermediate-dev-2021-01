import React, { useEffect, useState } from 'react';
import reposServices from '../../services/reposServices'; // TODO: Add alias
import { Link } from 'react-router-dom';

import './RepoList.scss';
import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';

const ALL_LANGUAGES = 'All languages';
const ACTIVE_BUTTON_CLASSES = 'btn btn-primary';
const BUTTON_CLASSES = 'btn btn-primary';

const getLanguages = (repos) => {
  const languages = { all: ALL_LANGUAGES };
  repos.forEach((repo) => {
    const language = repo.language;
    if (!languages[language]) {
      languages[repo.language] = repo.language;
    }
  });

  return languages;
};

const RepoList = () => {
  const [reposList, setReposList] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(ALL_LANGUAGES);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const availableLanguages = getLanguages(reposList);

  const filteredRepoList = reposList.filter(
    (repo) =>
      selectedLanguage === ALL_LANGUAGES || repo.language === selectedLanguage
  );

  const reposListRequest = async () => {
    setApiError(null);
    setLoading(true);
    try {
      const repos = await reposServices.getReposList();
      console.log(repos);
      setReposList(
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
      setLoading(false);
    } catch (error) {
      setApiError('Error retrieving list of repositories from API');
      setLoading(false);
    }
  };

  const apiErrorMessageButton = {
    text: 'Try Again',
    callback: reposListRequest,
  };

  useEffect(() => {
    reposListRequest();
  }, []);

  return (
    <div>
      <h1 className="header">Repositories</h1>
      {apiError && (
        <FeedbackMessage
          message={apiError}
          actionButton={apiErrorMessageButton}
        />
      )}
      {loading && <img src="/spinner.gif" alt="Loading api data..." />}
      {reposList.length > 0 && (
        <>
          <div className="languages-filter-container">
            {Object.values(availableLanguages).map((language) => (
              <button
                onClick={(e) => setSelectedLanguage(language)}
                key={language}
                type="button"
                className={
                  language === selectedLanguage
                    ? ACTIVE_BUTTON_CLASSES
                    : BUTTON_CLASSES
                }
              >
                {language}
              </button>
            ))}
          </div>
          <div className="repos-list-container">
            {filteredRepoList.map((repo) => {
              return (
                <Link
                  key={repo.id}
                  to={`/repos/${repo.full_name}`}
                  className="repo-list-item"
                >
                  <div className="header">{repo.name}</div>
                  <div className="subheader">
                    Description: {repo.description || 'N/A'}
                  </div>
                  <div>
                    <span>Language: {repo.language}</span>
                    <span>Fork count: {repo.forks_count}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default RepoList;
