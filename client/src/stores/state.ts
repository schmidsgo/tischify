import { defineStore } from 'pinia';
import axios from 'axios';

type UserInfo = {
  username: string;
  password: string;
  role: string;
  address?: string;
  opening_hours?: string;
  phone_number?: string;
};

type RestaurantInfo = {
  name: string;
  address: string;
  phone_number: string;
  opening_hours: string;
  people: number;
  datetime: string;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    OpenLoginModal: false,
    currentLoginType: 'login', // 'login' or 'register'
    user: {
      name: '',
      role: '', // 'guest' or 'restaurant',
      address: '',
      phone_number: '',
      opening_hours: ''
    },
    isError: false,
    isLoading: false
  }),
  actions: {
    async register({
      username,
      password,
      role,
      phone_number,
      address,
      opening_hours
    }: UserInfo) {
      try {
        this.isLoading = true;
        const response = await axios.post('http://localhost:3000/register', {
          username,
          password,
          role,
          address,
          phone_number,
          opening_hours
        });
        this.user.name = username;
        this.user.role = role;
        this.user.address = '' ?? address;
        this.user.phone_number = '' ?? phone_number;
        this.user.opening_hours = '' ?? opening_hours;
        console.log('user: ' + this.user.name, this.user.role);
        this.isLoading = false;
        this.OpenLoginModal = false;
      } catch (error) {
        this.isError = true;
      }
    },
    async login({ username, password, role }: UserInfo) {
      try {
        const response = await axios.post('http://localhost:3000/login', {
          username,
          password,
          role
        });
        this.user.name = username;
        this.user.role = role;
        console.log('user: ' + this.user.name, this.user.role);
        this.isLoading = false;
        this.OpenLoginModal = false;
      } catch (error) {
        this.isError = true;
      }
    },
    logout() {
      this.user.name = '';
      this.user.role = '';
      console.log('user: ' + this.user.name, this.user.role);
    }
  }
});

export const useSettingsStore = defineStore('setting', {
  state: () => ({
    restaurant: {
      name: '',
      address: '',
      location: '',
      category: '',
      phone_number: '',
      opening_hours: ''
    },
    people: 0,
    datetime: '',
    isError: false,
    isLoading: false
  }),
  actions: {
    submitSetting({
      name,
      address,
      phone_number,
      opening_hours,
      people,
      datetime
    }: RestaurantInfo) {
      try {
        this.isLoading = true;
        return axios
          .post('http://localhost:3000/settings', {
            name: this.restaurant.name,
            address: this.restaurant.address,
            location: this.restaurant.location,
            phone_number: this.restaurant.phone_number,
            opening_hours: this.restaurant.opening_hours,
            people: this.people,
            datetime: this.datetime
          })
          .then(res => {
            console.log(res.status);
          });
      } catch (error) {
        this.isError = true;
      }
    }
  }
});

export const useBookingStore = defineStore('booking', {
  state: () => ({
    showBookingModal: false,
    booking: {
      name: '',
      email: '',
      people: 0,
      datetime: ''
    }
  }),
  actions: {
    submitBooking(id: string) {
      return axios
        .post('http://localhost:3000/bookings', {
          id: id,
          name: this.booking.name,
          email: this.booking.name,
          people: this.booking.people,
          datetime: this.booking.datetime
        })
        .then(res => {
          this.showBookingModal;
          console.log(res.status);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
