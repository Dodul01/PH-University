import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

async function main() {
  // URI const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@testybyte.8ypqlqr.mongodb.net/?retryWrites=true&w=majority&appName=testyByte`;
  // DB_PASS=testuser
  // DB_USER=testuser
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`Server is running on local host ${config.port}.`);
    });
  } catch (error) {
    console.log(error);
  }
}
main()