const express = require("express");
const { getCountry } = require("../../controller/country/getCountryCtrl");

const countryRouter  = express.Router();

countryRouter.route("/").get(getCountry);

module.exports = countryRouter;