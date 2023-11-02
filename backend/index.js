const app = require('./app')

// Start the server
app.listen(app.get("port"), () => {
  console.log(`SERVIDOR EN PUERTO: ${app.get("port")}`);
});