const express = require("express");
const rootRouter = require("./router/index.js");
var cors = require('cors')

const PORT = 3000;

const app = express();

// using cors to make backend listen req from our frontend.
// app.use(cors ({
//     origin: 'http://localhost:5173',
//     optionsSuccessStatus: 200 
//   }));

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(PORT, function() {
    console.log("Listening on Port: " + PORT)
});
