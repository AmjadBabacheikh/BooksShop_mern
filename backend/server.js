import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bookRoutes from './routes/bookRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

connectDB();

//apply middleware
app.use(express.json());
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

const Port = process.env.PORT || 5000;

app.listen(Port, (err) => {
  if (err) {
    console.error('erreur is ' + err);
  } else {
    console.log(`sercer starting at port ${Port}`);
  }
});
