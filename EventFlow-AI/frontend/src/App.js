import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Leads from './components/Leads';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    totalLeads: 0,
    newLeads: 0,
    convertedLeads: 0,
    activeEvents: 0
  });

  useEffect(() => {
    // Mock data for demonstration
    const mockLeads = [
      {
        id: 1,
        phoneNumber: '+1234567890',
        name: 'John Doe',
        eventType: 'Wedding',
        eventDate: '2024-06-15',
        guestCount: 150,
        budget: 25000,
        status: 'new',
        source: 'voice',
        timestamp: '2024-01-15T10:30:00Z'
      },
      {
        id: 2,
        phoneNumber: '+1987654321',
        name: 'Jane Smith',
        eventType: 'Corporate',
        eventDate: '2024-03-20',
        guestCount: 100,
        budget: 15000,
        status: 'contacted',
        source: 'sms',
        timestamp: '2024-01-14T14:20:00Z'
      }
    ];

    setLeads(mockLeads);
    setStats({
      totalLeads: mockLeads.length,
      newLeads: mockLeads.filter(lead => lead.status === 'new').length,
      convertedLeads: mockLeads.filter(lead => lead.status === 'booked').length,
      activeEvents: 2
    });
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard stats={stats} recentLeads={leads.slice(0, 5)} />;
      case 'leads':
        return <Leads leads={leads} />;
      case 'analytics':
        return <Analytics leads={leads} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard stats={stats} recentLeads={leads.slice(0, 5)} />;
    }
  };

  return (
    <div className="app">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="main-content">
        <Header />
        <div className="content">
          {renderCurrentView()}
        </div>
      </div>
    </div>
  );
}

export default App;
