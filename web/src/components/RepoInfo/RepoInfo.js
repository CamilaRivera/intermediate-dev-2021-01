import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import reposServices from '../../services/reposServices'; // TODO: Add alias

const getRepoInfo = async (repoFullName, setRepoInfo) => {
  try {
    const latestCommit = await reposServices.getLatestCommitByRepo(
      repoFullName
    );
    const readme = await reposServices.getReadmeByRepo(repoFullName);

    console.log('readme', readme);
    setRepoInfo({
      commit: latestCommit[0].commit,
      readme,
    });
  } catch (error) {
    // dispatch(setError(error.message ? error.message : error));
  }
};

const RepoInfo = () => {
  const [repoInfo, setRepoInfo] = useState();
  const { fullName } = useParams();

  console.log('repoInfo', repoInfo);
  console.log('params', fullName);

  useEffect(() => {
    getRepoInfo(fullName, setRepoInfo);
  }, [fullName]);

  return (
    <div>
      {repoInfo && (
        <div>
          {repoInfo.commit.author.name}, {repoInfo.commit.author.date},{' '}
          {repoInfo.commit.message}
          {repoInfo.readme && <ReactMarkdown source={repoInfo.readme} />}
        </div>
      )}
    </div>
  );
};

export default RepoInfo;
