import { Link } from "react-router-dom";
import "../assets/css/style.css"

export function ErrorPage() {
  return (
    <div className="error-page">
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link className="button" to="/main">Back to the main page</Link>
    </div>
  );
}