import { MainHeader } from "../components/MainHeader"
import { BookingCards } from "../components/BookingCards"

export const Bookings:React.FC = () => {
  return (
    <>
      <MainHeader />
      <main className="bookings-page">
        <h1 className="visually-hidden">Travel App</h1>
        <BookingCards />
      </main>
    </>
  )
}