import diagnosisData from '../../data/diagnoses.json';

import { DiagnosisEntry } from '../types';

const diagnoses: Array<DiagnosisEntry> = diagnosisData;

const getDiagnoses = (): Array<DiagnosisEntry> => {
  return diagnoses;
};

export default {
  getDiagnoses
};
