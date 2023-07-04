const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      next(new AppError('No Document found with that ID', 404));
    }
    return res.status(204).json({
      status: 'Success',
      data: null,
    });
  });

// exports.deleteTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findByIdAndDelete(req.params.id);
//   if (!tour) {
//     next(new AppError('No tour found with that ID', 404));
//   }
//   return res.status(204).json({
//     status: 'Success',
//     data: null,
//   });
// });
