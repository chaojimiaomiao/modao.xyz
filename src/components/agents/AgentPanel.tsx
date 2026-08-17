import { useState } from 'react';
import { Users, Mic, Brain, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import type { Agent } from '../../data/agents';

interface AgentPanelProps {
  agents: Agent[];
  selectedAgent: string | null;
  onSelectAgent: (id: string | null) => void;
}

function StatusDot({ status }: { status: Agent['status'] }) {
  const color = status === 'online' ? '#80ffaa' : status === 'busy' ? '#f72585' : '#F39C12';
  const label = status === 'online' ? '在线' : status === 'busy' ? '忙碌' : '离开';
  return (
    <span className="flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
      <span className="text-[10px]" style={{ color: 'rgba(160,160,176,0.5)' }}>{label}</span>
    </span>
  );
}

export function AgentPanel({ agents, selectedAgent, onSelectAgent }: AgentPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const onlineCount = agents.filter(a => a.status === 'online').length;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#00f2ff]" />
          <span className="text-sm font-bold" style={{ color: '#f0f0f5', fontFamily: 'var(--font-chinese)' }}>
            镜像世界居民
          </span>
        </div>
        <span className="text-xs" style={{ color: '#80ffaa', fontFamily: 'var(--font-mono)' }}>
          {onlineCount}/{agents.length} 在线
        </span>
      </div>

      {/* Agent List */}
      <div className="space-y-2">
        {agents.map((agent) => {
          const isExpanded = expandedId === agent.id;
          const isSelected = selectedAgent === agent.id;

          return (
            <div
              key={agent.id}
              className="cursor-pointer transition-all duration-300"
              style={{
                background: isSelected ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
                borderRadius: '10px',
                border: isSelected ? `1px solid ${agent.color}44` : '1px solid transparent',
              }}
              onClick={() => {
                if (isExpanded) {
                  setExpandedId(null);
                  onSelectAgent(null);
                } else {
                  setExpandedId(agent.id);
                  onSelectAgent(agent.id);
                }
              }}
            >
              {/* Compact Row */}
              <div className="flex items-center gap-2.5 p-2.5">
                <div className="relative flex-shrink-0">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-10 h-10 rounded-full object-cover"
                    style={{
                      border: `2px solid ${agent.color}`,
                      boxShadow: `0 0 10px ${agent.color}33`,
                    }}
                  />
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                    style={{
                      background: agent.status === 'online' ? '#80ffaa' : agent.status === 'busy' ? '#f72585' : '#F39C12',
                      borderColor: '#050510',
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold truncate" style={{ color: agent.color }}>
                      {agent.name}
                    </span>
                    <span className="text-[10px] truncate" style={{ color: 'rgba(160,160,176,0.5)' }}>
                      {agent.title}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <StatusDot status={agent.status} />
                    <span className="text-[10px] truncate max-w-[120px]" style={{ color: 'rgba(160,160,176,0.4)' }}>
                      {agent.activity}
                    </span>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#a0a0b0]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#a0a0b0]" />}
              </div>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="px-3 pb-3 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="pt-2 space-y-2">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: agent.color }} />
                      <div>
                        <span className="text-[10px] block" style={{ color: 'rgba(160,160,176,0.5)' }}>性格</span>
                        <span className="text-xs" style={{ color: '#d0d0d8', fontFamily: 'var(--font-chinese)' }}>{agent.personality}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mic className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: agent.color }} />
                      <div>
                        <span className="text-[10px] block" style={{ color: 'rgba(160,160,176,0.5)' }}>声线</span>
                        <span className="text-xs" style={{ color: '#d0d0d8', fontFamily: 'var(--font-chinese)' }}>{agent.voice}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Brain className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: agent.color }} />
                      <div>
                        <span className="text-[10px] block" style={{ color: 'rgba(160,160,176,0.5)' }}>记忆</span>
                        <span className="text-xs" style={{ color: '#d0d0d8', fontFamily: 'var(--font-chinese)' }}>{agent.memory}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
