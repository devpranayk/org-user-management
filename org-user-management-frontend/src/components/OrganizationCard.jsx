import React from "react";

const OrganizationCard = ({ org, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-xl rounded-xl p-6 flex flex-col justify-between transition-shadow">
      {/* Organization Info */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{org.name}</h2>
        <p className="text-gray-500 mt-2">{org.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => onEdit(org)}
        >
          Edit
        </button>
        {onDelete && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={() => onDelete(org)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default OrganizationCard;
