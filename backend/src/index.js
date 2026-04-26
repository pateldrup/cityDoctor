const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Database connection logic would go here
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🏥 CityDoctor API active`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
