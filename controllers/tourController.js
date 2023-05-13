const fs = require('fs');
const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid Body',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  return res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  // const tour = tours.find((el) => el.id === Number(req.params.id));
  // return res.status(200).json({
  //   status: 'Success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save();
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Invalid data sent!' });
  }
};

exports.updateTour = (req, res) => {
  return res.status(200).json({
    status: 'Success',
    data: {
      tour: `<Update tour here...>`,
    },
  });
};

exports.deleteTour = (req, res) => {
  return res.status(200).json({
    status: 'Success',
    data: null,
  });
};
