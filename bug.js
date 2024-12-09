const express = require('express');
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

//Uncommon Error: Inconsistent use of promises and callbacks

//Somewhere in your code you might be mixing promises and callbacks without proper handling, leading to unexpected behavior
app.get('/data', (req, res) => {
  someAsyncFunction().then(data => {
    // correct way to handle promise inside callback
    res.send(data);
  }).catch(error => {
    console.error(error);
    res.status(500).send('Internal Server Error');
  });
});

//Another place with inconsistent approach
app.get('/data1', (req, res) => {
  someAsyncFunction((err,data) => { //callback style
    if(err) {
      console.error(err);
      res.status(500).send('Internal Server Error')
    }
    else{
      res.send(data);
    }
  });
});

async function someAsyncFunction() {
  // Simulate an asynchronous operation
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate success or failure
      const success = Math.random() < 0.9; // 90% chance of success
      if (success) {
        resolve({ message: 'Success!' });
      } else {
        reject(new Error('Simulated error'));
      }
    }, 1000);
  });
}