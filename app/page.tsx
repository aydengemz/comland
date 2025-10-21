'use client';

import { useState } from 'react';
import './globals.css';

type View = 'regionSelect' | 'lander';
type Region = 'US' | 'CA' | null;

export default function Home() {
  const [currentView, setCurrentView]     = useState<View>('regionSelect');
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);
  const affiliateBaseLink = 'https://uplevelrewarded.com/aff_c?offer_id=1232&aff_id=11848';
  const affiliateLink     = affiliateBaseLink + (selectedRegion ? `&sub1=${selectedRegion}` : '');

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setCurrentView('lander');
  };

  // Even Darker Green theme
  // (Button: #002d13, Hover: #001b09, highlight: #003d19, background: #d8f5e1, text: #002d13)
  const cashGreen = "#002d13";             // even darker green for main theme and buttons
  const cashGreenDarker = "#001b09";       // darkest green for button hover/focus/borders
  const cashGreenHighlight = "#003d19";    // highlight/variant for step/accents
  const containerBaseStyle  = `flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-[#d8f5e1] text-[${cashGreen}]`;
  const cardBaseStyle       = `bg-white p-4 py-6 sm:p-6 sm:py-8 rounded-lg shadow-lg w-full max-w-sm border border-[${cashGreen}]`;

  // Button: dark green, bold border, white text, darker on hover/focus
  const primaryButtonStyle  = `
    w-full rounded-md border border-[${cashGreenDarker}]
    transition-colors flex items-center justify-center
    bg-[${cashGreen}] text-white gap-3 font-bold text-base h-11 sm:h-12 px-5 sm:px-7 shadow-lg
    hover:bg-[${cashGreenDarker}]
    focus:outline-none focus:ring-2 focus:ring-[${cashGreenDarker}] focus:ring-offset-2
    uppercase tracking-wide
  `.replace(/\s+/g, ' ').trim();

  const stepNumberStyle     = `flex-shrink-0 bg-[${cashGreenHighlight}] text-white rounded-full h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center font-bold text-xs`;
  const stepTitleStyle      = 'font-semibold text-sm sm:text-base text-[${cashGreen}]';

  // ❶ Region selector
  if (currentView === 'regionSelect') {
    return (
      <div className={containerBaseStyle}>
        <main className={`${cardBaseStyle} text-center`}>
          <h1 className="text-lg sm:text-xl font-bold mb-3" style={{ color: cashGreen }}>Select Your Region</h1>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleRegionSelect('US')}
              className={primaryButtonStyle}
              style={{ backgroundColor: cashGreenDarker, borderColor: cashGreenDarker }}
            >
              <span role="img" aria-label="USA Flag">🇺🇸</span> <span className="font-extrabold drop-shadow">United States</span>
            </button>
            <button
              onClick={() => handleRegionSelect('CA')}
              className={primaryButtonStyle}
              style={{ backgroundColor: cashGreenDarker, borderColor: cashGreenDarker }}
            >
              <span role="img" aria-label="Canada Flag">🇨🇦</span> <span className="font-extrabold drop-shadow">Canada</span>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-5">
            We&apos;ll customize your experience based on your location.
          </p>
        </main>
        <footer className="mt-5 text-center text-xs text-[${cashGreenHighlight}] opacity-80">
          <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="/privacy-policy" className="hover:underline">Privacy</a>
            <a href="/terms-of-service" className="hover:underline">Terms</a>
          </div>
        </footer>
      </div>
    );
  }

  // ❷ Main lander
  if (currentView === 'lander') {
    const handleClaim = async () => {
      try {
        const res = await fetch('/api/log-click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ region: selectedRegion })
        });
        const { isLikelyRealDevice } = await res.json();
        if (isLikelyRealDevice) {
          window.location.href = affiliateLink;
        } else {
          window.location.href = "https://milkmochabear.com/products/matcha-plush";
        }
      } catch (err) {
        console.error(err);
        alert('Unexpected error—please try again.');
      }
    };

    return (
      <div className={containerBaseStyle}>
        <main className={`${cardBaseStyle} text-left`}>
          <h1 className="mb-4 text-2xl sm:text-3xl text-center font-extrabold" style={{ color: cashGreen }}>How It Works:</h1>
          <div className="space-y-3 mb-5">
            {[ 
              'Tap "Claim Now!" Button Below',
              'Enter Your Basic Information',
              'Complete 2-5 Partner Offers',
              'Receive Your Balance & Repeat'
            ].map((title, i) => (
              <div 
                key={i} 
                className={`flex items-start gap-3 p-3 bg-[#e6faed] rounded-md shadow-sm border border-[${cashGreenHighlight}]`}
                style={{ color: "#171717" }} // Make instructions text black
              >
                <div className={stepNumberStyle} style={{ color: "#171717" }}>{i+1}</div>
                <h3 className={stepTitleStyle} style={{ color: "#171717" }}>{title}</h3>
              </div>
            ))}
          </div>
          <button
            onClick={handleClaim}
            className={`${primaryButtonStyle} w-full text-md font-black py-3 drop-shadow`}
            style={{
              letterSpacing: "0.04em",
              fontSize: "1.13rem",
              textShadow: "0 2px 6px #001b09cc",
              backgroundColor: cashGreen,              // Make button background green
              color: "white",                          // Button text white
              borderColor: cashGreen,
            }}>
            Claim Now!
          </button>
          <p className="text-xs text-[${cashGreenHighlight}] mt-4 text-center">
            <b>Tip:</b> The more offers you complete, the more you may earn!
          </p>
        </main>
        <footer className="mt-4 text-center text-xs text-[${cashGreenHighlight}] opacity-80">
          <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
          {selectedRegion && <p className="text-[0.7rem] mt-0.5">Region: {selectedRegion}</p>}
          <div className="mt-2 flex justify-center gap-4">
            <a href="/privacy-policy" className="hover:underline">Privacy</a>
            <a href="/terms-of-service" className="hover:underline">Terms</a>
            <a href="/affiliate-disclosure" className="hover:underline">Disclosure</a>
          </div>
        </footer>
      </div>
    );
  }

  // ❸ Fallback
  return (
    <div className={containerBaseStyle}>
      <p>Loading, please wait…</p>
    </div>
  );
}
