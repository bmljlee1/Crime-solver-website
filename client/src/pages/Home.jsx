import "./Home.css";
import "../styles/GeneralLayout.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="hero-section">
      <h1>Welcome to Speculation Station</h1>
      <p className="welcome-message">
        Dive deep into the world of mystery, crime, and speculation! Speculation
        Station is the ultimate platform where crime cases are described in
        detail, evidence is laid out, and it's up to you to crack the case.
      </p>

      <section className="about-section">
        <h2>How it Works</h2>
        <p>
          Each case comes with a set difficulty and a time duration. You’ll
          examine the evidence and come up with your own theory about what
          happened. The closer your theory matches the real events, the more
          points you earn! As the investigation window closes, the true facts
          are revealed. Are you ready to be the ultimate detective?
        </p>

        <ul className="how-it-works-list">
          <li>
            <strong>Step 1:</strong> Select a crime case that intrigues you.
          </li>
          <li>
            <strong>Step 2:</strong> Read the detailed description and review
            all the evidence.
          </li>
          <li>
            <strong>Step 3:</strong> Formulate your theory and submit it before
            the case time expires.
          </li>
          <li>
            <strong>Step 4:</strong> Earn points based on how close your theory
            is to the actual solution.
          </li>
          <li>
            <strong>Step 5:</strong> Discover the true facts once the case is
            closed!
          </li>
        </ul>
      </section>

      <section className="features-section">
        <h2>Why Join Speculation Station?</h2>
        <div className="features">
          <div className="feature-item">
            <h3>Detailed Crime Cases</h3>
            <p>
              We provide intricate details and comprehensive evidence for each
              crime case, allowing you to dive deep into every mystery.
            </p>
          </div>

          <div className="feature-item">
            <h3>Real-Time Competition</h3>
            <p>
              Compete with other users in real-time. Submit your theories and
              see how your deductive skills stack up against others.
            </p>
          </div>

          <div className="feature-item">
            <h3>Points and Rankings</h3>
            <p>
              Earn points based on the accuracy of your theories. Climb the
              leaderboard and prove that you’re the sharpest detective at
              Speculation Station!
            </p>
          </div>

          <div className="feature-item">
            <h3>Unveil the Truth</h3>
            <p>
              Once the case time expires, the true circumstances of each crime
              are revealed. Can you solve the mystery before the clock runs out?
            </p>
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Ready to Get Started?</h2>
        <p>
          Jump into your first case now and show off your detective skills. Will
          you be the one to crack the case?
        </p>
        <Link to="/crime-cases">
          <button className="cta-button">Explore Crime Cases</button>
        </Link>
      </section>
    </div>
  );
}
