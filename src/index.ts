

import express,{
    type Express,
    type Request,
    type Response,
    type NextFunction
}from 'express'

import dotenv from 'dotenv';
import cors from 'cors';

import { connectDB } from './config/db.js';
import authRoute from './routes/auth.route.js';
import deploymentRoute from './routes/deployment.route.js';

// --------------------------------------------------
// 1. Environment configuration
// --------------------------------------------------

dotenv.config();

// process.env.PORT can be string or undefined.
// const PORT: number = process.env.PORT
//     ? Number(process.env.PORT)
//     : 5000;


const PORT:number = process.env.PORT?Number(process.env.PORT):5000;


if(!Number.isInteger(PORT)|| PORT<1 ||PORT > 65535){
    throw new Error(`Invalid port number:${PORT}`)
}
// --------------------------------------------------
// 2. Create Express application
// --------------------------------------------------
const app:Express = express()

// --------------------------------------------------
// 3. Middleware
// --------------------------------------------------

app.use(express.json());
app.use(cors());

// --------------------------------------------------
// 4. Routes
// --------------------------------------------------

app.use('/api/auth', authRoute);
app.use('/api/deployments', deploymentRoute);

// --------------------------------------------------
// 5. Health check route
// --------------------------------------------------

app.get(
    '/health',
    (_req: Request, res: Response): void => {
        res.status(200).json({
            success: true,
            message: 'DevDock server is running'
        });
    }
);

// --------------------------------------------------
// 6. Global error handling middleware
// --------------------------------------------------

// app.use(
//     (
//         error: unknown,
//         _req: Request,
//         res: Response,
//         _next: NextFunction
//     ): void => {

//         console.error('Server error:', error);

//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         });
//     }
// );

app.use(
    (
       error:unknown,
        _req: Request,
        res: Response,
        _next: NextFunction
    ):void => {
       console.error('Server error:', error);

       res.status(500).json({
        success: false,
        message: 'Internal server error'
       })
    }
)

// --------------------------------------------------
// 7. Start server
// --------------------------------------------------

// async function startServer(): Promise<void> {
//     try {

//         // Connect database before starting server.
//         // Uncomment when your DB connection is ready.
//         // await connectDB();

//         const server = app.listen(PORT, (): void => {
//             console.log(`DevDock running on port ${PORT}`);
//         });

//         server.on('error', (error: Error): void => {
//             console.error('HTTP server error:', error);
//             process.exitCode = 1;
//         });

//     } catch (error: unknown) {

//         if (error instanceof Error) {
//             console.error('Failed to start DevDock:', error.message);
//         } else {
//             console.error('Unknown startup error:', error);
//         }

//         process.exitCode = 1;
//     }
// }

async function startServer(): Promise<void> {
    try{
        //await connectDB()
        const server = app.listen(PORT,():void=>{
            console.log(`Devdock running on port ${PORT}`)
        })
        server.on('error',(error:Error):void=>{
            console.error('HTTP server errror',error)
            process.exitCode = 1
        })
    }catch (error:unknown){
        if(error instanceof Error){
            console.log('Failed to start Devdock',error.message);
        }else{
            console.error('Unknown startup error: ', error);
        }
        process.exitCode = 1
    }
}


// Start the application.
void startServer()