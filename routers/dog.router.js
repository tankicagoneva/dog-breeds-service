const { Router } = require("express");
const router = Router();
const dogService = require("../services/dog.service");

router.get("/", async (req, res) => {
  try {
    const getDog = await dogService.getAll();
    res.json(getDog);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getDogById = await dogService.getById(id);
    res.json(getDogById);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", err });
  }
});

router.post("/", async (req, res) => {
  try {
    const { breeds, heightInCm, imageLink } = req.body;
    if (!breeds || !heightInCm || !imageLink) {
      return res.status(400).json({
        message: "Missing required fields",
        breeds,
        heightInCm,
        imageLink,
      });
    }
    const addDog = await dogService.create({ breeds, heightInCm, imageLink });
    console.log(addDog);
    res.status(200).json(addDog);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error", err });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { breeds, heightInCm, imageLink } = req.body;
    const updateDog = await dogService.update(id, {
      breeds,
      heightInCm,
      imageLink,
    });
    res.status(200).json(updateDog);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteDog = await dogService.deleteById(id);
    res.status(200).json(deleteDog);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
});

module.exports = router;
