const express = require("express");
const mongoose = require("mongoose");
userRoute = require("./controller/userRoute");
detailsRoute = require("./controller/detailsRoute");
therapistRoute = require("./controller/therapistRoute");
bookRoute = require("./controller/bookRoute");
meditateRoute = require("./controller/meditateRoute");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://serenitysync:serenitySyncEPIC@serenitysync.oqqhm5c.mongodb.net/serenitysyncdb")
var db = mongoose.connection;
db.on("open", () => console.log("Connected to DB"));
db.on("error", () => console.log("Error occurred"));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use("/userRoute", userRoute);
app.use("/detailsRoute", detailsRoute);
app.use("/therapistRoute", therapistRoute);
app.use("/bookRoute", bookRoute);
app.use("/meditateRoute", meditateRoute);

app.listen(4000, () =>{
    console.log("Server started at 4000");
})