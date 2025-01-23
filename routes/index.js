const express = require('express');
const router = express.Router();
const pool = require('../db');

// Get all messages
router.get('/', async (req, res) => {
  try {
    const { rows: messages } = await pool.query('SELECT * FROM messages ORDER BY added DESC');
    res.render('index', { title: 'Mini Messageboard', messages });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving messages');
  }
});

// Render the new message form
router.get('/new', (req, res) => {
  res.render('form', { title: 'Add a New Message' });
});

// Add a new message
router.post('/new', async (req, res) => {
  const { messageText, messageUser } = req.body;
  try {
    await pool.query('INSERT INTO messages (text, user_name) VALUES ($1, $2)', [messageText, messageUser]);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding message');
  }
});

// Get a single message by id
router.get('/message/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Query the database for the message by ID
    const result = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Message not found');
    }

    const message = result.rows[0];
    res.render('message', { title: 'Message Details', message });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving message');
  }
});


module.exports = router;
