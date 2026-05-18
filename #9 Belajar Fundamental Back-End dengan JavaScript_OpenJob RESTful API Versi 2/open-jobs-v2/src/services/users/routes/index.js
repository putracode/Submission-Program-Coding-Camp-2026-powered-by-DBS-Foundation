import { Router } from "express";
import { create, findById } from "../controllers/user-controller.js";
import validate from "../../../middlewares/validate.js";
import { createSchema } from "../validator/schema.js";
import authenticateToken from "../../../middlewares/auth.js";

const router = Router();

router.post("/", validate(createSchema), create);
router.get("/:id", findById);

export default router;
