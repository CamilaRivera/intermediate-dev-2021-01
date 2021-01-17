import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link, useParams } from 'react-router-dom';
import reposServices from '../../services/reposServices'; // TODO: Add alias
import FeedbackMessage from '../FeedbackMessage/FeedbackMessage';
import Spinner from '../Spinner/Spinner';

import './RepoInfo.scss';

const DISPLAY_DATE_FORMAT = 'dddd, MMMM Do YYYY, h:mm:ss a';

const RepoInfo = () => {
  const [repoInfo, setRepoInfo] = useState();
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fullName } = useParams();

  useEffect(() => {
    // Wrap getRepoInfo in a non-async call
    const getRepoInfo = async () => {
      setLoading(true);
      setApiError(null); // Reset error
      try {
        const latestCommit = await reposServices.getLatestCommitByRepo(
          fullName
        );
        // Readme is optional, the service will return null if there is none
        const readme = await reposServices.getReadmeByRepo(fullName);
        setRepoInfo({
          commit: latestCommit.length ? latestCommit[0].commit : null,
          readme,
        });
        setLoading(false);
      } catch (error) {
        // Failed to find commits from this Repo, probably because the repo doesn't exist!
        if (error.response && error.response.status === 404) {
          setApiError(`The repository '${fullName}' doesn't exist.`);
        } else {
          setApiError(`Unhandled error from the server.`);
        }
        setLoading(false);
      }
    };
    getRepoInfo();
  }, [fullName]);

  return (
    <div className="repo-info-container">
      <h1 className="header">Repository details</h1>
      <Spinner show={loading} altText="Loading repository data..." />
      {repoInfo && (
        <div>
          {repoInfo.commit && (
            <div className="commit-card card">
              <div class="header">Latest commit</div>
              <div className="commit-details">
                <span>Author: </span>
                {repoInfo.commit.author.name}
                <br />
                <span>Date: </span>
                {moment(repoInfo.commit.author.date).format(
                  DISPLAY_DATE_FORMAT
                )}
                <br />
                <span>Message: </span>
                {repoInfo.commit.message}
                <br />
              </div>
            </div>
          )}
          {repoInfo.readme && (
            <>
              <Link to={'/'} className="btn btn-primary mt-40">
                Back to the repositories list
              </Link>
              <div className="card markdown-box">
                <div class="header">README.md</div>
                <ReactMarkdown className="p-40" source={repoInfo.readme} />
              </div>
            </>
          )}
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
