const express = require('express');

const tourController = require(`./../controllers/tourController`);
const authController = require(`./../controllers/authController`);

const router = express.Router();

// router.param('id', tourController.checkId);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

// app.get('/api/v1/tours', getAllTours);
// app.post(`/api/v1/tours`, createTour);
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch(`/api/v1/tour/:id`, updateTour);
// app.delete(`/api/v1/tour/:id`, deleteTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
