const fs = require('fs');
const express = require('express');
const exp = require('constants');

const app = express();
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((el) => el.id === req.params.id * 1);
  if (req.params.id * 1 > tours.length - 1) {
    return res.status(404).json({
      status: '  fail',
      message: 'invalid Id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log('error in posting file');
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  //just skeletion
  res.status(200).json({
    status: 'sucess',
    data: {
      tour: '<updateing tours here...>',
    },
  });
});

app.delete('/api/v1/tours/:id', (req, res) => {
  //just skeletion
  res.status(204).json({
    status: 'sucess',
    data: 'null',
  });
});

app.listen(3000, () => {
  console.log('server is listening');
});
