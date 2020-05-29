import { connect } from "mongoose";
const userCol = 'userProfileDB'
const URI = `mongodb://127.0.0.1:27017/${userCol}`
const opt = { useNewUrlParser: true, useUnifiedTopology: true };

export default connect(URI,opt).then(() => {
  console.log(`Database is connected  to app 👻 👻 🙍 🙍`);
}).catch((err) => {
  console.log(err);
});