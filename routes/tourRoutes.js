const express = require('express');

const tourController = require(`./../controllers/tourController`);
const authController = require(`./../controllers/authController`);

const reviewRouter = require(`../routes/reviewRoutes`);

const router = express.Router();

// router.param('id', tourController.checkId);

router.use(`/:tourID/reviews`, reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

// /tours-distance?distance=233&center=-40,45&unit=mi
// /tours-distance/233/center/-40,45/unit/mi

router.route('/distance/:latlng/unit/:unit').get(tourController.getDistances);

// app.get('/api/v1/tours', getAllTours);
// app.post(`/api/v1/tours`, createTour);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.createTour
  );

// app.get('/api/v1/tours/:id', getTour);
// app.patch(`/api/v1/tour/:id`, updateTour);
// app.delete(`/api/v1/tour/:id`, deleteTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
