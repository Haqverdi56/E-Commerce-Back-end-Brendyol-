const Rating = require('../models/RateModel');


const ratingController = {
    getRates: async (req, res) => {
        try {
        const users = await Rating.find().exec();
        res.json(users);
        } catch (err) {
        res.status(500).json({ message: err.message });
        }
    },
    createRate: async (req, res) => {
        console.log(req.body);
        const rating = new Rating({
            productId: req.body.productId,
            userId: req.body.userId,
            rating: req.body.rating,
            comment: req.body.comment
        });
        
        try {
            const newRating = await rating.save();
            res.status(201).json(newRating);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
}

module.exports = {
    ratingController
}
