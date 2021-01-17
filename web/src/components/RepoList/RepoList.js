import React, { useEffect, useState } from 'react';
import reposServices from '../../services/reposServices'; // TODO: Add alias
import { Link } from 'react-router-dom';

import './RepoList.scss';
import moment from 'moment';

const ALL_LANGUAGES = 'All languages';
const DISPLAY_DATE_FORMAT = 'dddd, MMMM Do YYYY, h:mm:ss a';

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

  const availableLanguages = getLanguages(reposList);

  const filteredRepoList = reposList.filter(
    (repo) =>
      selectedLanguage === ALL_LANGUAGES || repo.language === selectedLanguage
  );

  const reposListRequest = async () => {
    try {
      const repos = await reposServices.getReposList();
      console.log(repos);
      setReposList(
        repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      );
    } catch (error) {
      // TODO: Handle error
      console.log('error', error);
    }
  };

  useEffect(() => {
    reposListRequest();
  }, []);

  return (
    <div>
      <h1 className="header">Repositories</h1>
      <div className="languages-filter-container">
        {Object.values(availableLanguages).map((language) => (
          <button
            onClick={(e) => setSelectedLanguage(language)}
            key={language}
            type="button"
            className="btn btn-primary"
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
              name={repo.name}
              to={`/repos/${repo.name}`}
              className="repo-list-item"
            >
              <div className="header">{repo.name}</div>
              <div className="subheader">
                Description: {repo.description || 'N/A'}
              </div>
              <div>
                <span>
                  Creation Date:{' '}
                  {moment(repo.created_at).format(DISPLAY_DATE_FORMAT)}
                </span>
                <span>Language: {repo.language}</span>
                <span>Fork count: {repo.forks_count}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RepoList;
