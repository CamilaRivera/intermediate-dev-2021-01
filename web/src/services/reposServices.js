import axios from 'axios';

const getReposList = async () => {
  const reposList = await axios.get(' http://localhost:4000/repos');
  return reposList.data;
};

const getLatestCommitByRepo = async (fullNameRepo) => {
  const reposList = await axios.get(
    `https://api.github.com/repos/${fullNameRepo}/commits?per_page=1`
  );
  return reposList.data;
};

const getReadmeByRepo = async (fullNameRepo) => {
  try {
    const reposList = await axios.get(
      `https://raw.githubusercontent.com/${fullNameRepo}/master/README.md`
    );
    return reposList.data;
  } catch (err) {
    // Only some repositories have README.md.
    return null;
  }
};

const reposServices = {
  getReposList,
  getLatestCommitByRepo,
  getReadmeByRepo,
};

export default reposServices;
