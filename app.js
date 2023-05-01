const express = require('express');
const app = express()
const port = process.env.port || 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");
const path = require("path")

app.use(cors());
require("./models/model.js");
require("./models/post.js")
app.use(express.json());
app.use(require("./routes/auth.js"));

app.use(require("./routes/createPost.js"));
app.use(require("./routes/user.js"));



mongoose.set('strictQuery',true);
// mongoose.connect(mongoUrl).then(() =>(console.log('connnected to db'))
// .catch((e) =>console.log(e))

mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {

  console.log("successfully connected to mongodb");
});



mongoose.connection.on("error", () => {
  console.log("Not connected to mongodb");
});

//serving the frontend
app.use(express.static(path.join(__dirname, "./frontend/build")))

app.get("*", (req, res) => {
    res.sendFile(
        path.join(__dirname, "./frontend/build/index.html"),
        function (err) {
            res.status(500).send(err)
        }
    )
})
app.listen(port, () => {
  console.log("server is running on port  " + port);
});
