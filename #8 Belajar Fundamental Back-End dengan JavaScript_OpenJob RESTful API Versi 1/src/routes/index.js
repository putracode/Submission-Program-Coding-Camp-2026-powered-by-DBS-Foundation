import { Router } from "express";
import userRouter from "../services/users/routes/index.js";
import companiesRouter from "../services/companies/routes/index.js";
import authenticationsRouter from "../services/authentications/routes/index.js";
import categoriesRouter from "../services/categories/routes/index.js";
import jobsRouter from "../services/jobs/routes/index.js";
import applicationsRouter from "../services/applications/routes/index.js";
import bookmarksRouter from "../services/bookmarks/routes/index.js";
import profileRouter from "../services/profile/routes/index.js";

const router = Router();

router.use("/users", userRouter);
router.use("/companies", companiesRouter);
router.use("/authentications", authenticationsRouter);
router.use("/categories", categoriesRouter);
router.use("/jobs", jobsRouter);
router.use("/applications", applicationsRouter);
router.use("/bookmarks", bookmarksRouter);
router.use("/profile", profileRouter);

export default router;
