const express = require("express");
const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");
const speakersService = require("../services/SpeakerService");

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get("/", async (req, res) => {
    const artwork = await speakersService.getAllArtwork();
    const topSpeakers = await speakersService.getList();
    res.render("layout", { pageTitle: "welcome", template: "index", topSpeakers, artwork });
    console.log(artwork);
  });

  router.use("/speakers", speakersRoute(params));
  router.use("/feedback", feedbackRoute(params));
  return router;
};
