import { Router, Request, Response } from 'express';
import axios from 'axios';
import reposBack from '../../data/repos.json';

export const repos = Router();

const repoForkFilter = (repo: { fork: boolean }) => repo.fork === false;

const aggregateAvoidingDuplicatesById = (
  arrayA: Array<{ id: any }>,
  arrayB: Array<{ id: any }>
) => {
  // Elements from arrayA will have priority over arrayB. In case of repetition of IDs within the repository, the first unique ID will be prioritized
  const uniqueIDs = new Set();
  const uniqueElementsByID: Array<{ id: any }> = [];

  // Asumed data is not large, otherwise it shouldn't be copied to a new Array to iterate
  [...arrayA, ...arrayB].forEach((element) => {
    if (!uniqueIDs.has(element.id)) {
      uniqueIDs.add(element.id);
      uniqueElementsByID.push(element);
    }
  });

  return uniqueElementsByID;
};

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  try {
    const response = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );
    const filteredResponse = response.data.filter(repoForkFilter);
    const internalRepos = reposBack.filter(repoForkFilter);
    const agregatedRepos = aggregateAvoidingDuplicatesById(
      filteredResponse,
      internalRepos
    );

    res.send(agregatedRepos);
  } catch (error) {
    res.status(500).send(`ERROR: ${error}`);
  }
});
