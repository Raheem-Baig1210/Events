import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, isAdmin, logout } from "@/utils/auth";
import { getBookings } from "@/utils/bookings";
import { mockEvents } from "@/data/mockData";
import { Booking } from "@/types/event";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Users, DollarSign, Ticket, Shield, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!isAuthenticated() || !isAdmin()) {
      toast.error("Unauthorized access. Admin login required.");
      navigate("/admin/login");
      return;
    }

    // Load all bookings
    setBookings(getBookings());
  }, [navigate]);

  const getEventDetails = (eventId: string) => {
    return mockEvents.find((e) => e.id === eventId);
  };

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);
  const totalTickets = bookings.reduce((sum, booking) => sum + booking.seats, 0);
  const totalBookings = bookings.length;

  const deleteBooking = (bookingId: string) => {
    const updatedBookings = bookings.filter((b) => b.id !== bookingId);
    setBookings(updatedBookings);
    localStorage.setItem("event_bookings", JSON.stringify(updatedBookings));
    toast.success("Booking deleted successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-destructive to-primary flex items-center justify-center shadow-glow">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-destructive to-primary bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">Manage all event bookings</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                  <p className="text-3xl font-bold text-foreground">{totalBookings}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Tickets</p>
                  <p className="text-3xl font-bold text-foreground">{totalTickets}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. Booking</p>
                  <p className="text-3xl font-bold text-foreground">
                    ${totalBookings > 0 ? (totalRevenue / totalBookings).toFixed(2) : "0.00"}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          </div>

          {/* Bookings Table */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">All Bookings</h2>

            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">No bookings yet</p>
                <p className="text-muted-foreground mt-2">Bookings will appear here once users start booking events</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Event Name</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>Seats</TableHead>
                      <TableHead>Total Price</TableHead>
                      <TableHead>Booking Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => {
                      const event = getEventDetails(booking.eventId);
                      return (
                        <TableRow key={booking.id}>
                          <TableCell className="font-mono text-xs">
                            {booking.id.substring(0, 12)}...
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span className="font-medium">{event?.title || "Unknown Event"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs">
                            {booking.userId}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{booking.seats} tickets</Badge>
                          </TableCell>
                          <TableCell className="font-bold text-primary">
                            ${booking.totalPrice.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => deleteBooking(booking.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
