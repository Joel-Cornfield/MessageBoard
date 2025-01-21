const express = require("express");
const router = express.Router();

const messages = [
    { text: "Hi there!", user: "Amanda", added: new Date() },
    { text: "Hello World!", user: "Charles", added: new Date() },
];

router.get("/", (req, res) => {
    res.render("index", { title: "Mini Messageboard", messages });
});

router.get("/new", (req, res) => {
    res.render("form");
});

router.get("/message/:id", (req, res) => {
    const message = messages[req.params.id];
    if (message) {
        res.render("message", { message });
    } else {
        res.status(404).send("Message not found");
    }
});

router.post("/new", (req, res) => {
    const { messageText, messageUser } = req.body;
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect("/");
});

module.exports = router;