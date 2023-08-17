import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import helmet from "helmet";

// What is this?
import session from "express-session";
import logger from "morgan";

import passport from "passport";
import { Strategy } from "passport-twitter";

require("dotenv").config();

const port = process.env.PORT || 3030;
const twitterConsumerKey = process.env.CONSUMER_KEY || "";
const twitterConsumerSecret = process.env.CONSUMER_SECRET || "";

const app: express.Application = express();
app.use(helmet());

// // Enables Parsing Body Requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const whitelistUrls = ["http://localhost:5173"];

// Configure sessions, cors and passport
app.use(logger("dev"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: whitelistUrls,
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
    ],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use(passport.initialize());

passport.use(
  new Strategy(
    {
      consumerKey: twitterConsumerKey,
      consumerSecret: twitterConsumerSecret,
      callbackURL: `http://localhost:3030/twitter/return`,
    },
    (token, tokenSecret, profile, callback) => {
      // Nothing is acc done here
      // return callback(null, profile);
    }
  )
);

passport.serializeUser((user, callback) => {
  callback(null, user);
});

// This isn't set up properly, revise the docs
// passport.deserializeUser((id, callback) => {
//   callback(null, id);
// });

app.get("/health", (_: Request, res: Response) => {
  res.send("Server is up and running");
});

app.get("/login-error", (_: Request, res: Response) => {
  res.send("Twitter Login Failed");
});

// app.get("/sign-in", (_: Request, res: Response) => {
//   res.redirect("http://localhost:4200/sign-in");
// });
// app.get("/home", (_: Request, res: Response) => {
//   res.redirect("http://localhost:4200/home");
// });
// app.get("/", (_: Request, res: Response) => {
//   res.redirect("http://localhost:4200/");
// });

app.get("/twitter", passport.authenticate("twitter"));

app.get(
  "/twitter/return",
  passport.authenticate("twitter", {
    successReturnToOrRedirect: "/health",
    failureRedirect: "/login-error",
  }),
  (_: Request, res: Response) => {
    // Send a message to the client-side code in the popup window
    res.redirect("/health");
  }
);

// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
