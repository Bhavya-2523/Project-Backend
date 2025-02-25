console.log("Hello from user file..")
var userName = "ram"
var userAge = "23"
 
const printUserData = (a)=>{
    console.log("print userdata function called from user.js file ....",a)
}

module.exports = {
    userName,userAge,printUserData
}