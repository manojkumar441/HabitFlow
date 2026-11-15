import { LayoutDashboard, TrendingUp, Settings } from 'lucide-react';

/**
 * Sidebar.jsx - Navigation links for switching between application views.
 * Uses Lucide LayoutDashboard, TrendingUp, and Settings icons.
 */
function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={18} strokeWidth={2} />,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <TrendingUp size={18} strokeWidth={2} />,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={18} strokeWidth={2} />,
    },
  ];

  const handleItemClick = (pageId) => {
    onNavigate(pageId);
    if (onClose) onClose(); // close mobile sidebar when an item is selected
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => handleItemClick(item.id)}
          >
            <span className="nav-icon" aria-hidden="true">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </aside>
    </>
  );
}

export default Sidebar;
