import { useEffect, useRef } from "react";
import { Event } from "@/types/event";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { getEventBookedSeats } from "@/utils/bookings";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const bookedSeats = getEventBookedSeats(event.id);
  const availableSeats = event.totalSeats - bookedSeats;
  const availabilityPercent = (availableSeats / event.totalSeats) * 100;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  const handleClick = () => {
    navigate(`/event/${event.id}`);
  };

  return (
    <Card
      ref={cardRef}
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden bg-card hover:shadow-glow transition-all duration-300 border border-border"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm">
          {event.category}
        </Badge>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {event.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{event.location.split(",")[0]}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">
              <span className={availabilityPercent < 20 ? "text-destructive font-semibold" : "text-foreground"}>
                {availableSeats}
              </span>
              <span className="text-muted-foreground"> / {event.totalSeats} seats</span>
            </span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ${event.price}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
