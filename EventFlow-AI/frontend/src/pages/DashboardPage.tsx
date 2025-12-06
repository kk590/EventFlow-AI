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
    // Fetch stats
    fetch(`${API_URL}/api/stats`)
      .then(data => setStats(data || {
        totalLeads: 0,
        newLeads: 0, 
        convertedLeads: 0,
        activeEvents: 0
      }))


    // Fetch recent leads
    fetch(`${API_URL}/api/leads/recent`)
      .then(res => res.json())
      .then(data => setRecentLeads(data))
      .catch(err => console.error('Error fetching leads:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return <Dashboard stats={stats} recentLeads={recentLeads} />;
};

export default DashboardPage;
