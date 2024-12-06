const MongoClient = require('mongodb').MongoClient;
const connStr = 
client = new MongoClient(connStr);
async function findit() {
    try {
        await client.connect();
        var dbo = client.db("library");
        var coll = dbo.collection('books');

        theQuery = {author:"Stephen King"}
        await coll.find(theQuery,{title:1}).toArray(
            async function(err,items){
                if(err) {
                    console.log("Error: " + err);
                } else {
                    console.long("Items: ");
                    await items.forEach(function(item) {
                        console.log(item.title + 'by' + item.author);
                    })
                }
                client.close();
            }
        )

        
    }
    catch(err) {
        console.long("Database error: " + err);
    }
}
