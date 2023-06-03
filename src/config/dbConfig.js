const mongoose = require("mongoose")
const username = "hiba99"
const password = "marwa2020"
const databaseName = "dht11"
function connect() {
    mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.ji3zoyq.mongodb.net/${databaseName}?retryWrites=true&w=majority`)
    .then(()=>
    {
        console.log("database connected")
    })
    .catch((e)=>
    {
        console.log("something happenned")
        console.log(e)
    })
}
module.exports=connect