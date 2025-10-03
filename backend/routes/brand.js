import { Router } from "express";
import Brand from "../models/brand.js"
import { isAdmin } from "../middleware/admin.js";
import { verifyToken } from "../utils/jwt.js"

const router = Router();

router.post("/", verifyToken, isAdmin, async (req, res) => {
    try {
       
        const brand = new Brand(req.body);

        await brand.save();
        return res.status(201).json("Brand Created Successfully");
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.get("/view", async (req, res) => {
    try {
        const brand = await Brand.find();
        return res.status(201).json(brand);
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
});

export default router;