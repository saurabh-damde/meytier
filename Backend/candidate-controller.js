const db = require("./db");

exports.getCandidates = (req, res, nxt) => {
  db.query("SELECT * FROM candidate")
    .then((result) => {
      if (result.rowCount === 0) {
        throw new Error("No data found!");
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "No data found!",
        error: err,
      });
    });
};

exports.getCandidate = (req, res, nxt) => {
  const { id } = req.params;
  db.query(`SELECT * FROM candidate WHERE id = $1`, [id])
    .then((result) => {
      if (result.rowCount === 0) {
        throw new Error("No data found!");
      } else {
        res.status(200).json(result.rows);
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: `No data found for ID : ${id}`,
        error: err,
      });
    });
};

exports.addCandidate = (req, res, nxt) => {
  const { name, address, age, phone } = req.body;
  db.query(
    "INSERT INTO candidate (name, address, age, phone) VALUES ($1, $2, $3, $4)",
    [name, address, age, phone]
  )
    .then((result) => {
      if (result.rowCount === 0) {
        throw new Error("Couldn't add the candidate!");
      } else {
        res.status(201).json({
          message: "Candidate added successfully!",
          result: result.rows,
        });
      }
      console.log(result);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Couldn't add the candidate!",
        error: err,
      });
    });
};

exports.updateCandidate = (req, res, nxt) => {
  const { id } = req.params;
  const { name, address, age, phone } = req.body;
  db.query(
    "UPDATE candidate SET name = $1, address = $2, age = $3, phone = $4 WHERE id = $5",
    [name, address, age, phone, id]
  )
    .then((result) => {
      if (result.rowCount === 0) {
        throw new Error("Couldn't update the candidate!");
      } else {
        res.status(200).json({
          message: "Candidate updated successfully!",
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "Couldn't update the Candidate",
        error: err,
      });
    });
};

exports.deleteCandidate = (req, res, nxt) => {
  const { id } = req.params;
  db.query("DELETE FROM candidate WHERE id = $1", [id])
    .then((result) => {
      if (result.rowCount === 0) {
        throw new Error("Couldn't delete the candidate!");
      } else {
        res.status(201).json({
          message: "Candidate deleted successfully!",
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: "Couldn't delete the candidate!",
        error: err,
      });
    });
};
