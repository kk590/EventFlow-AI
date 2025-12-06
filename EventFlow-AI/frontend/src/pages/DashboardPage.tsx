import { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    convertedLeads: 0,
    activeEvents: 0
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      fetch(`${API_URL}/api/stats`)
    .then(res => {
      if (!res.ok) throw new Error('API failed');
      return res.json();
    })
    .then(data => {
      if (data) {
        setStats(data);
      }
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching stats:', err);
      // Keep default values
      setLoading(false);
    });
  
  fetch(`${API_URL}/api/leads/recent`)
    .then(res => {
      if (!res.ok) throw new Error('API failed');
      return res.json();
    })
    .then(data => {
      if (data && Array.isArray(data)) {
        setRecentLeads(data);
      }
    })
    .catch(err => {
      console.error('Error fetching leads:', err);
    })
    .finally(() => setLoading(false));

  if (loading) return <div>Loading...</div>;

  return <Dashboard stats={stats} recentLeads={recentLeads} />;
};

export default DashboardPage;
