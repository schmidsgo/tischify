import { defineStore } from 'pinia';
import axios from 'axios';

type UserInfo = {
  username: string;
  password: string;
  role: string;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    OpenLoginModal: false,
    currentLoginType: 'login', // 'login' | 'register'
    user: {
      name: '',
      role: '' // 'guest' | 'restaurant'
    }
  }),
  actions: {
    async register({ username, password, role }: UserInfo) {
      const response = await axios.post('http://localhost:3000/register', {
        username,
        password,
        role
      });
      this.user.name = username;
      this.user.role = role;
      console.log('user: ' + this.user.name, this.user.role);
    },
    async login({ username, password, role }: UserInfo) {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
        role
      });
      this.user.name = username;
      this.user.role = role;
      console.log('user: ' + this.user.name, this.user.role);
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
