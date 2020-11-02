import React from "react";
import { Link } from "gatsby";

export const Header = ({ title }) => (
  <nav className="nav">
    <div className="container">
      <div className="row">
        <div className="col-6 nav__col">
          <div className="nav__links">
            <Link to="/">About</Link>
          </div>

          <Link to="/" className="nav__logo">
            {title}
          </Link>
        </div>
      </div>
    </div>
  </nav>
);
