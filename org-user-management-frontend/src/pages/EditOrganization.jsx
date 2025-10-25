import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import OrgFormModal from "../components/OrgFormModal";
import { toast } from "react-toastify";

const EditOrganization = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orgData, setOrgData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch organization by ID
  const fetchOrg = async () => {
    try {
      const res = await api.get(`/orgs/${id}`);
      setOrgData({
        name: res.data.org_name,
        slug: res.data.org_slug,
        email: res.data.org_email,
        contactNumber: res.data.contact_number,
      });
      setIsModalOpen(true); // open modal once data is loaded
    } catch (err) {
      console.error("Error fetching org:", err);
      toast.error("Organization not found");
      navigate("/"); // go back to home if org not found
    }
  };

  useEffect(() => {
    fetchOrg();
  }, [id]);

  // Handle update submission
  const handleUpdateOrg = async (data) => {
    try {
      const payload = {
        org_name: data.name,
        org_slug: data.slug || data.name.toLowerCase().replace(/\s+/g, "-"),
        org_email: data.email,
        contact_number: data.contactNumber,
      };

      const res = await api.put(`/orgs/${id}`, payload);
      toast.success(`Organization "${res.data.org_name}" updated successfully`);
      navigate("/"); // back to home
    } catch (err) {
      console.error("Update organization error:", err);
      if (err.response && err.response.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Something went wrong while updating organization");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      {orgData && (
        <OrgFormModal
          isOpen={isModalOpen}
          onClose={() => navigate("/")}
          orgData={orgData}
          onSubmit={handleUpdateOrg}
        />
      )}
    </div>
  );
};

export default EditOrganization;
