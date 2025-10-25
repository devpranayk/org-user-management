import React from 'react';

const OrganizationCard = ({ org, onEdit }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 flex justify-between items-center hover:shadow-2xl transition-shadow">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{org.name}</h2>
        <p className="text-gray-500 mt-1">{org.description}</p>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => onEdit(org)}
      >
        Edit
      </button>
    </div>
  );
};

export default OrganizationCard;
