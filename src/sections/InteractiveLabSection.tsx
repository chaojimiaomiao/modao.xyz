import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { UploadCloud, ShieldCheck, Cpu, FileCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const uploadItems = [
  { icon: true, text: '支持格式：微信聊天记录 (.txt)、语音 (.mp3/.wav)、视频 (.mp4)' },
  { icon: true, text: '数据安全：全程端侧处理，不上传云端' },
  { icon: true, text: '处理时间：通常 2-5 分钟' },
  { icon: true, text: '灵魂匹配：AI 将为你推荐最契合的玩偶载体' },
];

export function InteractiveLabSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -40, opacity: 0, duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from(rightRef.current, {
        x: 40, opacity: 0, duration: 0.7, delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scan animation - 5x slower: every 300ms increase 0.4%
  useEffect(() => {
    if (!isScanning) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.4;
      setScanProgress(Math.round(progress * 10) / 10);
      if (progress >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setScanComplete(true);
        setTimeout(() => {
          setScanComplete(false);
          setScanProgress(0);
        }, 5000);
      }
    }, 300); // 300ms = 5x slower than 60ms

    return () => clearInterval(interval);
  }, [isScanning]);

  const triggerFileInput = () => {
    if (!isScanning && !scanComplete && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setIsScanning(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      setIsScanning(true);
    }
  };

  const handleClick = () => {
    if (uploadedFile) {
      // Already have a file, restart scan
      setScanComplete(false);
      setScanProgress(0);
      setIsScanning(true);
    } else {
      triggerFileInput();
    }
  };

  return (
    <section
      id="lab"
      ref={sectionRef}
      className="relative py-10 lg:py-16 overflow-hidden"
      style={{ background: '#050510' }}
    >
      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12" style={{ zIndex: 1 }}>
        {/* Header */}
        <div className="mb-4">
          <div className="section-label mb-4">
            <span>互动实验室</span>
          </div>
          <h2 className="font-display text-[#f0f0f5] text-3xl sm:text-4xl lg:text-5xl mb-4 neon-glow">
            上传你的灵魂数据
          </h2>
          <p
            className="text-[#a0a0b0] text-base sm:text-lg max-w-[560px]"
            style={{ fontFamily: 'var(--font-chinese)' }}
          >
            上传你的微信记录、语音片段，AI 将实时分析并展示灵魂提取过程
          </p>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.mp3,.wav,.mp4"
          className="hidden"
          onChange={handleFileSelect}
        />

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: Info */}
          <div ref={leftRef} className="lg:col-span-2">
            <div className="relative pl-6">
              {/* Vertical dashed line */}
              <div
                className="absolute left-0 top-2 bottom-2 w-px"
                style={{ borderLeft: '1px dashed rgba(0, 242, 255, 0.3)' }}
              />

              <div className="space-y-5">
                {uploadItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Cpu className="w-4 h-4 text-[#00f2ff] mt-0.5 flex-shrink-0" />
                    <p className="text-[#a0a0b0] text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Upload Area */}
          <div ref={rightRef} className="lg:col-span-3">
            <div
              className={`relative liquid-glass rounded-xl p-8 min-h-[280px] flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                isDragging ? 'scale-[1.02] border-[#00f2ff]' : ''
              }`}
              style={{
                border: isDragging
                  ? '2px solid #00f2ff'
                  : '2px dashed rgba(0, 242, 255, 0.3)',
                background: isDragging ? 'rgba(0, 242, 255, 0.05)' : undefined,
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              {/* Scan line animation */}
              {isScanning && (
                <div
                  className="absolute left-0 w-full h-0.5 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, #00f2ff, transparent)',
                    boxShadow: '0 0 10px rgba(0, 242, 255, 0.5)',
                    top: `${scanProgress}%`,
                    transition: 'top 0.3s linear',
                    zIndex: 10,
                  }}
                />
              )}

              {/* Scan complete flash */}
              {scanComplete && (
                <div
                  className="absolute inset-0 bg-[#80ffaa] pointer-events-none"
                  style={{
                    animation: 'flash 0.5s ease-out forwards',
                    zIndex: 20,
                  }}
                />
              )}

              {scanComplete ? (
                <div className="text-center" style={{ zIndex: 30 }}>
                  <div className="text-[#80ffaa] text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-chinese)' }}>
                    灵魂提取完成
                  </div>
                  <p className="text-[#a0a0b0] text-sm" style={{ fontFamily: 'var(--font-chinese)' }}>
                    AI 已分析出你的灵魂特质
                  </p>
                </div>
              ) : isScanning ? (
                <div className="text-center">
                  <div
                    className="text-[#00f2ff] text-xl font-bold mb-4"
                    style={{ fontFamily: 'var(--font-chinese)' }}
                  >
                    正在提取灵魂数据... {Math.round(scanProgress)}%
                  </div>
                  <div className="w-64 h-1 bg-[#1a1a2e] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${scanProgress}%`,
                        background: 'linear-gradient(90deg, #00f2ff, #9b5de5)',
                        boxShadow: '0 0 10px rgba(0, 242, 255, 0.5)',
                      }}
                    />
                  </div>
                </div>
              ) : uploadedFile ? (
                <>
                  <FileCheck className="w-16 h-16 mb-4 text-[#80ffaa]" />
                  <p
                    className="text-[#f0f0f5] text-base mb-1 text-center"
                    style={{ fontFamily: 'var(--font-chinese)' }}
                  >
                    已选择文件：{uploadedFile}
                  </p>
                  <p
                    className="text-[#a0a0b0] text-sm text-center"
                    style={{ fontFamily: 'var(--font-chinese)' }}
                  >
                    点击开始灵魂提取
                  </p>
                </>
              ) : (
                <>
                  <UploadCloud
                    className={`w-16 h-16 mb-4 transition-colors duration-300 ${
                      isDragging ? 'text-[#00f2ff]' : 'text-[rgba(0,242,255,0.5)]'
                    }`}
                  />
                  <p
                    className="text-[#a0a0b0] text-base mb-2 text-center"
                    style={{ fontFamily: 'var(--font-chinese)' }}
                  >
                    拖拽文件到此处 或 点击上传
                  </p>
                  <p className="text-[#a0a0b0] text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                    .txt .mp3 .wav .mp4
                  </p>
                </>
              )}
            </div>

            {/* Scan Button */}
            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={handleClick}
                disabled={isScanning}
                className="btn-liquid neon-pulse-blue disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning ? '提取中...' : uploadedFile ? '开始灵魂提取' : '选择文件'}
              </button>

              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#80ffaa]" />
                <span
                  className="text-[#a0a0b0] text-sm"
                  style={{ fontFamily: 'var(--font-chinese)' }}
                >
                  数据全程端侧处理，不上传云端
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes flash {
          0% { opacity: 0.3; }
          50% { opacity: 0.1; }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
