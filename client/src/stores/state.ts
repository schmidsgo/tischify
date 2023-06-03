import { defineStore } from 'pinia';
import axios from 'axios';

type UserInfo = {
  username: string;
  password: string;
  role: string;
  restaurant_name?: string;
  address?: string;
  city?: string;
  opening_hours?: string;
  phone_number?: string;
  capacity?: number;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    OpenLoginModal: false,
    currentLoginType: 'login', // 'login' or 'register'
    user: {
      name: '',
      role: '', // 'guest' or 'restaurant',
      restaurant_name: '',
      address: '',
      city: '',
      phone_number: '',
      opening_hours: '',
      capacity: 0
    },
    isError: false,
    isLoading: false
  }),
  actions: {
    async register({
      username,
      password,
      role,
      restaurant_name,
      address,
      city,
      phone_number,
      opening_hours,
      capacity
    }: UserInfo) {
      try {
        this.isLoading = true;
        const response = await axios.post('http://localhost:3000/register', {
          username,
          password,
          role,
          restaurant_name,
          address,
          city,
          phone_number,
          opening_hours,
          capacity
        });
        this.user.name = username;
        this.user.role = role;
        this.user.restaurant_name = '' ?? restaurant_name;
        this.user.address = '' ?? address;
        this.user.city = '' ?? city;
        this.user.phone_number = '' ?? phone_number;
        this.user.opening_hours = '' ?? opening_hours;
        this.user.capacity = 0 ?? capacity;
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
      username: '',
      address: '',
      city: '',
      category: '',
      phone_number: '',
      opening_hours: '',
      capacity: 0
    },
    isError: false,
    isLoading: false
  }),
  actions: {
    submitSetting({
      username,
      address,
      city,
      phone_number,
      opening_hours,
      capacity
    }: UserInfo) {
      try {
        this.isLoading = true;
        return axios
          .post('http://localhost:3000/settings', {
            username: this.restaurant.username,
            address: this.restaurant.address,
            city: this.restaurant.city,
            phone_number: this.restaurant.phone_number,
            opening_hours: this.restaurant.opening_hours,
            capacity: this.restaurant.capacity
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
