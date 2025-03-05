
import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:
    true },
   items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artwork' }]
    });


    const Cart = mongoose.models('Cart', CartSchema);

export default Cart;