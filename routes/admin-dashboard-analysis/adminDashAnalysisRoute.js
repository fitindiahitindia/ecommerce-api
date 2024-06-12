const express = require("express");
const { getAdminDashboardAnlaysis } = require("../../controller/admin-dashboard-analysis/adminDashAnlaysisCtrl");
const isAuthenticatedAdmin = require("../../middlewares/isAuthenticatedAdmin");
const Admins = require("../../model/auth/Admin");
const isAdmin = require("../../middlewares/isAdmin");

const adminDashAnalysisRouter = express.Router();

adminDashAnalysisRouter.get("/",isAuthenticatedAdmin(Admins),isAdmin, getAdminDashboardAnlaysis);

module.exports = adminDashAnalysisRouter;
 