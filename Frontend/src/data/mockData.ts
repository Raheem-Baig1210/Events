import { Event } from "@/types/event";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival 2025",
    description: "Experience the biggest music festival of the year featuring top artists from around the world. Three days of non-stop entertainment, food, and unforgettable memories.",
    date: "2025-07-15",
    time: "18:00",
    location: "Central Park, New York",
    category: "Music",
    price: 149.99,
    totalSeats: 5000,
    bookedSeats: 3200,
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80"
  },
  {
    id: "2",
    title: "Tech Innovation Summit",
    description: "Join industry leaders and innovators for a day of cutting-edge technology discussions, workshops, and networking opportunities.",
    date: "2025-08-20",
    time: "09:00",
    location: "Tech Hub Convention Center, San Francisco",
    category: "Technology",
    price: 299.99,
    totalSeats: 1000,
    bookedSeats: 750,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
  },
  {
    id: "3",
    title: "Food & Wine Expo",
    description: "Discover culinary delights from world-renowned chefs and sample premium wines from across the globe.",
    date: "2025-09-10",
    time: "12:00",
    location: "Downtown Convention Center, Chicago",
    category: "Food",
    price: 79.99,
    totalSeats: 800,
    bookedSeats: 450,
    imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
  },
  {
    id: "4",
    title: "Stand-Up Comedy Night",
    description: "An evening of laughter with some of the best comedians in the business. Get ready for non-stop entertainment!",
    date: "2025-07-25",
    time: "20:00",
    location: "Comedy Club Arena, Los Angeles",
    category: "Comedy",
    price: 45.00,
    totalSeats: 300,
    bookedSeats: 280,
    imageUrl: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80"
  },
  {
    id: "5",
    title: "Art Gallery Opening",
    description: "Exclusive opening of contemporary art exhibition featuring emerging artists from around the world.",
    date: "2025-08-05",
    time: "19:00",
    location: "Modern Art Gallery, Miami",
    category: "Art",
    price: 25.00,
    totalSeats: 200,
    bookedSeats: 120,
    imageUrl: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80"
  },
  {
    id: "6",
    title: "Marathon Championship",
    description: "Annual city marathon with participants from over 50 countries. Join us for this incredible athletic event!",
    date: "2025-10-01",
    time: "07:00",
    location: "City Streets, Boston",
    category: "Sports",
    price: 60.00,
    totalSeats: 10000,
    bookedSeats: 8500,
    imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80"
  }
];

// Dummy user credentials
export const dummyUser = {
  email: "demo@eventbooking.com",
  password: "demo123",
  id: "user-1",
  name: "Demo User"
};

// Dummy admin credentials
export const dummyAdmin = {
  email: "admin@eventbooking.com",
  password: "admin123",
  id: "admin-1",
  name: "Admin User"
};
