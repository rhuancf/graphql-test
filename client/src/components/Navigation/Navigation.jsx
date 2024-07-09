import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import UserList from "../UserList";
import MovieSearch from "../MovieSearch";
import "./Navigation.css"; // Import the CSS file for styling

function Navigation() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                Users
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={({ isActive }) => (isActive ? "active" : "")}>
                Search Movies
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/movies" element={<MovieSearch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Navigation;