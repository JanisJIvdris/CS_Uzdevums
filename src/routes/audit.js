const express = require("express");
const router = express.Router();
const AuditController = require("../controllers/auditController");

router.get("/", AuditController.getAudits);

module.exports = router;
