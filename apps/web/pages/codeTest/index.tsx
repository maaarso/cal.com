import { useEffect, useState } from "react";

interface Booking {
  id: number;
  userId: string;
  name: string;
  // Ajoutez d'autres propriétés ici selon vos besoins
}

export default function AvailabilityPage() {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/codeTest");
        const bookingsData = await response.json();

        if (Array.isArray(bookingsData)) {
          setAllBookings(bookingsData);
        } else {
          console.error("Data from API is not an array:", bookingsData);
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>Bookings :</h2>
      <ul style={listStyles}>
        {allBookings.map((booking) => (
          <li key={booking.id} style={listItemStyles}>
            <p style={bookingStyles}>ID: {booking.id}</p>
            <p style={bookingStyles}>User ID: {booking.userId}</p>
            <p style={bookingStyles}>Schedule Name: {booking.name}</p>
            {/* Ajoutez d'autres propriétés ici selon vos besoins */}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Styles pour améliorer la présentation
const listStyles = {
  listStyle: "none",
  padding: 0,
};

const listItemStyles = {
  borderBottom: "1px solid #ccc",
  marginBottom: "10px",
  padding: "10px",
};

const bookingStyles = {
  margin: 0,
};
