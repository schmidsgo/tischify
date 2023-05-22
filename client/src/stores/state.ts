import { defineStore } from 'pinia';
import axios from 'axios';

type UserInfo = {
  username: string;
  password: string;
  role: string;
  restaurant_name?: string | undefined;
  address?: string | undefined;
  phone?: string | undefined;
  opening_hours?: string | undefined;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    OpenLoginModal: false,
    currentLoginType: 'login', // 'login' or 'register'
    user: {
      name: '',
      role: '' // 'guest' or 'restaurant'
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
      phone,
      opening_hours
    }: UserInfo) {
      try {
        this.isLoading = true;
        const response = await axios.post('http://localhost:3000/register', {
          username,
          password,
          role,
          restaurant_name,
          address,
          phone,
          opening_hours
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
