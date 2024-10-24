import monogoose from 'mongoose';
import colors from 'colors';

const connectDB = async()=>{
    try{
        const conn = await monogoose.connect(process.env.MONGO_URL);

        console.log(`mongoDb connected ${conn.connection.host}`.bgMagenta.white);

    }catch(err){
        console.log(`error in mongoose connection ${err}`.bgRed.white);

    }
}

export default connectDB;