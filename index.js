const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello mero naam hari bahadur ho");
});

app.get("/madan-bahadur", (req, res) => {
  const message_from_client = req.query.message;
  res.send(`Hello ma chai madan bahadur. my message is ${message_from_client}`);
});

app.get("/read-the-file", (req, res) => {
  const filePath = path.join(__dirname, "some_text.txt");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
      res.send("<h2>Server error: Unable to read file</h2>");
      return;
    }
    const html = `
        <h1> Content from the server text file</h1>
        <pre style="background: #f4f4f4; padding: 10px;">${data}</pre>
    `;
    res.send(html);
    return;
  });
});

app.get("/get-the-file", () => {
  console.log("file achieving");
});

app.listen(PORT, () => {
  console.log(`The server is running in localhost!! Port number ${PORT}`);
});
