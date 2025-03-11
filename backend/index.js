const app = require('./server');
const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
