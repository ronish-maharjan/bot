const express = require("express");
const router = express.Router();

const knowledgeBase = require("../data/knowledgeBase");
const cleanInput = require("../utils/clean");

router.post("/", (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ response: "Message is required" });
  }

  const cleanedMessage = cleanInput(message);

  const result = knowledgeBase.find(
    (item) =>
      cleanedMessage.includes(item.message) ||
      item.message.includes(cleanedMessage)
  );

  const botResponse = result
    ? result.response
    : "I didn't understand that 🤔 Try asking about momo ingredients, dal bhat ingredients, sel roti ingredients, or thukpa ingredients.";

  res.json({ response: botResponse });
});

module.exports = router;
