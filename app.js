// console.log("Hello")
// var user = require ("./user")
// console.log(user)
// console.log(user.userName)
// console.log(user.userAge)
// user.printUserData(100)

// const express = require("express")
// const app = express()

// //http.//localhost:3000/test
// app.get("/test",(req,res)=>{
//     console.log("test api called..")

//     res.send("Hello test api called...")
// })
// app.get("/users",(req,res)=>{
//     res.json({
//     message:("user api called..."),
//     data :["ram","shyam","dhruv"]
// })
// })
// app.get("/employees",(req,res)=>{
//     res.json({
//         EmployeeName:("Ram"),
//         EmployeeAge:("23"),
//         EmployeeId:("215"),
//     message:("employee api called..."),

// })
// })



// //server creation..
// const PORT = 3000
// app.listen(PORT,()=>{
//     console.log("server started on port number",PORT)
// })

const express = require("express");
const app = express();
const PORT = 4000;

app.get("/test", (req, res) => {
  res.json({
    message: "employee",
    data: [
      {
        id: 1,
        name: "harsh",
        salary: 10000,
        email: "harsh@gmail.com",
      },
      {
        id: 2,
        name: "om",
        salary: 20000,
        email: "om@gmail.com",
      },
      {
        id: 3,
        name: "darsahn",
        salary: 5000,
        email: "darshan@gmail.com",
      },
      {
        id: 4,
        name: "dhruv",
        salary: 500000,
        email: "dhruv@gmail.com",
      },
      {
        id: 5,
        name: "bhvya",
        salary: 1000,
        email: "bhvya@gmail.com",
      },
      {
        id: 6,
        name: "mitul",
        salary: 2000,
        email: "mitul@gmail.com",
      },
      {
        id: 7,
        name: "soni",
        salary: 8000,
        email: "soni@gmail.com",
      },
      {
        id: 8,
        name: "ram",
        salary: 70000,
        email: "ram@gmail.com",
      },
      {
        id: 9,
        name: "shyam",
        salary: 3000,
        email: "shyam@gmail.com",
      },
      {
        id: 10,
        name: "lisha",
        salary: 8000,
        email: "lisha@gmail.com",
      },
    ],
  });
});
app.listen(PORT, () => {});