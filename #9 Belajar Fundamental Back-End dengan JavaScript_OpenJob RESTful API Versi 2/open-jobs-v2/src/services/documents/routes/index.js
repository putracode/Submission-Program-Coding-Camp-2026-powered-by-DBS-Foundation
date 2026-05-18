import { Router } from "express";
import authenticateToken from "../../../middlewares/auth.js";
import { upload } from "../storage/storage-config.js";
import { destroy, findAll, findById, uploadDocuments } from "../controllers/document-controller.js";

const router = Router();



router.post("/",authenticateToken, upload.single("document"), uploadDocuments);
router.get("/", findAll);
router.get("/:id", findById);
router.delete("/:id",authenticateToken, destroy);

export default router;
