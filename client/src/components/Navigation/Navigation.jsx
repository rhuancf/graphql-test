import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import UserList from "../UserList";
import MovieSearch from "../MovieSearch";
import CreateUser from "../CreateUser";
import "./Navigation.css"; // Import the CSS file for styling

function Navigation() {
  return (
    <Router>
      <div>
        <nav>
          <ul className="nav-links">
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                User List
              </NavLink>
            </li>
            <li>
              <NavLink to="/createUser" className={({ isActive }) => (isActive ? "active" : "")}>
                Create User
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
            <Route path="/createUser" element={<CreateUser />} />
            <Route path="/movies" element={<MovieSearch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Navigation;