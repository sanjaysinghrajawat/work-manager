import mongoose from "mongoose";

const config = {
    isConnected:0,
}

export async function dbConnection() {
    if(config.isConnected)
    {
        return;
    }
    try {
        const  connected  = await mongoose.connect("mongodb+srv://sanjay-user:anP9iQWMWKVwgfUp@cluster0.4uf1hlv.mongodb.net/", { dbName: "work-manager" });
        console.log("DB Connected");
        config.isConnected = connected.readyState;
    }
    catch (error) {
        console.log(error);
    }
}