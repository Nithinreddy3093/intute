import { useEffect, useRef } from 'react';
import { useSessionStore, useUser } from '../lib/state';

export default function ConversationView() {
  const transcript = useSessionStore(state => state.transcript);
  const userName = useUser(state => state.name) || 'You';
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [transcript]);

  return (
    <section className="conversation-view" aria-label="Lesson chat">
      <div className="conversation-header">
        <div>
          <h2>Lesson chat</h2>
          <p>Your voice conversation is saved in this browser.</p>
        </div>
        <span className="conversation-count">
          {transcript.length} {transcript.length === 1 ? 'message' : 'messages'}
        </span>
      </div>

      <div
        className="conversation-list"
        role="log"
        aria-live="polite"
        aria-label="Voice conversation transcript"
      >
        {transcript.length === 0 ? (
          <div className="conversation-empty">
            <span className="material-symbols-outlined">forum</span>
            <h3>No conversation yet</h3>
            <p>Start a voice lesson. Your questions and your teacher’s replies will appear here.</p>
          </div>
        ) : (
          transcript.map((entry, index) => {
            const speaker = entry.speaker?.trim() || 'You';
            const isSystem = speaker.toLowerCase() === 'system';
            const isUser =
              !isSystem &&
              (!entry.speaker ||
                speaker.toLowerCase() === 'user' ||
                speaker.toLowerCase() === 'you' ||
                speaker === userName);

            return (
              <article
                key={`${index}-${speaker}`}
                className={`conversation-message ${isSystem ? 'from-system' : isUser ? 'from-user' : 'from-agent'}`}
              >
                <div className="conversation-speaker">
                  {isSystem ? 'Session note' : isUser ? userName : speaker}
                </div>
                <div className="conversation-text">{entry.text}</div>
              </article>
            );
          })
        )}
        <div ref={bottomRef} />
      </div>
    </section>
  );
}
