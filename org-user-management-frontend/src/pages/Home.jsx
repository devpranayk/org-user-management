import React, { useEffect, useState } from 'react';
import api from '../services/api';
import OrganizationCard from '../components/OrganizationCard';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [orgs, setOrgs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrgs();
  }, []);

  const fetchOrgs = async () => {
    try {
      const res = await api.get('/orgs');
      setOrgs(res.data);
    } catch (err) {
      console.error('Error fetching organizations:', err);
    }
  };

  const handleEdit = (org) => {
    navigate(`/edit-org/${org.org_id}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Organizations</h1>
        <button
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          onClick={() => navigate('/add-org')}
        >
          Add Organization
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orgs.map((org) => (
          <OrganizationCard key={org.org_id} org={org} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default Home;
