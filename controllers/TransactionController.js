import Cart from "../models/Cart";
import Transaction from "../models/Transaction";

const checkout = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    for (let artwork of cart.items) {
      if (artwork.status === "sold") {
        return res
          .status(400)
          .json({ message: `${artwork.title} is already sold` });
      }
      artwork.status = "sold";
      await artwork.save();
      await new Transaction({
        buyer: req.user.id,
        seller: artwork.seller,
        artwork: artwork._id,
        price: artwork.price,
      }).save();
    }
    cart.items = [];
    await cart.save();
    res.json({ message: "Purchase successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View Transaction History
 const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ buyer: req.user.id }, { seller: req.user.id }],
    }).populate("artwork");
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
