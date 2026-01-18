const express = require("express");
const cors = require("cors");
require("dotenv").config();

const videoRoutes = require("./routes/video");

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(express.json());

app.use("/api/video", videoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
