import express from 'express';
import controller from '../controller/posts';

const router = express.Router();

router.get("/status",controller.getstatus);
router.get("/characters", controller.getPosts);
router.get("/character/:id", controller.getPost);
router.get("/switch/:id", controller.updatePost);
router.get("/drop/:id", controller.deletePost);


export {router as default};
