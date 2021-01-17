import axios from 'axios';

const getReposList = async () => {
  try {
    const reposList = await axios.get(' http://localhost:4000/repos');
    return reposList.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};

const getLatestCommitByRepo = async (fullNameRepo) => {
  try {
    const reposList = await axios.get(
      `https://api.github.com/repos/silverorange/${fullNameRepo}/commits?per_page=1`
    );
    return reposList.data;
  } catch (err) {
    if (err.response && err.response.data) {
      throw err.response.data;
    } else {
      throw err;
    }
  }
};

const getReadmeByRepo = async (fullNameRepo) => {
  try {
    const reposList = await axios.get(
      `https://raw.githubusercontent.com/${fullNameRepo}/master/README.md`
    );
    return reposList.data;
  } catch (err) {
    // if (err.response && err.response.data) {
    //   throw err.response.data;
    // } else {
    //   throw err;
    // }
    return null;
  }
};

const reposServices = {
  getReposList,
  getLatestCommitByRepo,
  getReadmeByRepo,
};

export default reposServices;
