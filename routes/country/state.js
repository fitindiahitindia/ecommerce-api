const express = require("express");
const { getState } = require("../../controller/country/getCountryCtrl");

const stateRouter = express.Router();

stateRouter.route("/").post(getState)

module.exports = stateRouter;