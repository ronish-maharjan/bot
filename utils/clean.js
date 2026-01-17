function cleanInput(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .trim();
}

module.exports = cleanInput;
