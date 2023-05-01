const getRestaurants = (request, response) => {
    response.status(200);
    response.json([
        {
            "id": "rest0",
            "name": "Restaurant 1",
            "location": "Augsburg",
            "image": "/rest1.jpeg",
            "capacity": { "18:00": "\u25cb", "18:30": "\u25b3", "19:00": "\u25b3" },
            "telefon": "+49 7175970",
            "category": "restaurant"
        },
        {
            "id": "rest1",
            "name": "Restaurant 2",
            "location": "Bremen",
            "image": "/rest1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25ce", "19:00": "\u25ce" },
            "telefon": "+49 4086773",
            "category": "restaurant"
        },
          {
            "id": "rest2",
            "name": "Restaurant 3",
            "location": "Düsseldorf",
            "image": "/rest1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25ce", "19:00": "\u25b3" },
            "telefon": "+49 4716940",
            "category": "restaurant"
          },
          {
            "id": "rest3",
            "name": "Restaurant 4",
            "location": "Düsseldorf",
            "image": "/rest1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25b3", "19:00": "\u25ce" },
            "telefon": "+49 5819124",
            "category": "restaurant"
          },
          {
            "id": "rest4",
            "name": "Restaurant 5",
            "location": "Hamburg",
            "image": "/rest1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25b3" },
            "telefon": "+49 1391914",
            "category": "restaurant"
          },
          {
            "id": "rest5",
            "name": "Restaurant 6",
            "location": "Hamburg",
            "image": "/rest1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25ce", "19:00": "\u25b3" },
            "telefon": "+49 3425110",
            "category": "restaurant"
          },
          {
            "id": "rest6",
            "name": "Restaurant 7",
            "location": "Berlin",
            "image": "/rest1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25b3", "19:00": "\u25b3" },
            "telefon": "+49 3276060",
            "category": "restaurant"
          },
          {
            "id": "rest7",
            "name": "Restaurant 8",
            "location": "Frankfurt",
            "image": "/rest1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25cb" },
            "telefon": "+49 7613074",
            "category": "restaurant"
          },
          {
            "id": "rest8",
            "name": "Restaurant 9",
            "location": "Cologne",
            "image": "/rest1.jpeg",
            "capacity": { "18:00": "\u25cb", "18:30": "\u25ce", "19:00": "\u25ce" },
            "telefon": "+49 1029203",
            "category": "restaurant"
          },
          {
            "id": "rest9",
            "name": "Restaurant 10",
            "location": "Cologne",
            "image": "/rest1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25cb" },
            "telefon": "+49 2258903",
            "category": "restaurant"
          },
          {
            "id": "cafe0",
            "name": "Cafe 1",
            "location": "Munich",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25cb", "18:30": "\u25b3", "19:00": "\u25b3" },
            "telefon": "+49 5517797",
            "category": "cafe"
          },
          {
            "id": "cafe1",
            "name": "Cafe 2",
            "location": "Bremen",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25ce", "19:00": "\u25cb" },
            "telefon": "+49 6714519",
            "category": "cafe"
          },
          {
            "id": "cafe2",
            "name": "Cafe 3",
            "location": "Munich",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25cb", "19:00": "\u25ce" },
            "telefon": "+49 2091517",
            "category": "cafe"
          },
          {
            "id": "cafe3",
            "name": "Cafe 4",
            "location": "Bremen",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25cb", "18:30": "\u25b3", "19:00": "\u25ce" },
            "telefon": "+49 7068566",
            "category": "cafe"
          },
          {
            "id": "cafe4",
            "name": "Cafe 5",
            "location": "Augsburg",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25ce", "19:00": "\u25b3" },
            "telefon": "+49 3170071",
            "category": "cafe"
          },
          {
            "id": "cafe5",
            "name": "Cafe 6",
            "location": "Cologne",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25cb", "18:30": "\u25ce", "19:00": "\u25cb" },
            "telefon": "+49 2364580",
            "category": "cafe"
          },
          {
            "id": "cafe6",
            "name": "Cafe 7",
            "location": "Augsburg",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25b3", "19:00": "\u25ce" },
            "telefon": "+49 9473491",
            "category": "cafe"
          },
          {
            "id": "cafe7",
            "name": "Cafe 8",
            "location": "Berlin",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25ce", "19:00": "\u25ce" },
            "telefon": "+49 6507533",
            "category": "cafe"
          },
          {
            "id": "cafe8",
            "name": "Cafe 9",
            "location": "Augsburg",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25ce", "19:00": "\u25cb" },
            "telefon": "+49 2203544",
            "category": "cafe"
          },
          {
            "id": "cafe9",
            "name": "Cafe 10",
            "location": "Augsburg",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25b3" },
            "telefon": "+49 2092550",
            "category": "cafe"
          },
          {
            "id": "cafe10",
            "name": "Cafe 11",
            "location": "Düsseldorf",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25cb", "18:30": "\u25cb", "19:00": "\u25cb" },
            "telefon": "+49 9818976",
            "category": "cafe"
          },
          {
            "id": "cafe11",
            "name": "Cafe 12",
            "location": "Dortmund",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25cb", "19:00": "\u25b3" },
            "telefon": "+49 3828628",
            "category": "cafe"
          },
          {
            "id": "cafe12",
            "name": "Cafe 13",
            "location": "Dortmund",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25cb", "19:00": "\u25ce" },
            "telefon": "+49 4295601",
            "category": "cafe"
          },
          {
            "id": "cafe13",
            "name": "Cafe 14",
            "location": "Düsseldorf",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25ce", "19:00": "\u25b3" },
            "telefon": "+49 8207600",
            "category": "cafe"
          },
          {
            "id": "cafe14",
            "name": "Cafe 15",
            "location": "Augsburg",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25ce", "19:00": "\u25cb" },
            "telefon": "+49 6158216",
            "category": "cafe"
          },
          {
            "id": "cafe15",
            "name": "Cafe 16",
            "location": "Stuttgart",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25cb", "18:30": "\u25ce", "19:00": "\u25b3" },
            "telefon": "+49 4364818",
            "category": "cafe"
          },
          {
            "id": "cafe16",
            "name": "Cafe 17",
            "location": "Dortmund",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25ce", "19:00": "\u25b3" },
            "telefon": "+49 1982356",
            "category": "cafe"
          },
          {
            "id": "cafe17",
            "name": "Cafe 18",
            "location": "Düsseldorf",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25cb" },
            "telefon": "+49 1557909",
            "category": "cafe"
          },
          {
            "id": "cafe18",
            "name": "Cafe 19",
            "location": "Düsseldorf",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25cb", "18:30": "\u25b3", "19:00": "\u25ce" },
            "telefon": "+49 3995804",
            "category": "cafe"
          },
          {
            "id": "cafe19",
            "name": "Cafe 20",
            "location": "Berlin",
            "image": "/cafe1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25cb" },
            "telefon": "+49 1841096",
            "category": "cafe"
          },
          {
            "id": "bar0",
            "name": "Bar 1",
            "location": "Frankfurt",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25ce", "19:00": "\u25b3" },
            "telefon": "+49 3502210",
            "category": "bar"
          },
          {
            "id": "bar1",
            "name": "Bar 2",
            "location": "Augsburg",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25cb", "18:30": "\u25cb", "19:00": "\u25ce" },
            "telefon": "+49 6616594",
            "category": "bar"
          },
          {
            "id": "bar2",
            "name": "Bar 3",
            "location": "Düsseldorf",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25ce", "19:00": "\u25cb" },
            "telefon": "+49 1909793",
            "category": "bar"
          },
          {
            "id": "bar3",
            "name": "Bar 4",
            "location": "Augsburg",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25ce", "19:00": "\u25b3" },
            "telefon": "+49 1633363",
            "category": "bar"
          },
          {
            "id": "bar4",
            "name": "Bar 5",
            "location": "Munich",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25cb", "19:00": "\u25ce" },
            "telefon": "+49 5794668",
            "category": "bar"
          },
          {
            "id": "bar5",
            "name": "Bar 6",
            "location": "Berlin",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25ce", "19:00": "\u25ce" },
            "telefon": "+49 2252617",
            "category": "bar"
          },
          {
            "id": "bar6",
            "name": "Bar 7",
            "location": "Bremen",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25ce", "19:00": "\u25ce" },
            "telefon": "+49 3327319",
            "category": "bar"
          },
          {
            "id": "bar7",
            "name": "Bar 8",
            "location": "Augsburg",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25ce", "19:00": "\u25b3" },
            "telefon": "+49 5785655",
            "category": "bar"
          },
          {
            "id": "bar8",
            "name": "Bar 9",
            "location": "Augsburg",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25ce" },
            "telefon": "+49 9957147",
            "category": "bar"
          },
          {
            "id": "bar9",
            "name": "Bar 10",
            "location": "Munich",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25ce", "19:00": "\u25b3" },
            "telefon": "+49 5820440",
            "category": "bar"
          },
          {
            "id": "bar10",
            "name": "Bar 11",
            "location": "Düsseldorf",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25ce" },
            "telefon": "+49 2607843",
            "category": "bar"
          },
          {
            "id": "bar11",
            "name": "Bar 12",
            "location": "Cologne",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25cb", "19:00": "\u25cb" },
            "telefon": "+49 9035587",
            "category": "bar"
          },
          {
            "id": "bar12",
            "name": "Bar 13",
            "location": "Berlin",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25b3" },
            "telefon": "+49 4580660",
            "category": "bar"
          },
          {
            "id": "bar13",
            "name": "Bar 14",
            "location": "Augsburg",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25ce", "19:00": "\u25ce" },
            "telefon": "+49 9498118",
            "category": "bar"
          },
          {
            "id": "bar14",
            "name": "Bar 15",
            "location": "Cologne",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25cb" },
            "telefon": "+49 7561349",
            "category": "bar"
          },
          {
            "id": "bar15",
            "name": "Bar 16",
            "location": "Frankfurt",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25ce", "19:00": "\u25b3" },
            "telefon": "+49 8212143",
            "category": "bar"
          },
          {
            "id": "bar16",
            "name": "Bar 17",
            "location": "Frankfurt",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25cb", "19:00": "\u25ce" },
            "telefon": "+49 3766553",
            "category": "bar"
          },
          {
            "id": "bar17",
            "name": "Bar 18",
            "location": "Bremen",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25ce" },
            "telefon": "+49 5513297",
            "category": "bar"
          },
          {
            "id": "bar18",
            "name": "Bar 19",
            "location": "Berlin",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25b3", "18:30": "\u25b3", "19:00": "\u25cb" },
            "telefon": "+49 6030867",
            "category": "bar"
          },
          {
            "id": "bar19",
            "name": "Bar 20",
            "location": "Cologne",
            "image": "/bar1.jpeg",
            "capacity": { "18:00": "\u25ce", "18:30": "\u25b3", "19:00": "\u25ce" },
            "telefon": "+49 2640892",
            "category": "bar"
          }
        ])
}

module.exports = {
    getRestaurants
} 