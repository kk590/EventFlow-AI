const Dashboard = ({ stats, recentLeads }) => {
  const handleAddLead = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/leads', {
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
      const response = await fetch('http://localhost:5000/api/sms/bulk', {
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
      const response = await fetch('http://localhost:5000/api/reports');
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
