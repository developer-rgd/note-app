import { Router } from "express";
import * as controller from "./controller.js";

const router = Router();

router.post("/", controller.add_note);
router.get("/", controller.view_notes);
router.get("/:_id", controller.view_note);
router.put("/:_id", controller.update_note);
router.delete("/:_id", controller.delete_note);

export default router;
