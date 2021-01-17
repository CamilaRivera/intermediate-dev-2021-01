import { Router, Request, Response } from 'express';
import axios from 'axios';
import reposBack from '../../data/repos.json';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  try {
    const response = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );
    const internalRepos = reposBack.filter(
      (repo: { fork: boolean }) => repo.fork === false
    );
    const filteredResponse = response.data.filter(
      (repo: { fork: boolean }) => repo.fork === false
    );
    const agregateRepos = [...internalRepos, ...filteredResponse];
    res.send(agregateRepos);
  } catch (error) {
    console.error(error);
  }
});
