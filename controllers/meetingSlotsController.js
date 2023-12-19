const SlotsAvailable = require('../models/slotsTable');
const SlotsBooking = require('../models/slotsBooking');

exports.getMeetingDetails = (req, res, next) => {
  SlotsBooking.findAll()
    .then(meeting => {
      if (!meeting) {
        // Meeting not found
        res.status(404).send('Meeting not found');
        return;
      }

      // Render the index.ejs file and pass the meeting details within an object
      res.render('index', { slot: meeting });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

// meetingSlotsController.js
exports.postAddUser = async (req, res, next) => {
  console.log('Received form data:', req.body);
  const { name, email, meetingUrl, time, slotId } = req.body;

  try {
    // Find the slot to check the availability
    const slot = await SlotsAvailable.findByPk(slotId);

    if (!slot || slot.slotsAvailable <= 0) {
      res.status(404).send('Slot not available');
      return;
    }

    // Update slotsAvailable in the slots_table
    await slot.decrement('slotsAvailable');

    // Create user
    const createdUser = await SlotsBooking.create({
      name,
      email,
      meetingUrl,
      time,
      slotId
    });
     
    const slotBookings = await SlotsBooking.findAll();
    const slots = await SlotsAvailable.findAll();
    console.log('Created user:', createdUser.name);

    // Render the index.ejs file and pass the slot details within an object
    res.render('index', {slots:slots, slotsBookings: slotBookings });

  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.postDeleteMeetings = async (req, res, next) => {
  const name = req.body.name;

  try {
    // Find the user to get the slotId
    const user = await SlotsBooking.findOne({
      where: { name: name }
    });

    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const slotId = user.slotId;

    // Update slotsAvailable in the slots_table
    const slot = await SlotsAvailable.findByPk(slotId);
    if (slot) {
      await slot.increment('slotsAvailable');
    }

    // Delete the user
    await user.destroy();

    console.log('Canceled meeting');
    res.redirect('/');

  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};
