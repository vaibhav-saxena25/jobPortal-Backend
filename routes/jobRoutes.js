import express from 'express';
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getAllJobsController, jobStatsController, updateJobController } from '../controllers/jobsController.js';
const router = express.Router();
//routes 
//create jobs routes
router.post('/create-job',userAuth,createJobController)

//get jobs
router.get('/get-job',userAuth,getAllJobsController)
//update jobs routes
router.put('/update-job/:id',userAuth,updateJobController)
//delete JOb 
router.delete('/delete-job/:id',userAuth,deleteJobController)
//Job-stats
router.get('/job-stats',userAuth,jobStatsController)

export default router;  