import { defineStore } from 'pinia';
import axios from 'axios';

type UserInfo = {
  username: string;
  password: string;
  role: string;
  restaurant_id?: string;
  address?: string;
  city?: string;
  opening_hours?: string;
  phone_number?: string;
  capacity?: number;
};

type BookingInfo = {
  restaurant_id: string;
  name: string;
  email: string;
  people: number;
  datetime: string;
};

export const useAuthStore = defineStore('auth', {
  state: () => ({
    OpenLoginModal: false,
    currentLoginType: 'login',
    user: {
      name: '',
      role: '',
      restaurant_id: '',
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
          address,
          city,
          phone_number,
          opening_hours,
          capacity
        });
        this.user.name = username;
        this.user.role = role;
        this.user.address = '' ?? address;
        this.user.city = '' ?? city;
        this.user.phone_number = '' ?? phone_number;
        this.user.opening_hours = '' ?? opening_hours;
        this.user.capacity = 0 ?? capacity;
        console.log(response.data);
        console.log(
          'user: ' + this.user.name,
          this.user.role,
          'restaurant_id: ' + this.user.restaurant_id
        );
        this.isLoading = false;
        this.OpenLoginModal = false;
      } catch (error) {
        this.isError = true;
      }
    },
    async login({ username, password, role }: UserInfo) {
      try {
        this.isLoading = true;
        const res = await axios
          .post('http://localhost:3000/login', {
            username,
            password,
            role
          })
          .then(res => {
            localStorage.setItem('jwt', res.data.token);
            setAuthHeader(res.data.token);
          })
          .catch(err => console.log(err));
        //TODO: So bekommst du den token vom login. Du musst den nur so speichern, dass du ihn später wieder verwenden kannst.
        //https://stackoverflow.com/questions/40988238/sending-the-bearer-token-with-axios Hier siehst du wie du den token später verwendest
        // const { token, user } = res.data;
        // return { token, user };

        this.user.name = username;
        this.user.role = role;
        console.log(this.user.name, this.user.restaurant_id);
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
    },
    async getRestaurant(restaurant_id: string) {
      try {
        console.log('this.restaurant: ' + restaurant_id);
        const res = await axios.get(
          `http://localhost:3000/restaurants/:${restaurant_id}`
        );
        this.user.restaurant_id = res.data[restaurant_id].restaurant_id;
        this.user.address = res.data[restaurant_id + 2].address;
        this.user.city = res.data[restaurant_id + 2].city;
        this.user.phone_number = res.data[restaurant_id + 2].phone_number;
        this.user.opening_hours = res.data[restaurant_id + 2].opening_hours;
        this.user.capacity = res.data[restaurant_id + 2].capacity;
        capacity: 0;
        console.log(res.data[restaurant_id + 2]);
      } catch (err) {
        console.log(err);
      }
    }
  }
});

export const useSettingsStore = defineStore('setting', {
  state: () => ({
    username: '',
    address: '',
    city: '',
    phone_number: '',
    opening_hours: '',
    capacity: 0,
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
      capacity,
      restaurant_id
    }: UserInfo) {
      try {
        this.isLoading = true;
        return axios
          .post(`http://localhost:3000/restaurants/settings/${restaurant_id}`, {
            username: this.username,
            address: this.address,
            city: this.city,
            phone_number: this.phone_number,
            opening_hours: this.opening_hours,
            capacity: this.capacity
          })
          .then(res => {
            const instance = axios.create({
              baseURL: 'http://localhost:3000/',
              timeout: 1000,
              headers: { Authorization: 'Bearer ' + token }
            });

            instance.get('/path').then(response => {
              return response.data;
            });
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
    selectedItem: null,
    booking: {
      name: '',
      email: '',
      people: 0,
      datetime: ''
    },
    isError: false,
    isLoading: false
  }),
  // getters: {
  //   isModalOpen: state => state.showBookingModal
  // },
  actions: {
    openModal(restaurant: any) {
      this.showBookingModal = true;
      this.selectedItem = restaurant;
      console.log(
        'showBookingModal: ' + this.showBookingModal,
        ', selectedItem: ' + this.selectedItem
      );
    },
    closeModal() {
      this.showBookingModal = false;
      this.selectedItem = null;
      console.log(
        'showBookingModal: ' + this.showBookingModal,
        ', selectedItem: ' + this.selectedItem
      );
    },
    async submitBooking({
      restaurant_id, //?
      name,
      email,
      people,
      datetime
    }: BookingInfo) {
      try {
        this.isLoading = true;
        const res = await axios.post('http://localhost:3000/bookings', {
          restaurant_id: restaurant_id, //?
          name: this.booking.name,
          email: this.booking.name,
          people: this.booking.people,
          datetime: this.booking.datetime
        });
        this.booking.name = name;
        this.booking.email = email;
        this.booking.people = people;
        this.booking.datetime = datetime;
        this.showBookingModal = false;
        console.log(res.status);
        this.isLoading = false;
      } catch (err) {
        this.isError = true;
        console.log(err);
      }
    }
  }
});
