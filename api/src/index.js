import app from './app.js';  
import { connectToDatabase } from './db/connections.js';

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to database: ', error);
  });