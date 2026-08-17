import { useState, useCallback } from 'react';
import { Gamepad2, Swords, BookOpen, HelpCircle, Trophy, ChevronRight, RotateCcw } from 'lucide-react';
import { agents } from '../../data/agents';

interface GameRound {
  agentName: string;
  agentColor: string;
  content: string;
  isCorrect: boolean;
  delay: number;
}

// 诗词库
const poetryDB: Record<string, string[]> = {
  '月': ['床前明月光，疑是地上霜', '举杯邀明月，对影成三人', '海上生明月，天涯共此时', '明月几时有，把酒问青天', '月落乌啼霜满天，江枫渔火对愁眠'],
  '花': ['感时花溅泪，恨别鸟惊心', '人间四月芳菲尽，山寺桃花始盛开', '落红不是无情物，化作春泥更护花', '花间一壶酒，独酌无相亲'],
  '春': ['春眠不觉晓，处处闻啼鸟', '好雨知时节，当春乃发生', '等闲识得东风面，万紫千红总是春', '春色满园关不住，一枝红杏出墙来'],
  '风': ['随风潜入夜，润物细无声', '长风破浪会有时，直挂云帆济沧海', '夜来风雨声，花落知多少', '不知细叶谁裁出，二月春风似剪刀'],
  '雨': ['清明时节雨纷纷，路上行人欲断魂', '好雨知时节，当春乃发生', '夜阑卧听风吹雨，铁马冰河入梦来', '沾衣欲湿杏花雨，吹面不寒杨柳风'],
  '山': ['会当凌绝顶，一览众山小', '山重水复疑无路，柳暗花明又一村', '千山鸟飞绝，万径人踪灭', '不识庐山真面目，只缘身在此山中'],
  '水': ['桃花潭水深千尺，不及汪伦送我情', '抽刀断水水更流，举杯消愁愁更愁', '水光潋滟晴方好，山色空蒙雨亦奇'],
  '云': ['行到水穷处，坐看云起时', '曾经沧海难为水，除却巫山不是云', '白云深处有人家', '黑云压城城欲摧'],
};

// 成语库
const idiomDB: Record<string, string[]> = {
  '一': ['一心一意', '一鸣惊人', '一帆风顺', '一举两得', '一鼓作气', '一诺千金', '一马当先'],
  '心': ['心想事成', '心心相印', '心旷神怡', '心花怒放', '心血来潮', '心直口快'],
  '花': ['花好月圆', '花团锦簇', '花言巧语', '花枝招展', '花前月下'],
  '龙': ['龙飞凤舞', '龙马精神', '龙争虎斗', '龙腾虎跃', '龙吟虎啸'],
  '天': ['天长地久', '天南地北', '天涯海角', '天马行空', '天伦之乐'],
  '风': ['风雨同舟', '风华正茂', '风起云涌', '风调雨顺', '风花雪月'],
};

// 谜语库
const riddleDB = [
  { q: '千条线，万条线，掉在水里看不见。', a: '雨', hint: '自然现象' },
  { q: '有面无口，有脚无手，听人说话，陪人喝酒。', a: '桌子', hint: '家具' },
  { q: '小时穿黑衣，大时穿绿袍，水里过日子，岸上来睡觉。', a: '青蛙', hint: '动物' },
  { q: '远看山有色，近听水无声。春去花还在，人来鸟不惊。', a: '画', hint: '艺术品' },
  { q: '独木造高楼，没瓦没砖头，人在水下走，水在人上流。', a: '雨伞', hint: '日用品' },
];

type GameType = 'poetry' | 'idiom' | 'riddle' | null;

export function GamePanel() {
  const [activeGame, setActiveGame] = useState<GameType>(null);
  const [rounds, setRounds] = useState<GameRound[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState({ wins: 0, total: 0 });
  const [showResult, setShowResult] = useState(false);
  const [riddleAnswer, setRiddleAnswer] = useState('');
  const [revealed, setRevealed] = useState(false);

  // 飞花令
  const startPoetryBattle = useCallback(() => {
    setActiveGame('poetry');
    setIsPlaying(true);
    setShowResult(false);
    setRounds([]);

    const keywords = Object.keys(poetryDB);
    const keyword = keywords[Math.floor(Math.random() * keywords.length)];
    const shuffledAgents = [...agents].sort(() => Math.random() - 0.5).slice(0, 4);
    const newRounds: GameRound[] = [];

    // 出题
    newRounds.push({
      agentName: '系统',
      agentColor: '#00f2ff',
      content: `飞花令开始！本轮关键字：「${keyword}」`,
      isCorrect: true,
      delay: 0,
    });

    // 各 agent 接令
    const usedPoems: string[] = [];
    shuffledAgents.forEach((agent, i) => {
      const poems = poetryDB[keyword] || [];
      const available = poems.filter(p => !usedPoems.includes(p));
      const poem = available.length > 0
        ? available[Math.floor(Math.random() * available.length)]
        : poems[Math.floor(Math.random() * poems.length)];
      if (poem) usedPoems.push(poem);

      newRounds.push({
        agentName: agent.name,
        agentColor: agent.color,
        content: `「${poem}」`,
        isCorrect: !!poem,
        delay: (i + 1) * 800,
      });
    });

    // 结束
    const winner = shuffledAgents[Math.floor(Math.random() * shuffledAgents.length)];
    newRounds.push({
      agentName: '系统',
      agentColor: '#f72585',
      content: `本轮最佳：${winner.name}·${winner.title}！`,
      isCorrect: true,
      delay: (shuffledAgents.length + 1) * 800,
    });

    // 动画显示
    newRounds.forEach((round, i) => {
      setTimeout(() => {
        setRounds(prev => [...prev, round]);
        if (i === newRounds.length - 1) {
          setIsPlaying(false);
          setShowResult(true);
          setScore(prev => ({ wins: prev.wins + 1, total: prev.total + 1 }));
        }
      }, round.delay);
    });
  }, []);

  // 成语接龙
  const startIdiomChain = useCallback(() => {
    setActiveGame('idiom');
    setIsPlaying(true);
    setShowResult(false);
    setRounds([]);

    const starters = Object.keys(idiomDB);
    const firstChar = starters[Math.floor(Math.random() * starters.length)];
    const shuffledAgents = [...agents].sort(() => Math.random() - 0.5).slice(0, 5);
    const newRounds: GameRound[] = [];

    newRounds.push({
      agentName: '系统',
      agentColor: '#00f2ff',
      content: `成语接龙开始！首字：「${firstChar}」`,
      isCorrect: true,
      delay: 0,
    });

    let currentChar = firstChar;
    const usedIdioms: string[] = [];

    shuffledAgents.forEach((agent, i) => {
      const idioms = idiomDB[currentChar] || [];
      const available = idioms.filter(idiom => !usedIdioms.includes(idiom));
      const idiom = available.length > 0
        ? available[Math.floor(Math.random() * available.length)]
        : null;

      if (idiom) {
        usedIdioms.push(idiom);
        currentChar = idiom.slice(-1);
        // 确保下一个字有成语
        if (!idiomDB[currentChar]) {
          const fallbackChars = Object.keys(idiomDB);
          currentChar = fallbackChars[Math.floor(Math.random() * fallbackChars.length)];
        }

        newRounds.push({
          agentName: agent.name,
          agentColor: agent.color,
          content: `${idiom} → 「${currentChar}」`,
          isCorrect: true,
          delay: (i + 1) * 700,
        });
      } else {
        newRounds.push({
          agentName: agent.name,
          agentColor: '#f72585',
          content: `……接不上了！`,
          isCorrect: false,
          delay: (i + 1) * 700,
        });
      }
    });

    newRounds.forEach((round, i) => {
      setTimeout(() => {
        setRounds(prev => [...prev, round]);
        if (i === newRounds.length - 1) {
          setIsPlaying(false);
          setShowResult(true);
          setScore(prev => ({ wins: prev.wins + 1, total: prev.total + 1 }));
        }
      }, round.delay);
    });
  }, []);

  // 猜谜
  const startRiddle = useCallback(() => {
    setActiveGame('riddle');
    setIsPlaying(false);
    setShowResult(false);
    setRounds([]);
    setRiddleAnswer('');
    setRevealed(false);

    const riddle = riddleDB[Math.floor(Math.random() * riddleDB.length)];
    setRounds([{
      agentName: '谜语大师',
      agentColor: '#F39C12',
      content: riddle.q,
      isCorrect: true,
      delay: 0,
    }]);
  }, []);

  const checkRiddleAnswer = () => {
    const riddle = riddleDB.find(r => r.q === rounds[0]?.content);
    if (!riddle) return;
    setRevealed(true);
    const correct = riddleAnswer.trim() === riddle.a || riddleAnswer.trim().includes(riddle.a);
    setScore(prev => ({ wins: prev.wins + (correct ? 1 : 0), total: prev.total + 1 }));
  };

  const resetGame = () => {
    setActiveGame(null);
    setRounds([]);
    setIsPlaying(false);
    setShowResult(false);
    setRiddleAnswer('');
    setRevealed(false);
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-4 h-4 text-[#f72585]" />
          <span className="text-sm font-bold" style={{ color: '#f0f0f5', fontFamily: 'var(--font-chinese)' }}>
            互动游戏
          </span>
        </div>
        {activeGame && (
          <button onClick={resetGame} className="flex items-center gap-1 text-xs hover:text-[#00f2ff] transition-colors" style={{ color: '#a0a0b0' }}>
            <RotateCcw className="w-3 h-3" />
            重置
          </button>
        )}
      </div>

      {/* Game Select */}
      {!activeGame && (
        <div className="space-y-2">
          <button
            onClick={startPoetryBattle}
            className="w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-[1.02]"
            style={{ background: 'rgba(155, 93, 229, 0.1)', border: '1px solid rgba(155, 93, 229, 0.2)' }}
          >
            <BookOpen className="w-5 h-5 text-[#9b5de5]" />
            <div className="text-left">
              <span className="text-sm font-bold block" style={{ color: '#f0f0f5' }}>飞花令</span>
              <span className="text-[10px]" style={{ color: '#a0a0b0' }}>镜像世界 · 唱跳比拼</span>
            </div>
            <ChevronRight className="w-4 h-4 ml-auto text-[#9b5de5]" />
          </button>

          <button
            onClick={startIdiomChain}
            className="w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-[1.02]"
            style={{ background: 'rgba(0, 242, 255, 0.1)', border: '1px solid rgba(0, 242, 255, 0.2)' }}
          >
            <Swords className="w-5 h-5 text-[#00f2ff]" />
            <div className="text-left">
              <span className="text-sm font-bold block" style={{ color: '#f0f0f5' }}>成语接龙</span>
              <span className="text-[10px]" style={{ color: '#a0a0b0' }}>镜像世界 · 才艺展示</span>
            </div>
            <ChevronRight className="w-4 h-4 ml-auto text-[#00f2ff]" />
          </button>

          <button
            onClick={startRiddle}
            className="w-full flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-[1.02]"
            style={{ background: 'rgba(243, 156, 18, 0.1)', border: '1px solid rgba(243, 156, 18, 0.2)' }}
          >
            <HelpCircle className="w-5 h-5 text-[#F39C12]" />
            <div className="text-left">
              <span className="text-sm font-bold block" style={{ color: '#f0f0f5' }}>猜谜语</span>
              <span className="text-[10px]" style={{ color: '#a0a0b0' }}>镜像世界 · 互动游戏</span>
            </div>
            <ChevronRight className="w-4 h-4 ml-auto text-[#F39C12]" />
          </button>
        </div>
      )}

      {/* Game Rounds Display */}
      {activeGame && (
        <div className="space-y-2">
          {/* Score */}
          <div className="flex items-center gap-2 px-2">
            <Trophy className="w-3.5 h-3.5 text-[#f39c12]" />
            <span className="text-xs" style={{ color: '#a0a0b0', fontFamily: 'var(--font-mono)' }}>
              参与 {score.total} 局 · 胜 {score.wins} 局
            </span>
          </div>

          {/* Round Messages */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
            {rounds.map((round, i) => (
              <div
                key={i}
                className="flex items-start gap-2 p-2.5 rounded-lg animate-fadeIn"
                style={{
                  background: round.agentName === '系统'
                    ? 'rgba(0, 242, 255, 0.05)'
                    : 'rgba(255,255,255,0.04)',
                  borderLeft: `2px solid ${round.agentColor}`,
                }}
              >
                <span className="text-xs font-bold flex-shrink-0" style={{ color: round.agentColor }}>
                  {round.agentName}
                </span>
                <span className="text-xs" style={{ color: '#d0d0d8', fontFamily: 'var(--font-chinese)' }}>
                  {round.content}
                </span>
              </div>
            ))}

            {/* Loading indicator */}
            {isPlaying && (
              <div className="flex items-center gap-2 p-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00f2ff] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9b5de5] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f72585] animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-[10px]" style={{ color: '#a0a0b0' }}>Agents 思考中...</span>
              </div>
            )}
          </div>

          {/* Riddle Input */}
          {activeGame === 'riddle' && !revealed && (
            <div className="space-y-2 pt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={riddleAnswer}
                  onChange={(e) => setRiddleAnswer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && checkRiddleAnswer()}
                  placeholder="输入你的答案..."
                  className="flex-1 px-3 py-2 text-sm rounded-lg outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#f0f0f5',
                    fontFamily: 'var(--font-chinese)',
                  }}
                />
                <button
                  onClick={checkRiddleAnswer}
                  className="px-4 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #F39C12, #f72585)',
                    color: '#fff',
                  }}
                >
                  提交
                </button>
              </div>
            </div>
          )}

          {/* Reveal Answer */}
          {activeGame === 'riddle' && revealed && (
            <div className="p-3 rounded-lg text-center" style={{ background: 'rgba(128, 255, 170, 0.08)', border: '1px solid rgba(128, 255, 170, 0.2)' }}>
              <p className="text-sm" style={{ color: '#80ffaa', fontFamily: 'var(--font-chinese)' }}>
                答案是「{riddleDB.find(r => r.q === rounds[0]?.content)?.a}」
              </p>
              {riddleAnswer.trim() === (riddleDB.find(r => r.q === rounds[0]?.content)?.a || '') ? (
                <p className="text-xs mt-1" style={{ color: '#80ffaa' }}>恭喜你答对了！</p>
              ) : (
                <p className="text-xs mt-1" style={{ color: '#f0c6ff' }}>下次再试试~</p>
              )}
            </div>
          )}

          {/* Play Again */}
          {showResult && activeGame !== 'riddle' && (
            <button
              onClick={activeGame === 'poetry' ? startPoetryBattle : startIdiomChain}
              className="w-full py-2 rounded-lg text-sm font-bold transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #00f2ff, #9b5de5)',
                color: '#fff',
              }}
            >
              再来一局
            </button>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
