import { Router } from "express";
import authenticateToken from "../../../middlewares/auth.js";
import {
  create,
  destroy,
  update,
  findAll,
  findById,
} from "../controllers/category-controller.js";
import { createSchema, updateSchema } from "../validator/schema.js";
import validate from "../../../middlewares/validate.js";

const router = Router();

router.get("/", findAll);
router.get("/:id", findById);
router.post("/", authenticateToken, validate(createSchema), create);
router.put("/:id", authenticateToken, validate(updateSchema), update);
router.delete("/:id", authenticateToken, destroy);

export default router;
