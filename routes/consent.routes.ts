import { Router } from "express";

import { guardianAuth } from "../middleware/guardianAuth.middleware.js";

import { approveConsent, validateConsentRequest } from "../controllers/consent.controller.js";

const router = Router();

router.post("/approve", guardianAuth, approveConsent);
router.get("/:consentRequestId/validate", guardianAuth, validateConsentRequest);

export default router;
