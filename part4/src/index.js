const config = require("./utils/config");
const app = require("./app");
const mongoose = require("mongoose");

// this fixes querySrv problem with mongoose
// https://www.mongodb.com/community/forums/t/error-querysrv-econnrefused-mongodb/259042
require("node:dns/promises").setServers(["1.1.1.1"]);

const mongoUrl = config.MONGODB_URL;
mongoose.connect(mongoUrl, { family: 4 });

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
