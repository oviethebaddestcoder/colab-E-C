import Artwork from "../models/Auth";

 const createArtwork = async (req, res) => {
    try {
        const { title, description, price, image, category } = req.body;
        const newArtwork = new Artwork({
            title,
            description,
            price,
            image,
            category,
            status: "available",
            seller: req.user.id,
        });
        await newArtwork.save();
        res.status(201).json(newArtwork);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getArtworks = async (req, res) => {
    try {
        const artworks = await Artwork.find({ status: "available" });
        res.json(artworks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};