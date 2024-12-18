import mongoose from "mongoose";

main().catch(err => console.log(err));

export async function main() {

  try {
    await mongoose.connect(`${process.env.DB_STRING}`);
    console.log('database connected');
  } catch(error: any) {
    console.log(`oops! an error ocurred: ${error.message}`);
  }
}