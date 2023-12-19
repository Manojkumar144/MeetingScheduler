const express = require('express');
const router = express.Router();
const meetingSlotsController = require('../controllers/meetingSlotsController');

// api to handle creation of meeting details for a user
router.post('/addUser', meetingSlotsController.postAddUser);

//api to fetch all the meeting details
router.get('/meetingDetails',meetingSlotsController.getMeetingDetails);

//api to handle deletion of the meetings
router.post('/delete-meeting',meetingSlotsController.postDeleteMeetings);

module.exports = router;
