import { motion } from 'motion/react';
import { Brain, MapPin, TrendingUp, AlertCircle, Heart, Activity, Droplets, Zap, Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { GlassCard } from '../../components/GlassCard';
import { CircularProgress } from '../../components/CircularProgress';
import { GlowBadge } from '../../components/GlowBadge';
import { useState } from 'react';

export default function Home() {
  const [orbExpanded, setOrbExpanded] = useState(false);
  const healthState = 'stable'; // Can be: stable, monitor, alert
  const healthScore = 98;

  const stateConfig = {
    stable: {
      color: 'emerald' as const,
      message: 'Your health indicators are looking great! Keep up the good habits.',
      orbColor: 'from-emerald to-lime-highlight',
      glowClass: 'glow-emerald',
    },
    monitor: {
      color: 'amber' as const,
      message: 'Some symptoms detected. Monitor your condition and stay hydrated.',
      orbColor: 'from-amber to-yellow-500',
      glowClass: 'glow-amber',
    },
    alert: {
      color: 'red' as const,
      message: 'Health indicators need attention. Consider consulting a healthcare provider.',
      orbColor: 'from-soft-red to-red-600',
      glowClass: 'glow-red',
    },
  };

  const config = stateConfig[healthState];

  const todayGoals = [
    { label: 'Hydration Goal', progress: 70, icon: Droplets, color: 'neon-teal' },
    { label: 'Breathing Session', progress: 0, icon: Heart, color: 'emerald' },
    { label: 'Steps Target', progress: 60, icon: Activity, color: 'lime-highlight' },
  ];

  return (
    <div className="min-h-screen p-4 pt-8 pb-32 relative">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Dynamic AI Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold mb-1">Good morning, Alex</h1>
          <p className="text-text-secondary">
            Your sleep improved by 1 hour. City health stable today. 🌤️
          </p>
        </motion.div>

        {/* City Health Stability - Expandable */}
        <GlassCard className="relative overflow-hidden" hover>
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1">
              <p className="text-text-secondary text-sm mb-1">City Health Stability</p>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-3xl font-bold text-emerald">82%</h3>
                <TrendingUp className="text-emerald" size={20} />
                <span className="text-emerald text-sm">+2% this week</span>
              </div>
              
              {/* Mini trend indicators */}
              <div className="flex gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-amber" />
                  <span className="text-xs text-text-secondary">Fever ↑12%</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-emerald" />
                  <span className="text-xs text-text-secondary">Cough ↓4%</span>
                </div>
              </div>
            </div>
            <CircularProgress percentage={82} size={90} strokeWidth={6} color="emerald" value="82" />
          </div>
          
          <div className="flex items-center gap-2 text-neon-teal text-sm cursor-pointer hover:text-electric-cyan transition-colors">
            <MapPin size={14} />
            <span>New Delhi</span>
            <ArrowRight size={14} />
          </div>
        </GlassCard>

        {/* Interactive Health Pulse Orb */}
        <div className="relative flex flex-col items-center justify-center py-8">
          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
              className={`w-72 h-72 rounded-full bg-gradient-to-br ${config.orbColor} opacity-20 blur-3xl`}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
              className={`w-60 h-60 rounded-full bg-gradient-to-br ${config.orbColor} opacity-30 blur-2xl`}
            />
          </div>

          {/* Main interactive orb */}
          <motion.button
            onClick={() => setOrbExpanded(!orbExpanded)}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="relative z-10 cursor-pointer"
          >
            <div
              className={`w-52 h-52 rounded-full bg-gradient-to-br ${config.orbColor} ${config.glowClass} flex items-center justify-center relative`}
            >
              {/* Floating micro labels */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neon-teal/20 border border-neon-teal/30 text-xs text-neon-teal whitespace-nowrap"
              >
                Sleep ↑
              </motion.div>
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald/20 border border-emerald/30 text-xs text-emerald whitespace-nowrap"
              >
                City Stable
              </motion.div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full bg-lime-highlight/20 border border-lime-highlight/30 text-xs text-lime-highlight whitespace-nowrap"
              >
                Stress ↓
              </motion.div>

              <div className="text-center">
                <h2 className="text-6xl font-bold text-midnight mb-2">{healthScore}</h2>
                <p className="text-midnight font-medium uppercase text-sm tracking-wide">
                  {healthState}
                </p>
              </div>
            </div>
          </motion.button>

          {/* Status badge */}
          <div className="mt-6 relative z-10">
            <GlowBadge variant={config.color} size="lg">
              Excellent Health
            </GlowBadge>
          </div>

          {/* Expanded Detail Panel */}
          {orbExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 w-full"
            >
              <GlassCard>
                <h4 className="font-medium mb-4">Health Score Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">Personal Factors</span>
                    <span className="text-emerald font-medium">95%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">Environmental</span>
                    <span className="text-neon-teal font-medium">88%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary text-sm">AI Confidence</span>
                    <span className="text-lime-highlight font-medium">High</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </div>

        {/* Today's Focus - Gamification */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-neon-teal" size={20} />
            <h3 className="font-medium">Today's Focus</h3>
          </div>
          <div className="space-y-4">
            {todayGoals.map((goal, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <goal.icon className={`text-${goal.color}`} size={16} />
                    <span className="text-sm text-text-secondary">{goal.label}</span>
                  </div>
                  <span className="text-sm font-medium">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-glass-white rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-full bg-${goal.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Interactive Health Cards */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Heart Rate', value: '72', unit: 'bpm', trend: 'stable', color: 'neon-teal', sparkline: [68, 70, 72, 71, 72] },
            { label: 'Sleep', value: '7.5', unit: 'hours', trend: 'up', color: 'emerald', sparkline: [6, 6.5, 7, 7.2, 7.5] },
            { label: 'Steps', value: '8.2k', unit: 'today', trend: 'up', color: 'lime-highlight', sparkline: [5, 6, 7, 7.5, 8.2] },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GlassCard className="text-center cursor-pointer" hover>
                <p className="text-text-secondary text-xs mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</p>
                <p className="text-text-muted text-xs mb-2">{stat.unit}</p>
                {/* Mini sparkline */}
                <div className="flex items-end justify-center gap-0.5 h-6">
                  {stat.sparkline.map((val, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-${stat.color} opacity-50 rounded-t`}
                      style={{ height: `${(val / Math.max(...stat.sparkline)) * 100}%` }}
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* City Pulse Strip */}
        <GlassCard className="bg-gradient-to-r from-neon-teal/5 to-emerald/5 border-l-4 border-neon-teal">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="text-neon-teal" size={20} />
              <h4 className="font-medium text-sm">City Pulse This Week</h4>
            </div>
            <button className="text-xs text-neon-teal hover:text-electric-cyan transition-colors flex items-center gap-1">
              View Map <ArrowRight size={12} />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Fever', change: '+12%', color: 'amber' },
              { label: 'Cough', change: '-4%', color: 'emerald' },
              { label: 'Air Quality', change: 'Moderate', color: 'neon-teal' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <p className={`text-lg font-bold text-${item.color}`}>{item.change}</p>
                <p className="text-xs text-text-secondary">{item.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Timeline Feed */}
        <div>
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Activity className="text-neon-teal" size={20} />
            Health Timeline
          </h3>
          <div className="space-y-3">
            {[
              {
                time: '2 hours ago',
                title: 'AI Health Check Complete',
                description: 'All indicators normal',
                icon: Brain,
                color: 'neon-teal',
                status: 'success',
              },
              {
                time: '5 hours ago',
                title: 'City Health Alert',
                description: 'Flu activity increased in North zone',
                icon: AlertCircle,
                color: 'amber',
                status: 'warning',
              },
              {
                time: '1 day ago',
                title: 'Weekly Summary',
                description: 'Your health improved by 12%',
                icon: TrendingUp,
                color: 'emerald',
                status: 'success',
              },
              {
                time: '1 day ago',
                title: 'Mood Check-In',
                description: 'Logged: Calm and focused',
                icon: Heart,
                color: 'lime-highlight',
                status: 'info',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="flex items-start gap-3 relative overflow-hidden" hover>
                  {/* Status indicator line */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${item.color}`} />
                  
                  <div className={`w-10 h-10 rounded-full bg-${item.color}/20 flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`text-${item.color}`} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-text-secondary text-xs mb-1">{item.description}</p>
                    <p className="text-text-muted text-xs">{item.time}</p>
                  </div>
                  {item.status === 'success' && (
                    <CheckCircle2 className="text-emerald flex-shrink-0" size={16} />
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Health Streak Badge */}
        <GlassCard className="bg-gradient-to-r from-emerald/10 to-lime-highlight/10 border border-emerald/30 text-center">
          <div className="text-4xl mb-2">🔥</div>
          <p className="font-medium mb-1">7-Day Health Streak!</p>
          <p className="text-text-secondary text-sm">Keep logging daily for better insights</p>
        </GlassCard>
      </div>

      {/* Floating AI Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-neon-teal to-electric-cyan glow-teal flex items-center justify-center shadow-2xl z-40"
      >
        <Brain className="text-midnight" size={28} />
      </motion.button>
    </div>
  );
}