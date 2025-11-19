import React from 'react';

const Analytics = ({ leads }) => {
  // Mock analytics data
  const analyticsData = {
    totalLeads: leads.length,
    leadsBySource: {
      voice: leads.filter(lead => lead.source === 'voice').length,
      sms: leads.filter(lead => lead.source === 'sms').length,
      web: 0 // Mock data
    },
    leadsByStatus: {
      new: leads.filter(lead => lead.status === 'new').length,
      contacted: leads.filter(lead => lead.status === 'contacted').length,
      booked: leads.filter(lead => lead.status === 'booked').length
    },
    leadsByEventType: leads.reduce((acc, lead) => {
      acc[lead.eventType] = (acc[lead.eventType] || 0) + 1;
      return acc;
    }, {})
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
      <p className="text-gray-600">Track performance and insights from your leads.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Leads by Source */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads by Source</h3>
          <div className="space-y-3">
            {Object.entries(analyticsData.leadsBySource).map(([source, count]) => (
              <div key={source} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 capitalize">{source}</span>
                <span className="text-lg font-bold text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Leads by Status */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads by Status</h3>
          <div className="space-y-3">
            {Object.entries(analyticsData.leadsByStatus).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600 capitalize">{status}</span>
                <span className="text-lg font-bold text-gray-900">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Leads */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Leads</h3>
          <div className="text-center">
            <span className="text-4xl font-bold text-blue-600">{analyticsData.totalLeads}</span>
            <p className="text-sm text-gray-600 mt-2">Total leads captured</p>
          </div>
        </div>
      </div>

      {/* Event Type Breakdown */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Leads by Event Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(analyticsData.leadsByEventType).map(([eventType, count]) => (
            <div key={eventType} className="text-center p-4 bg-gray-50 rounded-lg">
              <span className="text-2xl font-bold text-gray-900">{count}</span>
              <p className="text-sm text-gray-600 mt-1">{eventType}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conversion Rate */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <span className="text-2xl font-bold text-blue-600">
              {analyticsData.leadsByStatus.new}
            </span>
            <p className="text-sm text-blue-600 mt-1">New Leads</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <span className="text-2xl font-bold text-yellow-600">
              {analyticsData.leadsByStatus.contacted}
            </span>
            <p className="text-sm text-yellow-600 mt-1">Contacted</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <span className="text-2xl font-bold text-green-600">
              {analyticsData.leadsByStatus.booked}
            </span>
            <p className="text-sm text-green-600 mt-1">Booked</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
