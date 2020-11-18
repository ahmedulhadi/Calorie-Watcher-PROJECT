const db = require("../services/database");

console.log(">>>>>>>> Database:  calorie_watcher.db <<<<<<<<<");
db.serialize(() => {
  console.log("cleaning users table");
  db.run("DELETE FROM users WHERE TRUE");
  console.log("cleaning personal_details table");
  db.run("DELETE FROM personal_details WHERE TRUE");
  console.log("cleaning weight_log table");
  db.run("DELETE FROM weight_log WHERE TRUE");
});
