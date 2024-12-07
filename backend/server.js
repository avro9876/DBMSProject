const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/db"); 
const app = express();

app.use(cors());
app.use(bodyParser.json());


// Import routes
const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/student");
// Use routes
app.use("/auth", authRoutes);
app.use("/student",studentRoutes);
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
