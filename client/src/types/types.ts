export type ItemType = {
  id: string;
  name: string;
  address: string;
  location: string;
  image: string;
  capacity: {
    '18:00': string;
    '18:30': string;
    '19:00': string;
  };
  phone_number: string;
  category: string;
  opening_hours: string;
};
