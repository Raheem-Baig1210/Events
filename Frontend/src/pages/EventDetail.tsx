import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockEvents } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Minus, Plus } from "lucide-react";
import { isAuthenticated, getCurrentUser } from "@/utils/auth";
import { addBooking, getEventBookedSeats } from "@/utils/bookings";
import { toast } from "sonner";
import gsap from "gsap";

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find((e) => e.id === id);
  const [seats, setSeats] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);

  const bookedSeats = getEventBookedSeats(id || "");
  const availableSeats = event ? event.totalSeats - bookedSeats : 0;

  useEffect(() => {
    if (!event) {
      navigate("/");
      return;
    }

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, [event, navigate]);

  if (!event) return null;

  const handleBooking = () => {
    if (!isAuthenticated()) {
      toast.error("Please login to book tickets");
      navigate("/auth");
      return;
    }

    if (seats > availableSeats) {
      toast.error(`Only ${availableSeats} seats available`);
      return;
    }

    const user = getCurrentUser();
    if (!user) return;

    const booking = {
      id: `booking_${Date.now()}`,
      eventId: event.id,
      userId: user.id,
      seats,
      bookingDate: new Date().toISOString(),
      totalPrice: event.price * seats,
    };

    addBooking(booking);
    toast.success(`Successfully booked ${seats} ticket${seats > 1 ? "s" : ""}!`);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6 hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Event Image */}
            <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-lg px-4 py-2">
                {event.category}
              </Badge>
            </div>

            {/* Event Details */}
            <Card ref={cardRef} className="p-8 bg-card border-border space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-4">{event.title}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">{event.description}</p>
              </div>

              <div className="space-y-4 py-6 border-y border-border">
                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{new Date(event.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-foreground">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Available Seats</p>
                    <p className={`font-semibold ${availableSeats < 50 ? "text-destructive" : ""}`}>
                      {availableSeats} / {event.totalSeats}
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Price per ticket</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${event.price}
                  </span>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Number of Seats</label>
                  <div className="flex items-center gap-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSeats(Math.max(1, seats - 1))}
                      disabled={seats <= 1}
                      className="h-12 w-12"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <div className="flex-1 text-center">
                      <span className="text-3xl font-bold text-foreground">{seats}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSeats(Math.min(availableSeats, seats + 1))}
                      disabled={seats >= availableSeats}
                      className="h-12 w-12"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <span className="text-lg font-semibold text-foreground">Total Price</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${(event.price * seats).toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={availableSeats === 0}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90"
                >
                  {availableSeats === 0 ? "Sold Out" : "Book Now"}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
