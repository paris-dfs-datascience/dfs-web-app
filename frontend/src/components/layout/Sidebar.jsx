import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Trophy, Brain, Plus } from 'lucide-react';
import LeagueSetupWizard from '../common/LeagueSetupWizard';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  const menuItems = [
    { title: 'Home', path: '/', icon: <Home size={20} /> },
    { title: 'League', path: '/league', icon: <Trophy size={20} /> },
    { title: 'Data Science', path: '/data-science', icon: <Brain size={20} /> }
  ];

  return (
    <>
      <aside 
        className={`h-screen bg-white fixed top-0 left-0 transition-all duration-300 ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        style={{ boxShadow: '2px 0 5px rgba(0,0,0,0.1)' }}
      >
        <nav className="p-4 h-full flex flex-col">
          <div className="flex-1">
            {menuItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="block text-black py-3 px-4 hover:bg-gray-100 rounded transition-all duration-200 flex items-center gap-4"
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isExpanded && <span className="flex-1">{item.title}</span>}
              </Link>
            ))}
          </div>
          
          {/* Create League Button */}
          <button
            onClick={() => setShowWizard(true)}
            className="w-full py-3 px-4 hover:bg-gray-100 rounded transition-all duration-200 flex items-center gap-4 text-black"
          >
            <span className="flex-shrink-0"><Plus size={20} /></span>
            {isExpanded && <span className="flex-1">Create League</span>}
          </button>
        </nav>
      </aside>

      {/* League Setup Wizard Modal */}
      {showWizard && <LeagueSetupWizard onClose={() => setShowWizard(false)} />}
    </>
  );
};

export default Sidebar;