const express = require('express')
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app = express()

const db_path = path.join(__dirname,'todoUser.db')
let db = null;
console.log(db_path)

app.use(express.json())
app.use(cors())

const InstalizestheDB = async () => {
   try {
      db = await open({
         filename: db_path,
         driver : sqlite3.Database  
      })
      app.listen(8000, () => {
       console.log("Server Running at http://localhost:8000/");   
      })      
   } catch (error) {
     console.log(`error on ${error.message}`)
     process.exit(1)
   }         
}
InstalizestheDB();


app.get('', (req,res) => {
   res.send('Hello Ramesh Vanaparthi')
})



app.get('/users/' ,async (req,res) => {
   let query = `select * from user;`
   let data = await db.all(query)
   res.send(data)
}) 

app.post('/signup/' , async (req,res) => {
   const { username, name, password } = req.body;
   console.log(username)
   const hashedPassword = await bcrypt.hash(password,10);
   let user_query = `SELECT * FROM user  WHERE username = '${username}'; `
   const user_data = await db.get(user_query);
   console.log(user_data)
   if(user_data === undefined){
     let create_user = `INSERT INTO user 
     (username,name,password)
     values ('${username}','${name}','${hashedPassword}')
    `
    const data = await db.run(create_user)
    const newUserId = data.lastID;
    res.send(`Created new user with ${newUserId}`);
 
   } else {
     res.status(400)
     res.send('User alredy Exist in Db')
   }
 
 })


 app.post('/login/' , async (req,res) => {
   const {username,password} = req.body;
   console.log(username)
 
   let query_user = `SELECT * FROM user  WHERE username = '${username}'; `
   let result = await db.get(query_user);
 
   if ( result === undefined){
     res.status(400)
     res.send('User not Found in Our DB')
   } else {
     //res.send(result)
     const comparePassword = await bcrypt.compare(password,result.password);
     if (comparePassword){
       const payload = {
         username: username,
       };
       const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
       res.send({ jwtToken });
     } else{
       res.send('Invalid Password')
     }
 
   }
   
 })