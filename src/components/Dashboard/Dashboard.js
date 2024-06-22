import React, { useState } from 'react';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = {
    profile: "Profile content here...",
    'order-history': "Order History content here...",
    'token-history': "Token History content here...",
    notifications: "Notifications content here..."
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const logout = () => {
    // Add logout functionality here
    console.log('Logged out');
  };

  return (
    <div className="flex min-h-screen bg-gray-300">
      {/* Sidebar */}
      <div className="w-64 bg-white text-black p-4 shadow-lg">
        <div className="border-2 border-gray-300 rounded-full overflow-hidden w-20 h-20 mb-4 flex items-center justify-center">
          <img className="w-full h-full object-cover" src="https://via.placeholder.com/150" alt="User" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Dashboard</h2>
        <ul>
          <li className="mb-2">
            <a href="#" onClick={() => handleSectionClick('profile')} className="block p-2 hover:bg-orange-500 rounded">Profile</a>
          </li>
          <li className="mb-2">
            <a href="#" onClick={() => handleSectionClick('order-history')} className="block p-2 hover:bg-orange-500 rounded">Order History</a>
          </li>
          <li className="mb-2">
            <a href="#" onClick={() => handleSectionClick('token-history')} className="block p-2 hover:bg-orange-500 rounded">Token History</a>
          </li>
          <li className="mb-2">
            <a href="#" onClick={() => handleSectionClick('notifications')} className="block p-2 hover:bg-orange-500 rounded">Notifications</a>
          </li>
          <li>
            <a href="#" onClick={logout} className="block p-2 hover:bg-orange-500 rounded">Logout</a>
          </li>
        </ul>
      </div>
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Banner Image */}
        <div className="flex items-center justify-center mb-6">
          <img src="https://via.placeholder.com/350x80" className="w-full rounded-lg shadow-lg" alt="Banner" />
        </div>
        {/* Content based on active section */}
        <div>{sections[activeSection]}</div>
      </div>
    </div>
  );
};

export default Dashboard;
