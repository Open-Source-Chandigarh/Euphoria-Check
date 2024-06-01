const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const sgMail = require("@sendgrid/mail");
const ExpressError = require("./utils/ExpressError.js");

require("dotenv").config();

const API_KEY = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(API_KEY);

const PORT = 3000;
const app = express();
const reciever_email = [];

const verdict = [];

app.use(express.static(__dirname + "/Public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});

app.post("/question", (req, res) => {
  const reciever = req.body.reciever_email;
  reciever_email.push(reciever);
  const language = req.body.selectedLang || "en";
  const questions = require(`./questions_${language}.js`);
  res.render("questions", { questions, language });
});

app.post("/result", async (req, res) => {
  const {
    value0,
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9,
    value10,
    value11,
    value12,
    value13,
    value14,
    value15,
    value16,
    value17,
    value18,
    value19,
  } = req.body;
  const language = req.body.selectedLang || "en";
  let p =
    [value0, value1, value2, value3]
      .map((n) => parseFloat(n))
      .reduce((a, b) => a + b, 0) / 2;
  let e =
    [value4, value5, value6, value7]
      .map((n) => parseFloat(n))
      .reduce((a, b) => a + b, 0) / 2;
  let r =
    [value8, value9, value10, value11]
      .map((n) => parseFloat(n))
      .reduce((a, b) => a + b, 0) / 2;
  let m =
    [value12, value13, value14, value15]
      .map((n) => parseFloat(n))
      .reduce((a, b) => a + b, 0) / 2;
  let a =
    [value16, value17, value18, value19]
      .map((n) => parseFloat(n))
      .reduce((a, b) => a + b, 0) / 2;

  console.log(p, e, r, m, a);
  // let p = (parseFloat(req.body.avalue)+parseFloat(req.body.bvalue)+parseFloat(req.body.cvalue)+parseFloat(req.body.dvalue))/2
  // let e = (parseFloat(req.body.evalue)+parseFloat(req.body.fvalue)+parseFloat(req.body.gvalue)+parseFloat(req.body.hvalue))/2
  // let r = (parseFloat(req.body.ivalue)+parseFloat(req.body.jvalue)+parseFloat(req.body.kvalue)+parseFloat(req.body.lvalue))/2
  // let m = (parseFloat(req.body.mvalue)+parseFloat(req.body.nvalue)+parseFloat(req.body.ovalue)+parseFloat(req.body.pvalue))/2
  // let a = (parseFloat(req.body.qvalue)+parseFloat(req.body.rvalue)+parseFloat(req.body.svalue)+parseFloat(req.body.tvalue))/2

// console.log(req.body.username)
  if(p<e && p<r && p<m && p<a ){
    verdict.push(`Hi ${req.body.username}, I've noticed that you've been experiencing some fluctuations in your positive emotions lately. It's completely normal to have ups and downs, but it's essential to take note of how you're feeling overall. Let's work together to identify activities and practices that bring you joy and help you maintain a positive outlook on life. Remember, small steps can lead to significant changes in your overall well-being.`)
  }
  else if(r<p && r<e && r<m && r<a ){
   verdict.push(`Hello ${req.body.username}, I hope that you have healthy and positive relationships with others. However, nurturing these connections further can be very beneficial for your overall well-being. Let's discuss ways to deepen these relationships, communicate effectively, and build a support system that you can rely on during challenging times. Strong social ties contribute significantly to happiness and resilience.`)
  }
  else if(e<r && e<r && e<m && e<a ){
    verdict.push(`Hey ${req.body.username}, I've observed that you haven't been as engaged and enthusiastic in your daily activities recently. It's crucial to find a sense of flow and fulfillment in what you do. Let's explore your interests and passions, and see how we can incorporate them into your routine. Engaging in activities that resonate with you can boost your energy and motivation, leading to a more satisfying and productive life.`)
  }
  else if(m<r && m<p && m<e && m<a ){
     verdict.push(`Hi ${req.body.username}, It seems like you've been contemplating the bigger picture and searching for a sense of purpose in your life. Finding meaning is a journey that requires self-reflection and exploration of your values and aspirations. Let's work together to uncover your passions and align your actions with what truly matters to you. Discovering your sense of purpose will bring more fulfillment and a greater sense of direction.`)
  }
  else if(a<r && a<p && a<m && a<e ){
     verdict.push(`Hello ${req.body.username}, I want you to know that i believe you've achieved some remarkable things, and your hard work is commendable. However, I also sense that you might be setting high expectations for yourself. It's essential to recognize and celebrate your accomplishments, no matter how small they might seem. We'll work on setting realistic and achievable goals, which will give you a sense of progress and success, boosting your self-confidence and well-being.`)
  }

  if (isNaN(p) || isNaN(e) || isNaN(r) || isNaN(m) || isNaN(a)) {
    res.render("error");
  } else {
    const message = {
      to: reciever_email.pop(),
      from: "aryans12345678@gmail.com",
      subject: "Euphoria Check",
      text: `Here are your PERMA scores\n\nPositive Emotions: ${p} \nEngagement: ${e} \nRelationships: ${r} \nMeaning: ${m} \nAccomplishment: ${a} \n\n ${verdict.slice(
        -1
      )} \n\n Aryan Inguz.`,
    };
    await sgMail
      .send(message)
      .then((response) => console.log("Email sent!"))
      .catch((error) => console.log(error.message));

    res.render("result", {
      pos: p,
      eng: e,
      mea: m,
      rel: r,
      acc: a,
      language,
    });
  }
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server Started Sucessfully");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something Went Wrong" } = err;
  res.render("customError.ejs", { message });
});
