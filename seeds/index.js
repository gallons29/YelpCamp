const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //author: '6140a0af20eb6dce18089066', //portatile carletto
            author: '61421b3328b33fe332dee6af', //fisso gallo
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dbyoh8hha/image/upload/v1631803543/YelpCamp/fjf8vzk03frnujt6cq5g.jpg',
                    filename: 'YelpCamp/fjf8vzk03frnujt6cq5g',
                },
                {
                    url: 'https://res.cloudinary.com/dbyoh8hha/image/upload/v1631803547/YelpCamp/pw31xohstm1qp9oiiuzz.jpg',
                    filename: 'YelpCamp/pw31xohstm1qp9oiiuzz',
                }
            ],
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus ex recusandae ipsam maxime architecto mollitia voluptatibus autem quam sequi aliquam!',
            price, //da solo è come se fosse price: price
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})