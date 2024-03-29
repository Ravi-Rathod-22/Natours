const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug })
    .populate({
      path: 'reviews',
      fields: 'reviews rating user',
    })
    .populate({
      path: 'guides',
      select: 'name photo role',
    });
  res
    .status(200)

    .render('tour', {
      title: `${tour.name} Tour`,
      tour,
    });
});

exports.getLoginFrom = catchAsync(async (req, res) => {
  res
    .status(200)

    .render('login');
});
