const  express = require('express')
const cookieParser=require('cookie-parser');



const dotenv = require('dotenv')

dotenv.config()



const app = express()
const port = 3000;
app.use( express.json())
app.use(cookieParser());
const cors = require('cors');


app.use(cors({
  origin: 'http://localhost:5173', // Replace with the URL of your React app
  credentials: true, // Allows credentials (cookies, authorization headers)
}));

const mongoose=require('mongoose')
mongoose.connect("mongodb://0.0.0.0:27017/realestate")
  .then(() => console.log("connection succesfull with MongoDB"))
  .catch((err) => console.log(err));

const authRoute=require('./Route/auth.Route')
const userRoute=require('./Route/user.Route')

console.log(process.env.PORT)


app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);

app.use((err,req,res,next)=>{
const statusCode=err.statusCode || 500
const message=err.message ||"Internal server error occurred"


res.status(statusCode).json({message:message,statusCode:statusCode,succes:true});
})






app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))