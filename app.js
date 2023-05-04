const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const getAllTours = (req, res) => {
  return res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  const tour = tours.find((el) => el.id === Number(req.params.id));
  return res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  return res.status(200).json({
    status: 'Success',
    data: {
      tour: `<Update tour here...>`,
    },
  });
};

const deleteTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
  }

  return res.status(200).json({
    status: 'Success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post(`/api/v1/tours`, createTour);
app.route('/api/v1/tours').get(getAllTours).post(createTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch(`/api/v1/tour/:id`, updateTour);
// app.delete(`/api/v1/tour/:id`, deleteTour);
app.route('/api/v1/tour/:id').get(getTour).patch(updateTour).delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App running at ${port}...`);
});
