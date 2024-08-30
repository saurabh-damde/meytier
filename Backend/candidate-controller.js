const db = require("./db");

exports.getCandidates = (req, res, nxt) => {
  db.query("SELECT id, info FROM candidate")
    .then((result) => {
      if (result.rowCount === 0) {
        throw new Error("No data found!");
      } else {
        const data = result.rows.map((row) => {
          return { ...row.info, id: row.id };
        });
        res.status(200).json(data);
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
  db.query(`SELECT id, info FROM candidate WHERE id = $1`, [id])
    .then((result) => {
      if (result.rowCount === 0) {
        throw new Error("No data found!");
      } else {
        const data = result.rows.map((row) => {
          return { ...row.info, id: row.id };
        })[0];
        res.status(200).json(data);
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
  const data = req.body;
  db.query("INSERT INTO candidate (info) VALUES ($1)", [data])
    .then((result) => {
      if (result.rowCount === 0) {
        throw new Error("Couldn't add the candidate!");
      } else {
        res.status(201).json({
          message: "Candidate added successfully!",
          result: result.rows[0],
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
  const data = req.body;
  db.query("UPDATE candidate SET info = $1 WHERE id = $2", [data, id])
    .then((result) => {
      if (result.rowCount === 0) {
        throw new Error("Couldn't update the candidate!");
      } else {
        res.status(200).json({
          message: "Candidate updated successfully!",
          result: result.rows[0],
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
          result: result.rows[0],
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
