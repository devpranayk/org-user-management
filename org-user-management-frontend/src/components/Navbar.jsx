import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        OrgUserMgmt
      </Link>
      <div className="flex gap-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/add-org" className="text-gray-700 hover:text-blue-600">Add Organization</Link>
      </div>
    </nav>
  );
};

export default Navbar;
