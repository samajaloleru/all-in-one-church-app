// data/hymns.ts

import { HymnCategory, Hymn } from "@/types/hymn";

export const hymnCategories: HymnCategory[] = [
  { id: 1, title: "Processional Hymn", range: "1-1" },
  { id: 2, title: "Lightning the candles", range: "2-2" },
  { id: 3, title: "Kneeling Down", range: "3-4" },
  { id: 4, title: "Forgiveness And Repentance", range: "5-50" },
  { id: 5, title: "Services", range: "51-125" },
  { id: 6, title: "Palm Sunday", range: "126-150" },
  { id: 7, title: "Mercy and Passion Week", range: "151-175" },
  { id: 8, title: "Easter", range: "176-200" },
  { id: 9, title: "God Glory and Ascension", range: "201-225" },
  { id: 10, title: "Holy Spirit", range: "226-250" },
  { id: 11, title: "Spiritual Power", range: "251-275" },
  { id: 12, title: "Good News", range: "276-300" },
  { id: 13, title: "Praise", range: "301-325" },
  { id: 14, title: "Glory", range: "326-350" },
  { id: 15, title: "Joy", range: "351-375" },
  { id: 16, title: "Thanksgiving", range: "376-400" },
  { id: 17, title: "Blessing", range: "401-425" },
  { id: 18, title: "Harvest", range: "426-450" },
  { id: 19, title: "Victory", range: "451-485" },
  { id: 20, title: "Healing", range: "486-500" },
  { id: 21, title: "Baptism", range: "501-520" },
  { id: 22, title: "Faith", range: "521-550" },
  { id: 23, title: "Judgement", range: "551-570" },
  { id: 24, title: "The Coming of Christ", range: "571-600" },
  { id: 25, title: "God's Work", range: "601-630" },
  { id: 26, title: "Warning", range: "631-645" },
  { id: 27, title: "Burial And Remembrance", range: "646-665" },
  { id: 28, title: "Call To Heaven", range: "666-675" },
  { id: 29, title: "Divine Call", range: "676-690" },
  { id: 30, title: "Heavenly Call", range: "691-700" },
  { id: 31, title: "Revelation", range: "701-725" },
  { id: 32, title: "Sanctification", range: "726-730" },
  { id: 33, title: "House Opening", range: "731-735" },
  { id: 34, title: "Divine Love", range: "736-760" },
  { id: 35, title: "Holy Re-Union", range: "761-770" },
  { id: 36, title: "Holy Communion", range: "771-780" },
  { id: 37, title: "Wedding", range: "781-790" },
  { id: 38, title: "Prayers", range: "791-800" },
  { id: 39, title: "Protection And Journey", range: "801-825" },
  { id: 40, title: "Children", range: "826-850" },
  { id: 41, title: "Birth Of Christ", range: "851-875" },
  { id: 42, title: "Seeking Favour From God", range: "876-900" },
  { id: 43, title: "Promise", range: "901-906" },
  { id: 48, title: "Praise And Worship", range: "907-978" },
];

export const hymns: Hymn[] = [
  {
    id: 1,
    number: 1,
    title: "Jerih moh Yah mah",
    lyrics: [
      {
        verseNumber: 1,
        lines: [
          "Jerih moh Yah mah",
          "Jerih moh Yah mah",
          "The host of Angels full of joy in heaven,",
          "The host of Angels,",
          "The host of Angels",
          "They are praising God with joyful songs in heaven.",
        ]
      },
    ],
    category: "Processional Hymn"
  },
  {
    id: 2,
    number: 2,
    title: "Yah rah Sarah",
    lyrics: [
      {
        verseNumber: 1,
        lines: [
          "Yah rah Sarah,",
          "Yah rah Samahtah,",
          "Yah rah Sarah,",
          "Yah rah Samahtah,",
          "Kindle the light",
          "Divine from heaven above.",
          "Kindle the light",
          "Divine from heaven above.",
        ]
      },
    ],
    category: "Lightning the candles"
  },
  {
    id: 3,
    number: 3,
    title: "Yah rah man",
    lyrics: [
      {
        verseNumber: 1,
        lines: [
          "Yah rah man,",
          "Hi, Yah rah man,",
          "Yah rah man, Yahman,,",
          "Yah rah man,",
          "Oh come unto the Lord",
          "Oh come unto the Lord.",
        ]
      },
    ],
    category: "Kneeling Down"
  },
  {
    id: 4,
    number: 4,
    title: "Oh Christ Oh my King",
    lyrics: [
      {
        verseNumber: 1,
        lines: [
          "Oh Christ Oh my King,",
          "I will worship Thee,",
          "My power and shining light",
          "Holy thou Holiest",
        ]
      },
    ],
    category: "Kneeling Down"
  },
  {
    id: 126,
    number: 126,
    title: "Rejoice, rejoice, chant ye, rejoice to Thy Saviour",
    lyrics: [],
    category: "Palm Sunday"
  },
  {
    id: 126,
    number: 126,
    title: "Rejoice, rejoice, chant ye, rejoice to Thy Saviour",
    lyrics: [],
    category: "Palm Sunday"
  },
  {
    id: 127,
    number: 127,
    title: "Jesus Christ rides on the ass",
    lyrics: [],
    category: "Palm Sunday"
  },
  {
    id: 128,
    number: 128,
    title: "Brethren, o come with me",
    lyrics: [],
    category: "Palm Sunday"
  },
  {
    id: 129,
    number: 129,
    title: "Hosanna from heaven above",
    lyrics: [],
    category: "Palm Sunday"
  },
  {
    id: 130,
    number: 130,
    title: "Hos-anna, Hos-anna, Hosanna",
    lyrics: [],
    category: "Palm Sunday"
  },
  {
    id: 131,
    number: 131,
    title: "All ye the world, exalt Jesus",
    lyrics: [],
    category: "Palm Sunday"
  },
  {
    id: 132,
    number: 132,
    title: "Hosanna, Hosanna",
    lyrics: [],
    category: "Palm Sunday"
  },
  {
    id: 133,
    number: 133,
    title: "Join me in giving thanks to",
    lyrics: [],
    category: "Palm Sunday"
  },
  
];