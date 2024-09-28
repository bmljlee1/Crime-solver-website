import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/crime-cases">View All Crime Cases</Link>
        </li>
        <li>
          <Link to="/theories">View Theories</Link>
        </li>
        <li>
          <Link to="/form">Submit a New Theory</Link>
        </li>
        <li>
          <Link to="/filter-theories">Search Theories by Crime Case</Link>
        </li>
      </ul>
    </nav>
  );
}
