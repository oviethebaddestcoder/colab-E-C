import Cart from "../models/Cart";
// Add to Cart
 const addToCart = async (req, res) => {
    try {
        const { artworkId } = req.body;
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({ user: req.user.id, items: [] });
        }
        cart.items.push(artworkId);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
