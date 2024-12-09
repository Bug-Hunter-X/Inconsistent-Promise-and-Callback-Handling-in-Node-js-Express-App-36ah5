const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});

async function someAsyncFunction() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() < 0.9; 
      if (success) {
        resolve({ message: 'Success!' });
      } else {
        reject(new Error('Simulated error'));
      }
    }, 1000);
  });
}

app.get('/data', async (req, res) => {
  try {
    const data = await someAsyncFunction();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/data1', async (req, res) => {
  try {
    const data = await someAsyncFunction();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});