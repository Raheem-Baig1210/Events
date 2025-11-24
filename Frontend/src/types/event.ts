export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  totalSeats: number;
  bookedSeats: number;
  imageUrl: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  seats: number;
  bookingDate: string;
  totalPrice: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
