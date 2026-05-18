import { Router } from "express";
import authenticateToken from "../../../middlewares/auth.js";
import {
  create,
  destroy,
  findAll,
  findById,
} from "../controllers/bookmark-controller.js";

const router = Router();

router.get("/", authenticateToken, findAll);

const jobBookmarkRouter = Router({ mergeParams: true });

jobBookmarkRouter.post("/", authenticateToken, create);
jobBookmarkRouter.delete("/", authenticateToken, destroy);
jobBookmarkRouter.get("/:id", authenticateToken, findById);

export { jobBookmarkRouter };
export default router;
