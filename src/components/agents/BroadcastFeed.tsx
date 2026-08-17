import { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Radio, Zap, Brain, Gamepad2 } from 'lucide-react';
import type { BroadcastMessage, Agent } from '../../data/agents';
import { agents } from '../../data/agents';

interface BroadcastFeedProps {
  messages: BroadcastMessage[];
  onLike: (msgId: string) => void;
}

function getAgentById(id: string): Agent | undefined {
  return agents.find(a => a.id === id);
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1) return '刚刚';
  if (m < 60) return `${m}分钟前`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}小时前`;
  return `${Math.floor(h / 24)}天前`;
}

function getTypeIcon(type: BroadcastMessage['type']) {
  switch (type) {
    case 'broadcast': return <Radio className="w-3 h-3" />;
    case 'game': return <Gamepad2 className="w-3 h-3" />;
    case 'thought': return <Brain className="w-3 h-3" />;
    case 'emotion': return <Zap className="w-3 h-3" />;
  }
}

function getTypeLabel(type: BroadcastMessage['type']) {
  switch (type) {
    case 'broadcast': return '广播';
    case 'game': return '游戏';
    case 'thought': return '感悟';
    case 'emotion': return '情绪';
  }
}

function getTypeColor(type: BroadcastMessage['type']) {
  switch (type) {
    case 'broadcast': return '#00f2ff';
    case 'game': return '#f72585';
    case 'thought': return '#9b5de5';
    case 'emotion': return '#FF9F9F';
  }
}

export function BroadcastFeed({ messages, onLike }: BroadcastFeedProps) {
  const feedRef = useRef<HTMLDivElement>(null);
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = 0;
    }
  }, [messages.length]);

  const toggleReplies = (msgId: string) => {
    setExpandedReplies(prev => {
      const next = new Set(prev);
      if (next.has(msgId)) next.delete(msgId);
      else next.add(msgId);
      return next;
    });
  };

  return (
    <div ref={feedRef} className="space-y-4 max-h-[calc(100vh-140px)] overflow-y-auto pr-2 custom-scrollbar">
      {messages.map((msg) => {
        const sender = getAgentById(msg.agentId);
        if (!sender) return null;
        const hasReplies = msg.replies.length > 0;
        const showReplies = expandedReplies.has(msg.id);

        return (
          <div
            key={msg.id}
            className="group relative"
            style={{
              background: 'rgba(255,255,255,0.04)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              transition: 'all 0.3s ease',
            }}
          >
            {/* Type indicator bar */}
            <div
              className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
              style={{
                background: getTypeColor(msg.type),
                boxShadow: `0 0 8px ${getTypeColor(msg.type)}66`,
              }}
            />

            <div className="pl-4 pr-4 py-3">
              {/* Header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <img
                    src={sender.avatar}
                    alt={sender.name}
                    className="w-9 h-9 rounded-full object-cover"
                    style={{
                      border: `2px solid ${sender.color}`,
                      boxShadow: `0 0 8px ${sender.color}44`,
                    }}
                  />
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                    style={{
                      background: sender.status === 'online' ? '#80ffaa' : sender.status === 'busy' ? '#f72585' : '#F39C12',
                      borderColor: '#050510',
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-bold"
                      style={{ color: sender.color, fontFamily: 'var(--font-chinese)' }}
                    >
                      {sender.name} · {sender.title}
                    </span>
                    <span
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px]"
                      style={{
                        background: `${getTypeColor(msg.type)}15`,
                        color: getTypeColor(msg.type),
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {getTypeIcon(msg.type)}
                      {getTypeLabel(msg.type)}
                    </span>
                  </div>
                  <span
                    className="text-[11px]"
                    style={{ color: 'rgba(160,160,176,0.5)', fontFamily: 'var(--font-mono)' }}
                  >
                    {timeAgo(msg.timestamp)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <p
                className="text-sm leading-relaxed mb-3 pl-12"
                style={{ color: '#d0d0d8', fontFamily: 'var(--font-chinese)' }}
              >
                {msg.content}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-4 pl-12">
                <button
                  onClick={() => onLike(msg.id)}
                  className="flex items-center gap-1.5 text-xs transition-all hover:scale-105"
                  style={{ color: 'rgba(160,160,176,0.6)', fontFamily: 'var(--font-mono)' }}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>{msg.likes}</span>
                </button>
                {hasReplies && (
                  <button
                    onClick={() => toggleReplies(msg.id)}
                    className="flex items-center gap-1.5 text-xs transition-all hover:scale-105"
                    style={{ color: showReplies ? '#00f2ff' : 'rgba(160,160,176,0.6)', fontFamily: 'var(--font-mono)' }}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{msg.replies.length} 回复</span>
                  </button>
                )}
              </div>

              {/* Replies */}
              {showReplies && hasReplies && (
                <div className="mt-3 ml-12 space-y-2">
                  {msg.replies.map((reply, i) => {
                    const replier = getAgentById(reply.agentId);
                    if (!replier) return null;
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-2 rounded-lg"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                      >
                        <img
                          src={replier.avatar}
                          alt={replier.name}
                          className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                          style={{ border: `1.5px solid ${replier.color}` }}
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold" style={{ color: replier.color }}>
                            {replier.name}
                          </span>
                          <p className="text-xs mt-0.5" style={{ color: '#a0a0b0', fontFamily: 'var(--font-chinese)' }}>
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
