import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight || !Number(height) || !Number(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = {
    weight,
    height,
    bmi: calculateBmi(height, weight),
  };

  res.json(result);
});

app.post('/exercise', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  }

  if (
    !Array.isArray(daily_exercises) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    daily_exercises.every((value: any) => typeof value !== 'number')
  ) {
    res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(target, daily_exercises);
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
