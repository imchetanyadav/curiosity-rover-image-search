const express = require("express");
const next = require("next");
const axios = require("axios");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/getImages", async (req, res) => {
    try {
      if (req.query.camera === "ANY") {
        const response = await axios.get(
          `http://mars-photos.herokuapp.com/api/v1/rovers/Curiosity/photos?sol=${
            req.query.sol
          }`
        );
        res.send(response.data.photos);
      } else {
        const response = await axios.get(
          `http://mars-photos.herokuapp.com/api/v1/rovers/Curiosity/photos?sol=${
            req.query.sol
          }&camera=${req.query.camera}`
        );
        res.send(response.data.photos);
      }
    } catch (e) {
      console.log(e);
      res.send();
    }
  });

  server.get("*", async (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
