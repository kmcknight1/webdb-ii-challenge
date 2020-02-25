const express = require("express");

const db = require("../data/dbconfig");

const router = express.Router();

router.post("/", (req, res) => {
  const car = req.body;

  if (!car.vin || !car.make || !car.model || !car.mileage) {
    return res
      .status(400)
      .json({ message: "must include car vin, make, model, and mileage" });
  }

  db("cars")
    .insert(car)
    .then(ids => {
      const id = ids[0];
      res.status(201).json(id);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .then(car => {
      res.status(200).json(car[0]);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .delete()
    .then(deleted => {
      res.status(200).json({ message: `car with id ${id} was deleted` });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("notes")
    .where({ id })
    .update(changes)
    .then(updated => {
      res.status(200).json({ message: "car updated" });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
