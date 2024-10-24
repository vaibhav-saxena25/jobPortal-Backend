import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
//imports 

import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors'
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
//file imports 
import authRoutes from './routes/authRoutes.js';
import testRoutes from './routes/testRoutes.js';
import connectDB from './config/db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js'
import jobsRoutes from './routes/jobRoutes.js'

dotenv.config();
connectDB();
//swagger api config
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Job Portal Application",
        description: "Node Expressjs Job Portal Application",
      },
      servers: [
        {
           url: "http://localhost:8080",
             // url: "https://nodejs-job-portal-app.onrender.com"
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const spec = swaggerJSDoc(options);
  
  //rest object
// rest objects
const app = express();

//middlewares
app.use(mongoSanitize());
app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/v1/test',testRoutes);
app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/job',jobsRoutes);

//home route
app.use("/api-doc",swaggerUi.serve,swaggerUi.setup(spec))

//middleware verification
app.use(errorMiddleware)

//port 
const port = process.env.PORT || 8080;

//listen
app.listen(port,()=>{
    console.log(`server is running on port ${port} in ${process.env.DEV_MODE}`.bgCyan.white);
})

