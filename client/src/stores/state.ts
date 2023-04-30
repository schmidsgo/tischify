import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore({
  id: 'booking',
  state: () => ({
    showBookingModal: false,
    booking: {
      name: '',
      people: 0,
      datetime: ''
    }
  }),
  actions: {
    submitBooking(id: string) {
      return axios
        .post('/bookings', {
          id: id,
          name: this.booking.name,
          datetime: this.booking.datetime
        })
        .then(response => {
          this.showBookingModal;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});

export const useRestaurantStore = defineStore({
  id: 'restaurants',
  state: () => ({
    restaurants: []
  }),
  actions: {
    async fetchRestaurants() {
      try {
        const baseUrl = 'https://worldwide-restaurants.p.rapidapi.com/details';
        const response = await axios.get(baseUrl, {
          params: {
            country_id: 'DE',
            language: 'de_DE',
            currency: 'EUR'
          },
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
            'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
          }
        });
        this.restaurants = response.data.results;
        console.log(this.restaurants);
      } catch (err) {
        console.error(err);
      }
    }
  }
});
