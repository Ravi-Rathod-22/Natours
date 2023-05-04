const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get(`/`, (req, res) => {
//   res
//     .status(200)
//     .json({ message: `Hello from the server side!`, app: `Natours` });
// });

// app.post(`/`, (req, res) => {
//     res.send(`You can post to this endpoint...`);
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  const tour = tours.find((el) => el.id === Number(req.params.id));
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
});

app.post(`/api/v1/tours`, (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch(`/api/v1/tour/:id`, (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({
    status: 'Success',
    data: {
      tour: `<Update tour here...>`,
    },
  });
});

app.delete(`/api/v1/tour/:id`, (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  res.status(200).json({
    status: 'Success',
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running at ${port}...`);
});
