const {DB_URL} =require("../config");
const mongooose=require("mongoose");

const LocalDB_URL='mongodb://127.0.0.1:27017/CRM'

mongooose.set("strictQuery",true);
(function(){
    mongooose.connect(LocalDB_URL);
    const db=mongooose.connection;
    db.on("error",()=>{console.log("error");})
    db.once("open",()=>{console.log("DataBase connected");})
})();