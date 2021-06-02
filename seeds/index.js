const mongoose = require("mongoose");
const cities = require("./cities");
const Campground = require("../models/campground");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const randomidx = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 5;
    const camp = new Campground({
      location: `${cities[randomidx].city}, ${cities[randomidx].state}`,
      // the default author is your user id
      author: "60aff0a9f7578e2f002f144f",
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti, nobis praesentium! Ab corporis aliquam odio modi fugiat pariatur incidunt quo quisquam, rerum molestiae veniam eos accusantium consequuntur officia cum doloribus.",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [cities[randomidx].longitude, cities[randomidx].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dsnehhea5/image/upload/v1622654158/YelpCamp/photo-1466133633688-187f0b492390_sgve3j.jpg",
          filename: "YelpCamp/photo-1466133633688-187f0b492390_sgve3j",
        },
        {
          url: "https://res.cloudinary.com/dsnehhea5/image/upload/v1622654158/YelpCamp/photo-1587000458481-56d092a79282_zol9yt.jpg",
          filename: "YelpCamp/photo-1587000458481-56d092a79282_zol9yt",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
