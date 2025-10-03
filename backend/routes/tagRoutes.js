import { Router } from "express";
import Tag from "../models/tag.js";
import { isAdmin } from "../middleware/admin.js";
import { verifyToken } from "../utils/jwt.js"

const router = Router();

router.post("/", isAdmin, verifyToken, async (req, res) => {
  try {
    const tag = new Tag({
        name: req.body.name
    });
    await tag.save();
    return res.status(201).json("Tag Create Successfully");
  } catch (error) {
    return  res.status(400).json({ error: error.message });
  }
});

router.get("/view", async (req, res) => {
    try {
        const tag = await Tag.find();
        return res.status(201).json(tag);
    } catch (error) {
       return res.status(400).json({ error : error.message }); 
    }
  
});


export default router;
