const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
//const errroMiddelware=require('./Middlerwares/errorMiddleware');
const mongoose=require('mongoose');
const app = require('./app');
const {Hr} = require('./Model/emModel');
//const morgan = require('morgan');
//console.log(app.get('env'));
// console.log("what is env :  "+process.env);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('server has started...');
});
// if(process.env.NODE_ENV === 'development'){
//     app.use(morgan('dev'))
// }
//connecting database
mongoose.connect(process.env.CON_STR,{
    useNewUrlParser:true
}).then( async (conn)=>{
    //console.log(conn);
    console.log("Successfully Conected");
    
}).catch((error)=>{
    console.log("Some error occured"); 
});

