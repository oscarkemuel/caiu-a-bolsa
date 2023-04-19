import express from 'express';
import 'dotenv/config';
import puppeteerService from './puppeteerService';

const app = express();

app.use(express.json());

app.get('/', async (_, res) => {
  const scholarshipHolderName = process.env.SCHOLARSHIP_HOLDER_NAME;
  await puppeteerService.getPaymentsNumberByName(scholarshipHolderName);
  res.json({ message: 'Hello World' });
})

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
