const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const FeedbackService = require("./services/FeedbackService");
const SpeakersService = require("./services/SpeakerService");

const feedbackService = new FeedbackService("./data/feedback.json");
const speakersService = new SpeakersService("./data/speakers.json");

const routes = require("./routes");
// const { nextTick } = require("process");
const app = express();

const port = 3000;
//cookie track
app.set("trust proxy", 1);

app.use(
  cookieSession({
    name: "session",
    keys: ["doweweorw", "sereoouo"],
  })
);

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "./views"));

app.locals.siteName = "Roux MEETUPS";

app.use(express.static(path.join(__dirname, "./static")));

app.use(async (req, res, next) => {
  try {
    const names = await speakersService.getNames();
    res.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.use("/", routes({ feedbackService, speakersService }));

app.listen(port, () => {
  console.log(`express server listen port ${port}`);
});
