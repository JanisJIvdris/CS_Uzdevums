const { Audit } = require("../models");
const { Op } = require("sequelize");

exports.getAudits = async (req, res) => {
  const { from, to } = req.query;
  let query = {};
  if (from || to) {
    query.timestamp = {};
    if (from) query.timestamp[Op.gte] = new Date(from);
    if (to) query.timestamp[Op.lte] = new Date(to);
  }
  try {
    const audits = await Audit.findAll({
      where: query,
      limit: 10,
      order: [["timestamp", "DESC"]],
    });
    res.json(audits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
