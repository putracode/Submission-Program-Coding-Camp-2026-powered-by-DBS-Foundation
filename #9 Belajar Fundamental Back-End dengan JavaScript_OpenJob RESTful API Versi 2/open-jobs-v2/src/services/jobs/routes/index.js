import { Router } from "express";
import authenticateToken from "../../../middlewares/auth.js";
import { createSchema, updateSchema } from "../validator/schema.js";
import {
  create,
  destroy,
  update,
  findAll,
  findByCategory,
  findByCompany,
  findById,
} from "../controllers/job-controller.js";
import validate from "../../../middlewares/validate.js";
import { jobBookmarkRouter } from "../../bookmarks/routes/index.js";

const router = Router();
router.get("/", findAll);
router.get("/:id", findById);
router.get("/category/:id", findByCategory);
router.get("/company/:id", findByCompany);
router.post("/", authenticateToken, validate(createSchema), create);
router.put("/:id", authenticateToken, validate(updateSchema), update);
router.delete("/:id", authenticateToken, destroy);

router.use("/:jobId/bookmark", jobBookmarkRouter);
export default router;
