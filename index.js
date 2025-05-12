const express = require("express");
const Alexa = require("ask-sdk-core");
const { ExpressAdapter } = require("ask-sdk-express-adapter");
const {
    LaunchRequestHandler,
  AdmissionProcessIntentHandler,
  CollegeStartDateIntentHandler,
  UniformBooksIntentHandler,
  PaymentMethodsIntentHandler,
  HelpIntentHandler,
  CancelAndStopIntentHandler,
  FallbackIntentHandler,
  SessionEndedRequestHandler,
  IntentReflectorHandler,
  ErrorHandler,
} = require("./handlers");
require('dotenv').config();

const skill = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AdmissionProcessIntentHandler,
    CollegeStartDateIntentHandler,
    UniformBooksIntentHandler,
    PaymentMethodsIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .create();



const app = express();
const adapter = new ExpressAdapter(skill, true, true);

app.post("/", adapter.getRequestHandlers());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Alexa skill running on port ${PORT}`);
});
