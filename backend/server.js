const express = require("express");
const cors = require("cors");
require("dotenv").config();

const videoRoutes = require("./routes/video");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/video", videoRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
