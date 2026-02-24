import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { MessageSquare, Activity, Heart, MapPin, Home, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/app', icon: Home, label: 'Home', exact: true },
    { path: '/app/chat', icon: MessageSquare, label: 'Chat' },
    { path: '/app/scan', icon: Activity, label: 'Scan' },
    { path: '/app/mind', icon: Heart, label: 'Mind' },
    { path: '/app/map', icon: MapPin, label: 'Map' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-midnight pb-24">
      {/* Logout Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-teal to-electric-cyan glow-teal rounded-[12px] font-medium text-midnight hover:shadow-lg hover:shadow-neon-teal/50 transition-all duration-300 transform hover:scale-105"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>

      <Outlet />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
        <div className="max-w-md mx-auto glass-nav rounded-[20px] px-4 py-3">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const active = isActive(item.path, item.exact);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center gap-1 px-4 py-2 transition-all"
                >
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-neon-teal/20 rounded-[12px] glow-teal"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <item.icon
                    size={24}
                    className={`relative z-10 transition-colors ${
                      active ? 'text-neon-teal' : 'text-text-secondary'
                    }`}
                  />
                  <span
                    className={`relative z-10 text-xs transition-colors ${
                      active ? 'text-neon-teal font-medium' : 'text-text-secondary'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}