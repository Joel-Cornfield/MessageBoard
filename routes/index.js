const express = require("express");
const router = express.Router();

const messages = [
  { text: "Hi there!", user: "Amando", added: new Date() },
  { text: "Hello World!", user: "Charles", added: new Date() },
];

// Home page
router.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages });
});

// New message form
router.get("/new", (req, res) => {
  res.render("form", { title: "Add a New Message" });
});

// Handle new message submission
router.post("/new", (req, res) => {
  const { messageUser, messageText } = req.body;
  if (messageUser && messageText) {
    messages.push({ text: messageText, user: messageUser, added: new Date() });
  }
  res.redirect("/");
});

// View message details
router.get("/message/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const message = messages[id];
  if (message) {
    res.render("message", { title: "Message Details", message });
  } else {
    res.status(404).send("Message not found");
  }
});

module.exports = router;
