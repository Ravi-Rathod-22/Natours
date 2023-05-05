const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARE
app.use(morgan(`dev`));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Hello From Middleware`);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTES HANDLERS

const getAllTours = (req, res) => {
  console.log(req.requestTime);
  return res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
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

const getAllUsers = (req, res) => {
  return res
    .status(500)
    .json({ status: 'error', message: 'This route is not yet defined!' });
};

const createUser = (req, res) => {
  return req.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const getUser = (req, res) => {
  return req.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const updateUser = (req, res) => {
  return req.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const deleteUser = (req, res) => {
  return req.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

// 3) ROUTES

// app.get('/api/v1/tours', getAllTours);
// app.post(`/api/v1/tours`, createTour);

const tourRouter = express.Router();
const userRouter = express.Router();

app.use(`/api/v1/tours`, tourRouter);
app.use(`/api/v1/users`, userRouter);



tourRouter.route('/').get(getAllTours).post(createTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch(`/api/v1/tour/:id`, updateTour);
// app.delete(`/api/v1/tour/:id`, deleteTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route(`/`).get(getAllUsers).post(createUser);

userRouter
  .route(`/:id`)
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
  
  
// 4) START SERVER

const port = 3000;
app.listen(port, () => {
  console.log(`App running at ${port}...`);
});
