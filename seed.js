const db = require('./models');

const cityList = [
  {
    name: "San Francisco",
    photo: "https://cdn.aarp.net/content/dam/aarp/travel/destination-guides/2018/04/1140-travel-destination-san-francisco-main-page.imgcache.rev2e8bf9592b441099e8e7efb70e1c1e4b.web.650.370.jpg",
    country: "United States"
  },
  {
    name: "Sydney",
    photo: "https://assets.vancouverisawesome.com/wp-content/uploads/2019/09/25093747/sydney-opera-house.jpg",
    country: "Australia"
  },
  {
    name: "London",
    photo: "https://cdn.londonandpartners.com/visit/london-organisations/houses-of-parliament/63950-640x360-london-icons2-640.jpg",
    country: "United Kingdom"
  },
  {
    name: "Seattle",
    photo: "https://www.citizenm.com/cache/images/seattle_city_image_1200x675-1_004b02a34b02a3.jpg",
    country: "United States"
  },
  {
    name: "Berlin",
    photo: "https://www.ef.co.nz/sitecore/__/~/media/universal/stage/5x2/destinations/de/berlin.jpg",
    country: "Germany"
  },
  {
    name: "Florence",
    photo: "https://plushostels.com/files/firenze/florence_cover_min.jpg",
    country: "Italy"
  },
  {
    name: "Vienna",
    photo: "https://skyticket.com/guide/wp-content/uploads/2017/12/shutterstock_719357683.jpg",
    country: "Austria"
  },
  {
    name: "Hong Kong",
    photo: "https://www.telegraph.co.uk/content/dam/Travel/Destinations/Asia/Hong%20Kong/hong-kong-victoria-peak-pano-guide.jpg?imwidth=450",
    country: "Hong Kong"
  },
  {
    name: "Bangkok",
    photo: "https://www.fodors.com/wp-content/uploads/2019/04/HERO_BangkokTips_Hero_shutterstock_367503629.jpg",
    country: "Thailand"
  },
  {
    name: "Winnipeg",
    photo: "https://www.macleans.ca/wp-content/uploads/2017/04/12.-Winnipeg_Manitoba.jpg",
    country: "Canada"
  }
];

// db.City.deleteMany({}, (err, cities) => {
//   if (err) {
//     return console.log("Error occurred in removing all cities", err);
//   } else {
//     console.log("Succesfully removed all cities from database.");
//     db.City.create(cityList), (err, createdCities) => {
//       if (err) {
//         return console.log("Error occurred in seeding cities", err);
//       };
//       console.log("Successfully seeded cities database.");
//       process.exit();
//     }
//   }
// })

db.City.remove({}, () => {
	cityList.forEach(city => {
		db.City.create(city, (error, createdCity) => {
			if (error) return console.log(error);
			console.log(createdCity);
		});
	});
});