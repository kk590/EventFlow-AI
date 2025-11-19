import React from 'react';

const Leads = ({ leads }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
      <p className="text-gray-600">Manage your leads and track their status.</p>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">All Leads</h2>
        </div>
        <div className="p-6 space-y-4">
          {leads.length > 0 ? (
            leads.map((lead) => (
              <div key={lead.id} className="flex justify-between items-center p-4 border-b border-gray-200">
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
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">No leads available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leads;
