import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Get projects."})
});

router.post("/",(req, res) => {
  res.status(201).json({ message: "Create project."})
});

router.get("/", (req, res) => {
  res.status(200).json({ message: "Get a single project by _id."})
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: "Upadate project."})
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: "Delete project."})
});

export default router;
