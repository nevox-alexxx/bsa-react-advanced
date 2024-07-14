import { Outlet } from 'react-router-dom';
import { Footer } from "./components/Footer";
import './assets/css/style.css';

function App() {
  return (
    <div className="app-container">
      <Outlet />
      <Footer />
    </div >
  );
}

export default App;
