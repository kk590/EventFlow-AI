import React from 'react';
import { 
  UsersIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
    <div className="flex items-center">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

const RecentLeadCard = ({ lead }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <h4 className="font-semibold text-gray-900">{lead.name || 'Unknown'}</h4>
        <p className="text-sm text-gray-600">{lead.phoneNumber}</p>
        <p className="text-sm text-blue-600 font-medium">{lead.eventType}</p>
      </div>
      <div className="text-right">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
          lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
          lead.status === 'booked' ? 'bg-green-100 text-green-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {lead.status}
        </span>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(lead.timestamp).toLocaleDateString()}
        </p>
      </div>
    </div>
  </div>
);

const Dashboard = ({ stats, recentLeads }) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your event planning pipeline</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={UsersIcon}
          color="bg-blue-500"
        />
        <StatCard
          title="New Leads"
          value={stats.newLeads}
          icon={PhoneIcon}
          color="bg-green-500"
        />
        <StatCard
          title="Converted Leads"
          value={stats.convertedLeads}
          icon={ChatBubbleLeftRightIcon}
          color="bg-purple-500"
        />
        <StatCard
          title="Active Events"
          value={stats.activeEvents}
          icon={CalendarIcon}
          color="bg-orange-500"
        />
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
        </div>
        <div className="p-6 space-y-4">
          {recentLeads.length > 0 ? (
            recentLeads.map((lead) => (
              <RecentLeadCard key={lead.id} lead={lead} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No recent leads</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Add Manual Lead
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
            Send Bulk SMS
          </button>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
const Dashboard = ({ stats, recentLeads }) => {
  const handleAddLead = async () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const response = await fetch('https://eventflow-ai-backend.onrender.com/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Manual Lead',
          phoneNumber: '+1234567890',
          eventType: 'Wedding',
          status: 'new'
        })
      });
      const data = await response.json();
      alert('Lead added: ' + JSON.stringify(data));
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  const handleBulkSMS = async () => {
    try {
      const response = await fetch('https://eventflow-ai-backend.onrender.com/api/sms/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Hello from EventFlow AI!',
          recipients: ['+1234567890']
        })
      });
      const data = await response.json();
      alert('SMS sent: ' + JSON.stringify(data));
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await fetch('https://eventflow-ai-backend.onrender.com/api/reports');
      const data = await response.json();
      alert('Report: ' + JSON.stringify(data));
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    // ... existing JSX ...
    <button onClick={handleAddLead} className="...">Add Manual Lead</button>
    <button onClick={handleBulkSMS} className="...">Send Bulk SMS</button>
    <button onClick={handleGenerateReport} className="...">Generate Report</button>
  );
};



