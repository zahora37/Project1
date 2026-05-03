'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: "Hi! I'm the Wild Roots assistant 🌿 Ask me anything about landscaping, our services, or book a free consultation!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: data.reply || 'Sorry, something went wrong. Please try again.'
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Connection error. Please call us at (805) 478-2466.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .wr-chat-widget * { box-sizing: border-box; font-family: 'Georgia', serif; }
        .wr-chat-bubble { 
          position: fixed; bottom: 24px; right: 24px; z-index: 9999;
        }
        .wr-chat-toggle {
          width: 60px; height: 60px; border-radius: 50%;
          background: #3a5a40; color: white; border: none;
          font-size: 26px; cursor: pointer;
          box-shadow: 0 4px 20px rgba(58,90,64,0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .wr-chat-toggle:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(58,90,64,0.5); }
        .wr-chat-window {
          position: absolute; bottom: 72px; right: 0;
          width: 340px; background: #fff; border-radius: 16px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
          display: flex; flex-direction: column; overflow: hidden;
          max-height: 500px;
          animation: wr-slide-up 0.25s ease;
        }
        @keyframes wr-slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .wr-chat-header {
          background: #3a5a40; color: white;
          padding: 14px 16px; display: flex; justify-content: space-between; align-items: center;
        }
        .wr-chat-header-title { font-size: 15px; font-weight: 600; letter-spacing: 0.3px; }
        .wr-chat-header-sub { font-size: 11px; opacity: 0.8; margin-top: 2px; }
        .wr-chat-close {
          background: none; border: none; color: white; font-size: 20px;
          cursor: pointer; padding: 0; line-height: 1; opacity: 0.8;
        }
        .wr-chat-close:hover { opacity: 1; }
        .wr-chat-messages {
          flex: 1; overflow-y: auto; padding: 14px;
          display: flex; flex-direction: column; gap: 10px;
          background: #fafaf8;
        }
        .wr-msg {
          max-width: 82%; padding: 9px 13px;
          border-radius: 12px; font-size: 13.5px; line-height: 1.5;
          word-break: break-word;
        }
        .wr-msg-user {
          align-self: flex-end; background: #3a5a40; color: white;
          border-bottom-right-radius: 4px;
        }
        .wr-msg-assistant {
          align-self: flex-start; background: #f0ebe3; color: #2c2c2c;
          border-bottom-left-radius: 4px;
        }
        .wr-typing {
          align-self: flex-start; padding: 10px 14px;
          background: #f0ebe3; border-radius: 12px; border-bottom-left-radius: 4px;
          display: flex; gap: 5px; align-items: center;
        }
        .wr-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #3a5a40; opacity: 0.5;
          animation: wr-bounce 1.2s infinite;
        }
        .wr-dot:nth-child(2) { animation-delay: 0.2s; }
        .wr-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes wr-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
        .wr-chat-input-area {
          padding: 10px; border-top: 1px solid #e8e3db;
          display: flex; gap: 8px; background: #fff;
        }
        .wr-chat-input {
          flex: 1; padding: 9px 12px;
          border: 1px solid #ddd; border-radius: 8px;
          font-size: 13.5px; outline: none; font-family: inherit;
          color: #2c2c2c; background: #fafaf8;
          transition: border-color 0.2s;
        }
        .wr-chat-input:focus { border-color: #3a5a40; }
        .wr-chat-send {
          background: #3a5a40; color: white; border: none;
          padding: 9px 14px; border-radius: 8px;
          font-size: 13px; cursor: pointer; font-family: inherit;
          transition: background 0.2s; white-space: nowrap;
        }
        .wr-chat-send:hover { background: #2d4731; }
        .wr-chat-send:disabled { opacity: 0.6; cursor: not-allowed; }
        .wr-book-link {
          color: #3a5a40; text-decoration: underline; font-weight: 600;
        }
        @media (max-width: 400px) {
          .wr-chat-window { width: calc(100vw - 32px); right: 0; }
        }
      `}</style>

      <div className="wr-chat-bubble">
        {open && (
          <div className="wr-chat-window">
            <div className="wr-chat-header">
              <div>
                <div className="wr-chat-header-title">🌿 Wild Roots Assistant</div>
                <div className="wr-chat-header-sub">Ask about services or book a consultation</div>
              </div>
              <button className="wr-chat-close" onClick={() => setOpen(false)}>×</button>
            </div>

            <div className="wr-chat-messages">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`wr-msg ${m.role === 'user' ? 'wr-msg-user' : 'wr-msg-assistant'}`}
                  dangerouslySetInnerHTML={{
                    __html: m.text.replace(
                      'https://calendly.com/wild-roots-custom/30min',
                      '<a href="https://calendly.com/wild-roots-custom/30min" target="_blank" class="wr-book-link">Book here</a>'
                    )
                  }}
                />
              ))}
              {loading && (
                <div className="wr-typing">
                  <div className="wr-dot" />
                  <div className="wr-dot" />
                  <div className="wr-dot" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="wr-chat-input-area">
              <input
                className="wr-chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Ask a question..."
                disabled={loading}
              />
              <button
                className="wr-chat-send"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
              >
                Send
              </button>
            </div>
          </div>
        )}

        <button
          className="wr-chat-toggle"
          onClick={() => setOpen(prev => !prev)}
          aria-label="Open chat assistant"
        >
          {open ? '×' : '💬'}
        </button>
      </div>
    </>
  );
}
