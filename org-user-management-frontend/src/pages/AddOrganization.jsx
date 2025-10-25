import React, { useState } from "react";
import api from "../services/api";
import OrgFormModal from "../components/OrgFormModal";
import { toast } from "react-toastify";

const AddOrganization = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Show modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle form submission
  const handleAddOrg = async (data) => {
    try {
      // API fields: org_name, org_slug, org_email, contact_number
      const payload = {
        org_name: data.name,
        org_slug: data.slug || data.name.toLowerCase().replace(/\s+/g, "-"),
        org_email: data.email,
        contact_number: data.contactNumber,
      };

      const res = await api.post("/orgs", payload);

      toast.success(`Organization "${res.data.org_name}" added successfully`);
      closeModal();
    } catch (err) {
      console.error("Add organization error:", err);
      if (err.response && err.response.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Something went wrong while adding organization");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Add New Organization</h1>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            onClick={openModal}
          >
            Open Form
          </button>
        </div>

        <p className="text-gray-600">
          Click the button above to open the organization form. Fill in the required fields: **name, email, contact number, and slug (optional)**.
        </p>
      </div>

      {/* Organization Form Modal */}
      <OrgFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAddOrg}
      />
    </div>
  );
};

export default AddOrganization;
