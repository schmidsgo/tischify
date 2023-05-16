import { defineStore } from 'pinia';
import axios from 'axios';

type UserInfo = {
  username: string;
  password: string;
  userType: string;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    OpenLoginModal: false,
    currentLoginType: 'login',
    user: null
  }),
  actions: {
    async login({ username, password, userType }: UserInfo) {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
        userType
      });
      this.user = response.data.user;
      console.log(this.user);
    },
    async signUp({ username, password, userType }: UserInfo) {
      const response = await axios.post('http://localhost:3000/createUser', {
        username,
        password,
        userType
      });
      this.user = response.data.user;
      console.log(this.user);
    },
    logout() {
      this.user = null;
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
