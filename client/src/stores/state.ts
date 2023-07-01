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

type Booking = {
  reservation_id: string;
  datetime: Date;
  party_size: number;
  restaurant_name: string;
  restaurant_category: string;
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
      capacity: 0,
      bookings: [] as Booking[]
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
            setAuthHeader(res.data.token);
          })
          .catch(err => {});

        this.user.name = username;
        console.log(this.user.name, this.user.restaurant_id);
        this.getBookings();
        this.isLoading = false;
        this.OpenLoginModal = false;
      } catch (error) {
        this.isError = true;
      }
    },
    async getBookings() {
      axios
        .get('http://localhost:3000/guests/bookings')
        .then(response => {
          console.log(response.data);
          this.user.bookings = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    async deleteBooking(id: string) {
      axios
        .delete('http://localhost:3000/guests/bookings/' + id)
        .then(response => {
          console.log(response.data);
          this.getBookings();
        })
        .catch(error => {
          console.log(error);
        });
    },

    logout() {
      this.user.name = '';
      this.user.role = '';
      this.user.restaurant_id = '';
      this.user.restaurant_name = '';
      this.user.address = '';
      this.user.city = '';
      this.user.phone_number = '';
      this.user.opening_hours = '';
      this.user.capacity = 0;
      this.user.bookings = [];
      localStorage.removeItem('jwt');
      console.log('user: ' + this.user.name, this.user.role);
    },
    async getRestaurant() {
      try {
        const res = await axios.get('http://localhost:3000/restaurants');
        console.log('test: ' + res);
        this.user = res.data;
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
