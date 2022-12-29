const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.static(__dirname + "/medias"));
const PORT = process.env.PORT || 4000;

//Allow cors
const cors = require("cors");
//Loop of allowed origins
const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "https://grocery-zip.vercel.app",
  "http://localhost:4200",
  "https://social-rouge.vercel.app",
  "https://first-angular-nine.vercel.app",
  "http://localhost:4000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

//allow json to be parsed
app.use(express.json());

//Connect to database
const connectDB = require("./config/connection");
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/product", require("./routes/product"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/search", require("./routes/search"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/address", require("./routes/address"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/users", require("./routes/users"));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
}); //Start the server
