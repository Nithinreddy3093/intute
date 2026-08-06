/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useEffect, useState } from 'react';
import { useUI } from '../lib/state';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const transliterations = [
  'Intute',
  'インテュート', // Japanese
  '인튜트', // Korean
  '英图特', // Chinese
  'Интуте', // Russian
  'إنتوت', // Arabic
  'אינטוט', // Hebrew
  'इंट्यूट', // Hindi
  'อินทูต', // Thai
  'Ιντούτε', // Greek
  'İntute', // Turkish
  'Интуи', // Ukrainian (variant)
  'ინტუტე', // Georgian
  'இன்ட்யூட்', // Tamil
  'ಇಂಟ್ಯೂಟ್', // Kannada
  'ഇൻട്യൂട്ട്', // Malayalam
  'انٹیوٹ', // Urdu
  'Інтют', // Ukrainian
  'Intūte', // Latvian
  'Интюте', // Bulgarian
];


/**
 * The initial welcome screen for the application. It provides a brief
 * overview of the app's features and a prominent button to start the
 * configuration process.
 */
export default function WelcomeScreen() {
  const { setShowWelcomeScreen } = useUI();
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasKey, setHasKey] = useState(true); // Default to true to avoid flicker

  // Trigger the entrance animation shortly after the component mounts.
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Check if API key is selected
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();

    return () => clearTimeout(timer);
  }, []);

  /**
   * Handles the action to close the welcome screen. It triggers an exit
   * animation and then proceeds directly to the main application.
   */
  async function handleClose() {
    if (!hasKey && window.aistudio) {
      await window.aistudio.openSelectKey();
      // Proceed to the app after triggering the dialog as per instructions
    }
    
    setIsExiting(true);
    // Wait for the exit animation to complete before changing the UI state.
    setTimeout(() => {
      setShowWelcomeScreen(false);
    }, 800); // Wait for animation
  }

  return (
    <div
      className={`welcome-screen-shroud ${isVisible ? 'visible' : ''} ${
        isExiting ? 'exiting' : ''
      }`}
    >
      <div className="atmosphere" />
      <div className="floating-name-container">
        {transliterations.map((name, index) => (
          <div
            key={index}
            className="floating-name"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${1 + Math.random() * 1.5}rem`,
              animationDelay: `${Math.random() * 30}s`,
              animationDuration: `${20 + Math.random() * 20}s`,
            }}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="welcome-screen fancy-layout">
        <h1 className="welcome-title-fancy">Intute</h1>
        <p className="welcome-subtitle-fancy">Your live teaching assistant</p>
        <p className="welcome-author" style={{ opacity: 0.7, fontSize: '0.9rem', marginTop: '-0.5rem', marginBottom: '1.5rem', color: 'var(--theme-text)' }}>Created by Nithin Reddy</p>

        <button onClick={handleClose} className="teach-me-button">
          Teach me
          <span className="material-symbols-outlined icon-right">
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
