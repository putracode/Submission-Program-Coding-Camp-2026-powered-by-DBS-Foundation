import { Router } from "express";
import authenticateToken from "../../../middlewares/auth.js";
import { findApplications, findBookmarks, findProfile } from "../controllers/profile-controller.js";

const router = Router();

router.get("/", authenticateToken, findProfile);
router.get("/applications", authenticateToken, findApplications);
router.get("/bookmarks", authenticateToken, findBookmarks);

export default router;
