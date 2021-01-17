import { Router, Request, Response } from 'express';
import axios from 'axios';
import reposBack from '../../data/repos.json';

export const repos = Router();

const repoForkFilter = (repo: { fork: boolean }) => repo.fork === false;

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  try {
    const response = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );
    const internalRepos = reposBack.filter(repoForkFilter);
    const filteredResponse = response.data.filter(repoForkFilter);
    const agregateRepos = [...internalRepos, ...filteredResponse];
    res.send(agregateRepos);
  } catch (error) {
    res.status(500).send(`ERROR: ${error}`);
  }
});
