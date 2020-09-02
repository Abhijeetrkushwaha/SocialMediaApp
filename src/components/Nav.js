import React from 'react';
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <div className="">
            <nav className="nav-wrapper">
                <ul className="">
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/contact">
                        <li>Contact</li>
                    </Link>
                </ul>
            </nav>
        </div>
    )
}
