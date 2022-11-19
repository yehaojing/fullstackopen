/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getEntries());
});

router.post('/', (_req, res) => {
  const { name, dateOfBirth, gender, occupation, ssn } = _req.body;
  const newPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    gender,
    occupation,
    ssn
  });
  res.json(newPatient);
});

export default router;