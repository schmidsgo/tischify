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
    user: {
      name: '',
      type: ''
    }
  }),
  actions: {
    async login({ username, password, userType }: UserInfo) {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
        userType
      });
      this.user.name = response.data.username;
      console.log(this.user.name);
    },
    async signUp({ username, password, userType }: UserInfo) {
      const response = await axios.post('http://localhost:3000/createUser', {
        username,
        password,
        userType
      });
      this.user.name = response.data.username;
      this.user.type = response.data.userType;
      console.log(this.user.name, this.user.type);
    },
    logout() {
      this.user.name = '';
      this.user.type = '';
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
