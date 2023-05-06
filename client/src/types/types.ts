export type ItemType = {
  id: string;
  name: string;
  location: string;
  image: string;
  capacity: {
    '18:00': string;
    '18:30': string;
    '19:00': string;
  };
  telefon: string;
  category: string;
};
