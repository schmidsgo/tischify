import { defineStore } from 'pinia';
import axios from 'axios';
import setAuthHeader from '@/utils/setAuthHeader';

type UserInfo = {
  username: string;
  password: string;
  role?: string;
  restaurant_id?: string;
  restaurant_name?: string;
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
        this.user.role = '' ?? role;
        this.user.restaurant_name = '' ?? restaurant_name;
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
    async login({ username, password }: UserInfo) {
      try {
        this.isLoading = true;
        axios
          .post('http://localhost:3000/login', {
            username,
            password
          })
          .then(res => {
            localStorage.setItem('jwt', res.data.token);
            this.user.role = res.data.role;
            setAuthHeader(res.data);
          })
          .catch(err => {});

        this.user.name = username;
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
    async getRestaurant() {
      try {
        const res = await axios.get('http://localhost:3000/restaurants');
        console.log('test: ' + res);
        this.user = res.data;
        // this.user.restaurant_id = res.data[restaurant_id].restaurant_id;
        // this.user.address = res.data[restaurant_id + 2].address;
        // this.user.city = res.data[restaurant_id + 2].city;
        // this.user.phone_number = res.data[restaurant_id + 2].phone_number;
        // this.user.opening_hours = res.data[restaurant_id + 2].opening_hours;
        // this.user.capacity = res.data[restaurant_id + 2].capacity;
        // capacity: 0;
        // console.log(res.data[restaurant_id + 2]);
      } catch (err) {
        console.log(err);
      }
    }
  }
});

export const useBookingStore = defineStore('booking', {
  state: () => ({
    showBookingModal: false,
    selectedItemRestaurantId: null
  }),
  actions: {
    openModal(restaurant: any) {
      this.selectedItemRestaurantId = restaurant.restaurant_id;
      this.showBookingModal = true;
    },
    closeModal() {
      this.showBookingModal = false;
      this.selectedItemRestaurantId = null;
    }
  }
});
