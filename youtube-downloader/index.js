const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/download', (req, res) => {
  const { format, link } = req.body;

  if (!format || !link) {
    return res.status(400).send('Format and link are required.');
  }

  const command = `y2mate -f ${format} ${link}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error processing request.');
    }
    res.send(stdout);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
