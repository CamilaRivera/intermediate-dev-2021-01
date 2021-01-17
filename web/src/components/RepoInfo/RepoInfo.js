import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import reposServices from '../../services/reposServices'; // TODO: Add alias

const getRepoInfo = async (repoName, setRepoInfo) => {
  try {
    const latestCommit = await reposServices.getLatestCommitByRepo(repoName);
    const readme = await reposServices.getReadmeByRepo(repoName);

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
  const { name } = useParams();

  console.log('repoInfo', repoInfo);

  useEffect(() => {
    getRepoInfo(name, setRepoInfo);
  }, [name]);

  return (
    <div>
      {repoInfo && (
        <div>
          {repoInfo.commit.author.name}, {repoInfo.commit.author.date},{' '}
          {repoInfo.commit.message}
        </div>
      )}
    </div>
  );
};

export default RepoInfo;
