import { Router } from "express";
import authenticateToken from "../../../middlewares/auth.js";
import {
  create,
  destroy,
  findAll,
  findByJob,
  findByUser,
  findById,
  update,
} from "../controllers/application-controller.js";
import validate from "../../../middlewares/validate.js";
import { createSchema, updateSchema } from "../validator/schema.js";

const router = Router();

router.get("/", authenticateToken, findAll);
router.get("/:id", authenticateToken, findById);
router.get("/user/:id", authenticateToken, findByUser);
router.get("/job/:id", authenticateToken, findByJob);
router.post("/", authenticateToken, validate(createSchema), create);
router.put("/:id", authenticateToken, validate(updateSchema), update);
router.delete("/:id", authenticateToken, destroy);

export default router;
