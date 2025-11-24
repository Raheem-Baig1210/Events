import { Booking } from "@/types/event";
import { isAuthenticated } from "@/utils/auth";

const BOOKINGS_KEY = "event_bookings";

export const getBookings = (): Booking[] => {
  const bookings = localStorage.getItem(BOOKINGS_KEY);
  return bookings ? JSON.parse(bookings) : [];
};

export const addBooking = (booking: Booking): void => {
  if (!isAuthenticated()) {
    throw new Error("You must be logged in to book an event.");
  }

  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

export const getEventBookedSeats = (eventId: string): number => {
  const bookings = getBookings();
  return bookings
    .filter((b) => b.eventId === eventId)
    .reduce((total, b) => total + b.seats, 0);
};

export const getUserBookings = (userId: string): Booking[] => {
  const bookings = getBookings();
  return bookings.filter((b) => b.userId === userId);
};
