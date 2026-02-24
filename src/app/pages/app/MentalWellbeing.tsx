import { useState } from 'react';
import { Heart, Moon, Zap, Mic, Play, Pause, TrendingUp, Award, Calendar, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from '../../components/GlassCard';
import { CircularProgress } from '../../components/CircularProgress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MentalWellbeing() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [mood, setMood] = useState(7);
  const [stress, setStress] = useState(3);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [heartRate, setHeartRate] = useState(72);

  const moodData = [
    { day: 'Mon', mood: 6 },
    { day: 'Tue', mood: 7 },
    { day: 'Wed', mood: 5 },
    { day: 'Thu', mood: 8 },
    { day: 'Fri', mood: 7 },
    { day: 'Sat', mood: 9 },
    { day: 'Sun', mood: 8 },
  ];

  const moods = [
    { emoji: '😊', label: 'Great', value: 'great', color: 'from-emerald-400 to-lime-400' },
    { emoji: '🙂', label: 'Good', value: 'good', color: 'from-teal-400 to-cyan-400' },
    { emoji: '😐', label: 'Okay', value: 'okay', color: 'from-purple-400 to-pink-400' },
    { emoji: '😔', label: 'Low', value: 'low', color: 'from-orange-400 to-amber-400' },
    { emoji: '😰', label: 'Anxious', value: 'anxious', color: 'from-rose-400 to-red-400' },
  ];

  const challenges = [
    { title: 'Morning Meditation', progress: 70, xp: 20, icon: Wind, completed: false },
    { title: 'Nature Walk', progress: 100, xp: 30, icon: Heart, completed: true },
    { title: 'Gratitude Journal', progress: 40, xp: 15, icon: Calendar, completed: false },
  ];

  const emotionalTimeline = [
    { time: '2 hours ago', type: 'Mood Log', content: 'Feeling calm and focused', mood: '😊' },
    { time: '5 hours ago', type: 'Breathing', content: '5-minute session completed', mood: '🌿' },
    { time: '1 day ago', type: 'Voice Journal', content: 'Reflected on work stress', mood: '😐' },
    { time: '2 days ago', type: 'Challenge', content: 'Completed Nature Walk (+30 XP)', mood: '✨' },
  ];

  const startBreathing = () => {
    setIsBreathing(true);
    // Simple breathing cycle simulation
    const cycle = () => {
      setBreathPhase('inhale');
      setTimeout(() => setBreathPhase('hold'), 4000);
      setTimeout(() => setBreathPhase('exhale'), 8000);
      setTimeout(() => {
        if (isBreathing) cycle();
      }, 14000);
    };
    cycle();
  };

  return (
    <div className="min-h-screen p-4 pt-8 pb-32 bg-gradient-to-b from-purple-950/20 via-midnight to-midnight relative overflow-hidden">
      {/* Ambient floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-40 right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute top-1/2 left-1/3 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        {/* 🌸 Emotional Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
            Hi Alex 🌿
          </h1>
          <p className="text-text-secondary text-lg">How are you really feeling today?</p>
        </motion.div>

        {/* Mood Quick Select */}
        <div className="flex justify-center gap-3 mb-8">
          {moods.map((moodOption, index) => (
            <motion.button
              key={moodOption.value}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(moodOption.value)}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all ${
                selectedMood === moodOption.value
                  ? `bg-gradient-to-br ${moodOption.color} shadow-lg scale-110`
                  : 'bg-glass-white hover:bg-glass-border'
              }`}
            >
              {moodOption.emoji}
            </motion.button>
          ))}
        </div>

        {/* Two-column grid: Mind Stability + AI Insight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Mind Stability Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassCard className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30 h-full">
              <div className="flex flex-col items-center text-center">
                <p className="text-text-secondary text-sm mb-2">Mind Stability Index</p>
                <CircularProgress percentage={85} size={100} color="emerald" value="85%" />
                <div className="flex items-center gap-2 text-emerald text-xs mt-3">
                  <TrendingUp size={14} />
                  <span>+8% from last week</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* 📊 AI Mood Insight */}
          <AnimatePresence mode="wait">
            {selectedMood ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <GlassCard className="border-l-4 border-purple-500 h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                      <Heart className="text-purple-400" size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-sm">AI Mood Insight</h4>
                      <p className="text-text-secondary text-xs mb-2">
                        You've reported feeling 'okay' 3 times this week.
                      </p>
                      <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                        Try breathing exercise →
                      </button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <GlassCard className="h-full flex items-center justify-center">
                  <p className="text-text-secondary text-sm text-center">
                    Select a mood above to see AI insights
                  </p>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Two-column: Voice Journal + Breathing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 🎙 Voice Journal */}
          <GlassCard>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Mic className="text-purple-400" size={18} />
                <h3 className="font-medium text-sm">Voice Journal</h3>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseDown={() => setIsRecording(true)}
                onMouseUp={() => setIsRecording(false)}
                onMouseLeave={() => setIsRecording(false)}
                className={`w-24 h-24 rounded-full mx-auto mb-3 flex items-center justify-center transition-all ${
                  isRecording
                    ? 'bg-gradient-to-br from-rose-500 to-pink-500 shadow-lg shadow-pink-500/50'
                    : 'bg-gradient-to-br from-purple-500 to-pink-500'
                }`}
              >
                <Mic className="text-white" size={32} />
              </motion.button>
              
              <p className="text-text-secondary text-xs mb-2">
                {isRecording ? 'Recording...' : 'Hold to speak'}
              </p>
              
              {isRecording && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center gap-1"
                >
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scaleY: [1, 2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 h-3 bg-pink-500 rounded-full"
                    />
                  ))}
                </motion.div>
              )}
            </div>
          </GlassCard>

          {/* 🌬 Interactive Breathing Space */}
          <GlassCard className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/30">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Wind className="text-emerald-400" size={18} />
                <h3 className="font-medium text-sm">Guided Breathing</h3>
              </div>

              {!isBreathing ? (
                <div>
                  <p className="text-text-secondary text-xs mb-4">
                    Center yourself with a calming exercise
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startBreathing}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium"
                  >
                    Start Breathing
                  </motion.button>
                </div>
              ) : (
                <div className="py-4">
                  <motion.div
                    animate={{
                      scale: breathPhase === 'inhale' ? [1, 1.3] : breathPhase === 'exhale' ? [1.3, 1] : 1.3,
                    }}
                    transition={{ duration: breathPhase === 'hold' ? 0 : 4 }}
                    className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/50"
                  >
                    <p className="text-white font-medium text-sm">
                      {breathPhase === 'inhale' ? 'Inhale' : breathPhase === 'hold' ? 'Hold' : 'Exhale'}
                    </p>
                  </motion.div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsBreathing(false)}
                    className="px-4 py-1 rounded-full bg-glass-white border border-glass-border text-text-primary text-xs"
                  >
                    Stop
                  </motion.button>
                </div>
              )}
            </div>
          </GlassCard>
        </div>

        {/* Health Metrics in 4-column grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Mood Slider */}
          <GlassCard className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="text-pink-400" size={18} />
              <h3 className="font-medium text-sm">Mood Level</h3>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-4xl">
                {mood <= 2 ? '😢' : mood <= 4 ? '😟' : mood <= 6 ? '😐' : mood <= 8 ? '🙂' : '😊'}
              </div>
              <div className="flex-1">
                <p className="text-xs text-text-secondary mb-2">
                  {mood <= 2 ? 'Very Low' : mood <= 4 ? 'Low' : mood <= 6 ? 'Neutral' : mood <= 8 ? 'Good' : 'Excellent'}
                </p>
                <input
                  type="range"
                  min="0"
                  max="9"
                  value={mood}
                  onChange={(e) => setMood(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #A855F7 0%, #EC4899 ${(mood / 9) * 100}%, rgba(148, 163, 184, 0.2) ${(mood / 9) * 100}%, rgba(148, 163, 184, 0.2) 100%)`,
                  }}
                />
              </div>
            </div>
          </GlassCard>

          {/* Stress Level */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <Zap className="text-amber" size={18} />
              <h4 className="font-medium text-sm">Stress</h4>
            </div>

            <div className="flex justify-center mb-3">
              <CircularProgress
                percentage={(stress / 10) * 100}
                size={70}
                color={stress <= 3 ? 'emerald' : stress <= 6 ? 'amber' : 'red'}
                value={stress.toString()}
                label="/ 10"
              />
            </div>

            <input
              type="range"
              min="0"
              max="10"
              value={stress}
              onChange={(e) => setStress(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${
                  stress <= 3 ? '#1FD28E' : stress <= 6 ? '#F59E0B' : '#EF4444'
                } 0%, ${
                  stress <= 3 ? '#1FD28E' : stress <= 6 ? '#F59E0B' : '#EF4444'
                } ${(stress / 10) * 100}%, rgba(148, 163, 184, 0.2) ${(stress / 10) * 100}%, rgba(148, 163, 184, 0.2) 100%)`,
              }}
            />
          </GlassCard>

          {/* Heart Rate */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="text-rose-400" size={18} />
              <h4 className="font-medium text-sm">Heart Rate</h4>
            </div>

            <div className="text-center mb-3">
              <motion.p
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-3xl font-bold text-rose-400"
              >
                {heartRate}
              </motion.p>
              <p className="text-xs text-text-secondary">bpm</p>
            </div>

            <input
              type="range"
              min="50"
              max="120"
              value={heartRate}
              onChange={(e) => setHeartRate(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #FB7185 0%, #FB7185 ${((heartRate - 50) / 70) * 100}%, rgba(148, 163, 184, 0.2) ${((heartRate - 50) / 70) * 100}%, rgba(148, 163, 184, 0.2) 100%)`,
              }}
            />
          </GlassCard>
        </div>

        {/* Two-column: Sleep + 7-Day Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sleep Tracking */}
          <GlassCard>
            <div className="flex items-center gap-2 mb-4">
              <Moon className="text-indigo-400" size={20} />
              <h3 className="font-medium">Sleep Tracking</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-400 mb-1">{sleepHours}h</p>
                <p className="text-text-secondary text-xs">Last Night</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald mb-1">7.2h</p>
                <p className="text-text-secondary text-xs">Avg Week</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Sleep Hours</span>
                <span className="text-indigo-400 font-medium">{sleepHours}h</span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #818CF8 0%, #818CF8 ${((sleepHours - 4) / 8) * 100}%, rgba(148, 163, 184, 0.2) ${((sleepHours - 4) / 8) * 100}%, rgba(148, 163, 184, 0.2) 100%)`,
                }}
              />
            </div>
          </GlassCard>

          {/* 7-Day Mood Chart */}
          <GlassCard>
            <h3 className="font-medium mb-3 text-sm">7-Day Mood Trend</h3>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={moodData}>
                  <defs>
                    <linearGradient id="moodGradientPurple" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis
                    dataKey="day"
                    stroke="#94A3B8"
                    tick={{ fill: '#94A3B8', fontSize: 10 }}
                  />
                  <YAxis
                    stroke="#94A3B8"
                    tick={{ fill: '#94A3B8', fontSize: 10 }}
                    domain={[0, 10]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(19, 27, 46, 0.9)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      borderRadius: '12px',
                      color: '#F8FAFC',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="mood"
                    stroke="#A855F7"
                    strokeWidth={2}
                    fill="url(#moodGradientPurple)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* 🧩 Self-Care Challenges with Add Goal */}
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Award className="text-purple-400" size={20} />
              <h3 className="font-medium">Self-Care Challenges</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium"
            >
              + Add Goal
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-glass-white rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <challenge.icon
                      className={challenge.completed ? 'text-emerald' : 'text-purple-400'}
                      size={16}
                    />
                    <span className="text-xs font-medium">{challenge.title}</span>
                  </div>
                  {challenge.completed && <span className="text-emerald text-lg">✓</span>}
                </div>
                <div className="mb-2">
                  <div className="h-2 bg-midnight rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${challenge.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className={`h-full ${
                        challenge.completed ? 'bg-emerald' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-purple-400">+{challenge.xp} XP</span>
                  <span className="text-xs text-text-secondary">{challenge.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* 📜 Emotional Timeline */}
        <div>
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Calendar className="text-purple-400" size={20} />
            Emotional Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {emotionalTimeline.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="flex items-start gap-3 border-l-4 border-purple-500/50" hover>
                  <div className="text-xl">{entry.mood}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs">{entry.type}</p>
                    <p className="text-text-secondary text-xs mb-1 truncate">{entry.content}</p>
                    <p className="text-text-muted text-xs">{entry.time}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}