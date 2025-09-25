import express from 'express';
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js"
import cors from 'cors';
import adminRouter from "./routes/admin.route.js"
import doctorRouter from "./routes/doctor.route.js"

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json())

const port = process.env.PORT;

// user routes
app.use('/api/user', userRouter)

// admin routes
app.use("/api/admin", adminRouter)

//doctor routes
app.use("/api/doctor", doctorRouter)

app.listen(port, ()=> {
    console.log(`app is listening on port ${port}`)
})