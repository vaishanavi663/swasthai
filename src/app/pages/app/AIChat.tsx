import { useState } from "react";
import {
  Send,
  Mic,
  Brain,
  MapPin,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  TrendingUp,
  Activity,
  Cloud,
  User,
  Globe,
  BarChart3,
  Info,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard } from "../../components/GlassCard";
import { CircularProgress } from "../../components/CircularProgress";

interface Message {
  id: number;
  type: "user" | "ai" | "suggestion";
  content: string;
  sources?: string[];
  riskLevel?: "low" | "monitor" | "urgent";
  confidence?: number;
  dataUsed?: {
    personal?: boolean;
    community?: boolean;
    trends?: boolean;
  };
  explanation?: {
    personalContext?: string;
    communityContext?: string;
    medicalGuideline?: string;
  };
  suggestions?: {
    title: string;
    action: string;
  }[];
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "ai",
      content:
        "Hello! I'm your Health Intelligence Engine. I'm analyzing your personal health data, community trends, and medical guidelines to provide context-aware guidance.",
      confidence: 95,
      dataUsed: {
        personal: true,
        community: true,
        trends: true,
      },
    },
    {
      id: 2,
      type: "suggestion",
      content:
        "Your sleep has dropped 2 nights in a row. This may affect your immune system.",
      suggestions: [
        {
          title: "Sleep dropped to 5.5h",
          action: "Set earlier bedtime reminder",
        },
      ],
    },
    {
      id: 3,
      type: "user",
      content:
        "I have a persistent headache for the last 2 days. What should I do?",
    },
    {
      id: 4,
      type: "ai",
      content:
        "Based on your symptoms and context analysis, here's what I recommend:\n\n**Immediate Actions:**\n• Stay well-hydrated (8-10 glasses of water)\n• Reduce screen time and rest in a dark room\n• Monitor your symptoms closely\n\n**When to Seek Care:**\nIf headache worsens, accompanied by fever, vision changes, or neck stiffness, consult a healthcare provider immediately.",
      sources: ["WHO Guidelines", "Mayo Clinic", "CDC"],
      riskLevel: "monitor",
      confidence: 86,
      dataUsed: {
        personal: true,
        community: true,
        trends: false,
      },
      explanation: {
        personalContext:
          "Your sleep quality dropped 30% in the past 3 days",
        communityContext:
          "No significant headache spike in New Delhi",
        medicalGuideline:
          "Persistent headaches beyond 48h require monitoring",
      },
      suggestions: [
        {
          title: "Log symptom progress",
          action: "Track daily",
        },
        { title: "Improve sleep hygiene", action: "View tips" },
      ],
    },
  ]);

  const [input, setInput] = useState("");
  const [activeMode, setActiveMode] = useState<
    "personal" | "community" | "mental"
  >("personal");
  const [showContext, setShowContext] = useState(false);
  const [expandedExplanation, setExpandedExplanation] =
    useState<number | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: input,
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Simulate AI response with typing indicator
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        type: "ai",
        content:
          "I understand your concern. Let me analyze this based on your health profile and community data.\n\n**Analysis:**\nBased on the information provided and current health trends, I recommend monitoring your symptoms closely. Stay hydrated and get adequate rest.",
        sources: ["Medical Database", "WHO"],
        riskLevel: "low",
        confidence: 82,
        dataUsed: {
          personal: true,
          community: false,
          trends: true,
        },
        explanation: {
          personalContext:
            "Your recent health metrics are stable",
          medicalGuideline:
            "Standard preventive care guidelines apply",
        },
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1500);
  };

  const getRiskConfig = (risk?: string) => {
    switch (risk) {
      case "low":
        return {
          color: "emerald",
          glow: "glow-emerald",
          label: "Low Risk",
          bg: "from-emerald-500/20 to-emerald-500/10",
        };
      case "monitor":
        return {
          color: "amber",
          glow: "glow-amber",
          label: "Monitor",
          bg: "from-amber-500/20 to-amber-500/10",
        };
      case "urgent":
        return {
          color: "soft-red",
          glow: "glow-red",
          label: "Urgent",
          bg: "from-soft-red/20 to-soft-red/10",
        };
      default:
        return {
          color: "neon-teal",
          glow: "",
          label: "Info",
          bg: "from-neon-teal/20 to-neon-teal/10",
        };
    }
  };

  const modeConfig = {
    personal: {
      icon: User,
      label: "Personal Mode",
      color: "neon-teal",
    },
    community: {
      icon: Globe,
      label: "Community-Aware",
      color: "emerald",
    },
    mental: {
      icon: Brain,
      label: "Mental Support",
      color: "purple-400",
    },
  };

  const currentMode = modeConfig[activeMode];

  return (
    <div className="h-screen flex flex-col relative">
      {/* 🎯 INTELLIGENT HEADER */}
      <div className="p-4 border-b border-glass-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-teal via-electric-cyan to-emerald glow-teal flex items-center justify-center">
                  <Brain className="text-midnight" size={24} />
                </div>
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-emerald rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-neon-teal to-electric-cyan bg-clip-text text-transparent">
                  Health Intelligence Engine
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                    <p className="text-xs text-emerald">
                      Analyzing
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-text-secondary">
                    <MapPin
                      size={12}
                      className="text-neon-teal"
                    />
                    <span>New Delhi</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowContext(!showContext)}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-glass-white border border-glass-border hover:border-neon-teal transition-all text-xs"
            >
              <BarChart3 size={14} className="text-neon-teal" />
              <span>AI Context</span>
              {showContext ? (
                <ChevronUp size={14} />
              ) : (
                <ChevronDown size={14} />
              )}
            </button>
          </div>

          {/* Mode Selector */}
          <div className="flex gap-2">
            {(
              Object.keys(modeConfig) as Array<
                keyof typeof modeConfig
              >
            ).map((mode) => {
              const config = modeConfig[mode];
              const isActive = activeMode === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? `bg-${config.color}/20 border border-${config.color}/50 text-${config.color}`
                      : "bg-glass-white border border-glass-border text-text-secondary hover:border-neon-teal"
                  }`}
                >
                  <config.icon size={12} />
                  <span>{config.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {message.type === "suggestion" ? (
                    // 🔮 PROACTIVE SUGGESTION BLOCK
                    <GlassCard className="border-l-4 border-amber bg-gradient-to-r from-amber/10 to-transparent">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber/20 flex items-center justify-center flex-shrink-0">
                          <Sparkles
                            className="text-amber"
                            size={16}
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-text-primary mb-2">
                            {message.content}
                          </p>
                          {message.suggestions && (
                            <div className="flex flex-wrap gap-2">
                              {message.suggestions.map(
                                (suggestion, idx) => (
                                  <button
                                    key={idx}
                                    className="px-3 py-1.5 rounded-full bg-amber/20 border border-amber/30 text-xs text-amber hover:bg-amber/30 transition-all"
                                  >
                                    {suggestion.action}
                                  </button>
                                ),
                              )}
                            </div>
                          )}
                        </div>
                        <button className="text-text-muted hover:text-text-secondary transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </GlassCard>
                  ) : message.type === "user" ? (
                    <div className="flex justify-end">
                      <div className="max-w-[75%] bg-gradient-to-br from-neon-teal to-electric-cyan rounded-[20px] px-4 py-3 glow-teal">
                        <p className="text-midnight text-sm leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ) : (
                    // 💬 SMART AI RESPONSE CARD
                    <div className="max-w-[85%]">
                      <GlassCard
                        className={
                          message.riskLevel
                            ? getRiskConfig(message.riskLevel)
                                .glow
                            : ""
                        }
                      >
                        {/* Main Response */}
                        <div className="prose prose-sm prose-invert max-w-none">
                          <p className="text-text-primary text-sm leading-relaxed whitespace-pre-line">
                            {message.content}
                          </p>
                        </div>

                        {/* Risk + Confidence + Data Sources Row */}
                        {(message.riskLevel ||
                          message.confidence ||
                          message.dataUsed) && (
                          <div className="mt-4 pt-4 border-t border-glass-border">
                            <div className="flex flex-wrap gap-3 items-center">
                              {/* Risk Badge */}
                              {message.riskLevel && (
                                <div
                                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${getRiskConfig(message.riskLevel).bg} border border-${getRiskConfig(message.riskLevel).color}/30`}
                                >
                                  <AlertCircle
                                    className={`text-${getRiskConfig(message.riskLevel).color}`}
                                    size={14}
                                  />
                                  <span
                                    className={`text-xs font-medium text-${getRiskConfig(message.riskLevel).color}`}
                                  >
                                    {
                                      getRiskConfig(
                                        message.riskLevel,
                                      ).label
                                    }
                                  </span>
                                </div>
                              )}

                              {/* AI Confidence */}
                              {message.confidence && (
                                <div className="flex items-center gap-2">
                                  <CircularProgress
                                    percentage={
                                      message.confidence
                                    }
                                    size={32}
                                    strokeWidth={3}
                                    color="neon-teal"
                                    value={`${message.confidence}%`}
                                    className="text-[8px]"
                                  />
                                  <span className="text-xs text-text-secondary">
                                    AI Confidence
                                  </span>
                                </div>
                              )}

                              {/* Data Sources Used */}
                              {message.dataUsed && (
                                <div className="flex items-center gap-2">
                                  {message.dataUsed
                                    .personal && (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-neon-teal/10 border border-neon-teal/30">
                                      <User
                                        size={10}
                                        className="text-neon-teal"
                                      />
                                      <span className="text-[10px] text-neon-teal">
                                        Personal
                                      </span>
                                    </div>
                                  )}
                                  {message.dataUsed
                                    .community && (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald/10 border border-emerald/30">
                                      <Globe
                                        size={10}
                                        className="text-emerald"
                                      />
                                      <span className="text-[10px] text-emerald">
                                        Community
                                      </span>
                                    </div>
                                  )}
                                  {message.dataUsed.trends && (
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-400/10 border border-purple-400/30">
                                      <TrendingUp
                                        size={10}
                                        className="text-purple-400"
                                      />
                                      <span className="text-[10px] text-purple-400">
                                        Trends
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* 🔎 WHY THIS SUGGESTION? Expandable */}
                        {message.explanation && (
                          <div className="mt-3">
                            <button
                              onClick={() =>
                                setExpandedExplanation(
                                  expandedExplanation ===
                                    message.id
                                    ? null
                                    : message.id,
                                )
                              }
                              className="flex items-center gap-2 text-xs text-neon-teal hover:text-electric-cyan transition-colors"
                            >
                              <Info size={12} />
                              <span>Why this suggestion?</span>
                              {expandedExplanation ===
                              message.id ? (
                                <ChevronUp size={12} />
                              ) : (
                                <ChevronDown size={12} />
                              )}
                            </button>

                            <AnimatePresence>
                              {expandedExplanation ===
                                message.id && (
                                <motion.div
                                  initial={{
                                    opacity: 0,
                                    height: 0,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    height: "auto",
                                  }}
                                  exit={{
                                    opacity: 0,
                                    height: 0,
                                  }}
                                  className="mt-3 space-y-2"
                                >
                                  {message.explanation
                                    .personalContext && (
                                    <div className="flex items-start gap-2 text-xs">
                                      <User
                                        size={12}
                                        className="text-neon-teal mt-0.5 flex-shrink-0"
                                      />
                                      <div>
                                        <span className="text-text-secondary">
                                          Personal:{" "}
                                        </span>
                                        <span className="text-text-primary">
                                          {
                                            message.explanation
                                              .personalContext
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                  {message.explanation
                                    .communityContext && (
                                    <div className="flex items-start gap-2 text-xs">
                                      <Globe
                                        size={12}
                                        className="text-emerald mt-0.5 flex-shrink-0"
                                      />
                                      <div>
                                        <span className="text-text-secondary">
                                          Community:{" "}
                                        </span>
                                        <span className="text-text-primary">
                                          {
                                            message.explanation
                                              .communityContext
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                  {message.explanation
                                    .medicalGuideline && (
                                    <div className="flex items-start gap-2 text-xs">
                                      <Activity
                                        size={12}
                                        className="text-purple-400 mt-0.5 flex-shrink-0"
                                      />
                                      <div>
                                        <span className="text-text-secondary">
                                          Medical:{" "}
                                        </span>
                                        <span className="text-text-primary">
                                          {
                                            message.explanation
                                              .medicalGuideline
                                          }
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {/* Verified Sources */}
                        {message.sources &&
                          message.sources.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-glass-border">
                              <p className="text-xs text-text-secondary mb-2">
                                Verified Sources:
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {message.sources.map(
                                  (source, idx) => (
                                    <div
                                      key={idx}
                                      className="px-2 py-1 rounded-full bg-neon-teal/10 border border-neon-teal/30 text-xs text-neon-teal"
                                    >
                                      {source}
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                        {/* Action Suggestions */}
                        {message.suggestions &&
                          message.suggestions.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-glass-border">
                              <p className="text-xs text-text-secondary mb-2">
                                Recommended Actions:
                              </p>
                              <div className="space-y-2">
                                {message.suggestions.map(
                                  (suggestion, idx) => (
                                    <div
                                      key={idx}
                                      className="flex items-center justify-between bg-glass-white rounded-lg px-3 py-2"
                                    >
                                      <span className="text-xs text-text-primary">
                                        {suggestion.title}
                                      </span>
                                      <button className="text-xs text-neon-teal hover:text-electric-cyan font-medium transition-colors">
                                        {suggestion.action}
                                      </button>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                      </GlassCard>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-glass-border">
            <div className="max-w-4xl mx-auto">
              <GlassCard className="p-4">
                <div className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSend()
                    }
                    placeholder="Describe your symptoms or ask a health question..."
                    className="flex-1 bg-transparent text-text-primary placeholder:text-text-muted outline-none text-sm"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-teal to-electric-cyan flex items-center justify-center glow-teal disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
                  >
                    <Send className="text-midnight" size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-glass-white flex items-center justify-center hover:bg-glass-border transition-all">
                    <Mic className="text-neon-teal" size={18} />
                  </button>
                </div>

                {/* Quick Suggestions */}
                <div className="flex gap-2 flex-wrap">
                  {[
                    "Headache",
                    "Fever",
                    "Fatigue",
                    "Stress",
                    "Sleep issues",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() =>
                        setInput(
                          `I have ${suggestion.toLowerCase()}`,
                        )
                      }
                      className="px-3 py-1.5 rounded-full bg-glass-white border border-glass-border text-xs text-text-secondary hover:border-neon-teal hover:text-neon-teal transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* 📊 CONTEXT SNAPSHOT PANEL (Desktop) */}
        <AnimatePresence>
          {showContext && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="hidden md:block w-80 border-l border-glass-border p-4 overflow-y-auto"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-sm">
                    AI Context
                  </h3>
                  <button
                    onClick={() => setShowContext(false)}
                    className="text-text-muted hover:text-text-secondary"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* User Context */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <User
                      size={14}
                      className="text-neon-teal"
                    />
                    <h4 className="text-xs font-medium text-text-secondary uppercase">
                      Your Context
                    </h4>
                  </div>
                  <GlassCard className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary">
                        Sleep Trend
                      </span>
                      <div className="flex items-center gap-1">
                        <TrendingUp
                          className="text-soft-red"
                          size={12}
                        />
                        <span className="text-soft-red font-medium">
                          -30%
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary">
                        Mood Trend
                      </span>
                      <div className="flex items-center gap-1">
                        <TrendingUp
                          className="text-emerald"
                          size={12}
                        />
                        <span className="text-emerald font-medium">
                          Stable
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary">
                        Last Symptom
                      </span>
                      <span className="text-text-primary font-medium">
                        2 days ago
                      </span>
                    </div>
                  </GlassCard>
                </div>

                {/* Community Context */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe size={14} className="text-emerald" />
                    <h4 className="text-xs font-medium text-text-secondary uppercase">
                      Community Context
                    </h4>
                  </div>
                  <GlassCard className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary">
                        Fever Spike
                      </span>
                      <span className="text-amber font-medium">
                        +12%
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary">
                        City Risk Index
                      </span>
                      <CircularProgress
                        percentage={82}
                        size={40}
                        strokeWidth={4}
                        color="emerald"
                        value="82"
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-text-secondary">
                        Air Quality
                      </span>
                      <div className="flex items-center gap-1">
                        <Cloud
                          className="text-amber"
                          size={12}
                        />
                        <span className="text-amber font-medium">
                          Moderate
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </div>

                {/* Active Insights */}
                <div>
                  <h4 className="text-xs font-medium text-text-secondary uppercase mb-3">
                    Active Insights
                  </h4>
                  <div className="space-y-2">
                    <GlassCard className="p-3 border-l-2 border-amber">
                      <p className="text-xs text-text-primary">
                        Cough cases rising in North Delhi
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Updated 2h ago
                      </p>
                    </GlassCard>
                    <GlassCard className="p-3 border-l-2 border-emerald">
                      <p className="text-xs text-text-primary">
                        Your stress levels improving
                      </p>
                      <p className="text-xs text-text-muted mt-1">
                        Updated 1d ago
                      </p>
                    </GlassCard>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}