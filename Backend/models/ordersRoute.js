const express = require('express');
const Order = require('../models/orders'); // Ensure the correct path to the model
const router = express.Router();

// Route to save an order
router.post('/', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).send({ message: 'Order saved successfully', order: newOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).send({ error: 'Failed to save order' });
  }
});
// Route to fetch current orders (orders that are not completed, cancelled, or returned)
router.get('/current', async (req, res) => {
  try {
    const currentOrders = await Order.find({
      // Ensure that at least one item in the order has a status not in 'Completed', 'Cancelled', or 'Returned'
      'orderDetails.items.status': { $in: ['Processing'] },
    });
    res.json(currentOrders);
  } catch (error) {
    console.error('Error fetching current orders:', error);
    res.status(500).send({ error: 'Error fetching current orders', details: error });
  }
});

// Route to fetch order history (orders where all items have status: completed, cancelled, or returned)
router.get('/history', async (req, res) => {
  try {
    const orderHistory = await Order.find({
      // Check if all items in the order have a status of 'Completed', 'Cancelled', or 'Returned'
      'orderDetails.items': {
        $not: {
          $elemMatch: {
            status: { $nin: ['Completed', 'Cancelled', 'Returned'] },
          },
        },
      },
    });
    res.json(orderHistory);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).send({ error: 'Error fetching order history', details: error });
  }
});



module.exports = router;
