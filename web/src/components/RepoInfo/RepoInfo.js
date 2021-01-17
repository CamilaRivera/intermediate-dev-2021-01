import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import reposServices from '../../services/reposServices'; // TODO: Add alias
import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';

const RepoInfo = () => {
  const [repoInfo, setRepoInfo] = useState();
  const [apiError, setApiError] = useState(null);
  const { fullName } = useParams();

  console.log('repoInfo', repoInfo);
  console.log('params', fullName);

  useEffect(() => {
    // Wrap getRepoInfo in a non-async call
    const getRepoInfo = async () => {
      setApiError(null); // Reset error
      try {
        const latestCommit = await reposServices.getLatestCommitByRepo(
          fullName
        );
        // Readme is optional, the service will return null if there is none
        const readme = await reposServices.getReadmeByRepo(fullName);
        setRepoInfo({
          commit: latestCommit[0].commit,
          readme,
        });
      } catch (error) {
        // Failed to find commits from this Repo, probably because the repo doesn't exist!
        if (error.response && error.response.status === 404) {
          setApiError(`The repository '${fullName}' doesn't exist.`);
        } else {
          setApiError(`Unhandled error from the server.`);
        }
      }
    };
    getRepoInfo();
  }, [fullName]);

  return (
    <div>
      <h1 className="header">Repository details</h1>

      {repoInfo && (
        <div>
          {repoInfo.commit.author.name}, {repoInfo.commit.author.date},{' '}
          {repoInfo.commit.message}
          {repoInfo.readme && <ReactMarkdown source={repoInfo.readme} />}
        </div>
      )}
      {apiError && <FeedbackMessage message={apiError} />}

      <Link to={'/'} className="btn btn-primary mt-40">
        Back to the repositories list
      </Link>
    </div>
  );
};

export default RepoInfo;
