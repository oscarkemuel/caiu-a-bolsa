import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.send('Hello Worldd!');
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
