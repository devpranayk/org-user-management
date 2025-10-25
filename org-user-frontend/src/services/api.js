import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Your backend URL

// Organizations APIs
export const getOrgs = () => axios.get(`${BASE_URL}/orgs`);
export const getOrgById = (id) => axios.get(`${BASE_URL}/orgs/${id}`);
export const createOrg = (data) => axios.post(`${BASE_URL}/orgs`, data);
export const updateOrg = (id, data) => axios.put(`${BASE_URL}/orgs/${id}`, data);
export const deleteOrg = (id) => axios.delete(`${BASE_URL}/orgs/${id}`);

// Users APIs
export const getUsersByOrg = (orgId) => axios.get(`${BASE_URL}/users/org/${orgId}`);
export const createUser = (orgId, data) => axios.post(`${BASE_URL}/users/org/${orgId}`, data);
export const updateUser = (id, data) => axios.put(`${BASE_URL}/users/${id}`, data);
export const deleteUser = (id) => axios.delete(`${BASE_URL}/users/${id}`);
