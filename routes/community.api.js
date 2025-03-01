const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community.controller");
const authController = require("../controllers/auth.controller"); 

router.post("/", authController.authenticate, communityController.createPost);
router.get("/", communityController.getAllPosts);
router.get("/detail/:postId", communityController.getPostById);
router.put("/:postId", authController.authenticate, communityController.updatePost);
router.delete("/:postId", authController.authenticate, communityController.deletePost);

module.exports = router;