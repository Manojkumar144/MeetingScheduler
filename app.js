const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const SlotsBooking = require('./models/slotsBooking');
const SlotsTable = require('./models/slotsTable');

const app = express();
const port = 3000;

//set the view directory and ejs template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/slotsAvailable'));

app.get('/', async (req, res) => {
  try {
    // Fetch all records from the SlotsBooking table
    const slots = await SlotsTable.findAll();
    const slotsBookings = await SlotsBooking.findAll();

    // Render the index.ejs file and pass the fetched data
    res.render('index', { slotsBookings, slots });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Synchronize models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    // Start the server after the database synchronization is complete
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error synchronizing models with the database:', error);
  });
