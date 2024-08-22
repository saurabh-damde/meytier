const express = require("express");

const {
  getCandidates,
  getCandidate,
  addCandidate,
  updateCandidate,
  deleteCandidate,
} = require("./candidate-controller");

const router = express.Router();

router.get("", getCandidates);

router.get("/:id", getCandidate);

router.post("", addCandidate);

router.put("/:id", updateCandidate);

router.delete("/:id", deleteCandidate);

module.exports = router;
