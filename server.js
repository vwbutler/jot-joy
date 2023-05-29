const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes needed

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
