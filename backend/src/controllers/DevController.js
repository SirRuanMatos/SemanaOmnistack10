const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseString");
const { findConnections, sendMessage } = require("../websocket");

//index = mostrar todos do controller ;

//show = mostrar um único do controller;

//store = armazenar / gravar controller;

//update = atualizar o controller;

//destroy = excluir um controller;

module.exports = {
  async index(req, resp) {
    const devs = await Dev.find();

    return resp.json(devs);
  },

  async store(req, resp) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      console.log(latitude, longitude);

      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      let { name = login, avatar_url, bio } = response.data;

      if (!name) {
        name = response.data.login;
      }

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    //
    return resp.json(dev);
  }
};
