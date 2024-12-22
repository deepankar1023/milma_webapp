import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, ClipboardList, Ticket, Bell, LogOut, ChevronRight } from 'lucide-react';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = {
    profile: {
      title: "My Profile",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img className="w-20 h-20 rounded-full" src="https://via.placeholder.com/150" alt="User" />
            <div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg shadow">
              <h4 className="font-semibold mb-2">Personal Information</h4>
              <p>Phone: +1 234 567 890</p>
              <p>Address: 123 Main St, City, Country</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow">
              <h4 className="font-semibold mb-2">Preferences</h4>
              <p>Language: English</p>
              <p>Theme: Light</p>
            </div>
          </div>
        </div>
      )
    },
    'order-history': {
      title: "Order History",
      content: (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Order #12345</h3>
            <p className="text-sm text-gray-600">Date: 2023-05-15</p>
            <p className="text-sm text-gray-600">Total: $50.00</p>
            <p className="text-sm text-gray-600">Status: Delivered</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Order #12344</h3>
            <p className="text-sm text-gray-600">Date: 2023-05-10</p>
            <p className="text-sm text-gray-600">Total: $35.50</p>
            <p className="text-sm text-gray-600">Status: Processing</p>
          </div>
        </div>
      )
    },
    'token-history': {
      title: "Token History",
      content: (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Token Purchase</h3>
            <p className="text-sm text-gray-600">Date: 2023-05-20</p>
            <p className="text-sm text-gray-600">Amount: 100 tokens</p>
            <p className="text-sm text-gray-600">Price: $10.00</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Token Usage</h3>
            <p className="text-sm text-gray-600">Date: 2023-05-18</p>
            <p className="text-sm text-gray-600">Amount: 20 tokens</p>
            <p className="text-sm text-gray-600">Purpose: Order #12345</p>
          </div>
        </div>
      )
    },
    notifications: {
      title: "Notifications",
      content: (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">New Offer Available</h3>
            <p className="text-sm text-gray-600">Get 20% off on your next order!</p>
            <p className="text-sm text-gray-600">Valid until: 2023-06-01</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Order Status Update</h3>
            <p className="text-sm text-gray-600">Your order #12345 has been delivered.</p>
            <p className="text-sm text-gray-600">Date: 2023-05-15</p>
          </div>
        </div>
      )
    }
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const logout = () => {
    // Add logout functionality here
    console.log('Logged out');
  };

  const sidebarItems = [
    { name: 'profile', icon: UserCircle, label: 'Profile' },
    { name: 'order-history', icon: ClipboardList, label: 'Order History' },
    { name: 'token-history', icon: Ticket, label: 'Token History' },
    { name: 'notifications', icon: Bell, label: 'Notifications' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div 
        className="w-64 bg-white text-gray-800 p-4 shadow-lg"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-orange-500">
            <img className="w-full h-full object-cover" src="https://via.placeholder.com/150" alt="User" />
          </div>
          <h2 className="text-2xl font-bold text-center">Dashboard</h2>
        </div>
        <nav>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <a
                  href="#"
                  onClick={() => handleSectionClick(item.name)}
                  className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 ${
                    activeSection === item.name
                      ? 'bg-orange-500 text-white'
                      : 'hover:bg-orange-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                onClick={logout}
                className="flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 hover:bg-red-100 text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </motion.div>
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Banner Image */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src="https://via.placeholder.com/1200x200" className="w-full h-40 object-cover rounded-xl shadow-lg" alt="Banner" />
        </motion.div>
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <span>Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span className="font-medium text-gray-900">{sections[activeSection].title}</span>
        </div>
        {/* Content based on active section */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4">{sections[activeSection].title}</h2>
          {sections[activeSection].content}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

