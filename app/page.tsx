'use client'; // Required for using React Hooks like useState

import { useState } from 'react';
import "./globals.css";

// Define types for better code management
type View = 'regionSelect' | 'lander';
type Region = 'US' | 'CA' | null;

export default function Home() {
  const [currentView, setCurrentView] = useState<View>('regionSelect');
  const [selectedRegion, setSelectedRegion] = useState<Region>(null);

  const affiliateBaseLink = "https://glstrck.com/aff_c?offer_id=1084&aff_id=11848";
  const affiliateLink = affiliateBaseLink; // You can append tracking params if needed: e.g. ${affiliateBaseLink}?sub1=${selectedRegion}

  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setCurrentView('lander');
  };

  // Ensure Raleway font is loaded in your project (e.g., in layout.tsx or global CSS)
  const containerBaseStyle = "flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 bg-[#e6fae8] text-slate-800";
  const cardBaseStyle = "bg-white p-4 py-6 sm:p-6 sm:py-8 rounded-lg shadow-lg w-full max-w-sm";
  // Adjusted sm:h-13 to sm:h-12 for standard Tailwind scale
  const primaryButtonStyle = "w-full rounded-md border border-transparent transition-colors flex items-center justify-center bg-[#03CF30] text-white gap-3 hover:bg-[#02b629] font-semibold text-base h-11 sm:h-12 px-5 sm:px-7 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#03CF30] focus:ring-offset-2";
  const secondaryButtonStyle = "w-auto rounded-md border border-[#03CF30] transition-colors flex items-center justify-center bg-white text-[#03CF30] gap-3 hover:bg-[#f0fff2] font-semibold text-sm h-10 px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#03CF30] focus:ring-offset-2";
  const stepNumberStyle = "flex-shrink-0 bg-[#03CF30] text-white rounded-full h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center font-bold text-xs";
  const stepTitleStyle = "font-semibold text-sm sm:text-base text-slate-700";


  // Buffer Page: Region Selection
  if (currentView === 'regionSelect') {
    return (
      <div className={containerBaseStyle}>
        <main className={`${cardBaseStyle} text-center`}>
          {/* Optional: Add your logo image here */}
          {/* <Image src="/your-logo.png" alt="Level Up Logo" width={120} height={40} className="mx-auto mb-4" /> */}
          <h1 className="text-lg sm:text-xl font-bold mb-3 text-[#03CF30]">Select Your Region</h1>
          <div className="flex flex-col gap-3 justify-center">
            <button
              onClick={() => handleRegionSelect('US')}
              className={primaryButtonStyle}
              aria-label="Select United States"
            >
              <span role="img" aria-label="USA Flag" className="mr-2 text-lg">🇺🇸</span> United States
            </button>
            <button
              onClick={() => handleRegionSelect('CA')}
              className={primaryButtonStyle}
              aria-label="Select Canada"
            >
              <span role="img" aria-label="Canada Flag" className="mr-2 text-lg">🇨🇦</span> Canada
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-5">
            We&apos;ll customize your experience based on your location.
          </p>
        </main>
        <footer className="mt-5 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="/privacy-policy" className="hover:underline">Privacy</a>
            <a href="/terms-of-service" className="hover:underline">Terms</a>
          </div>
        </footer>
      </div>
    );
  }

  // Main Lander Page
  if (currentView === 'lander') {
    return (
      <div className={containerBaseStyle}>
        <main className={`${cardBaseStyle} text-left`}>
          <h1 className="text-[#03CF30] mb-4 text-2xl sm:text-3xl text-center font-extrabold">
            How It Works:
          </h1>

          <div className="space-y-3 mb-5">
            <div className="flex items-start gap-3 p-3 bg-[#f0fff2] rounded-md shadow-sm">
              <div className={stepNumberStyle}>1</div>
              <div>
                {/* Corrected Step 1 text */}
                <h3 className={stepTitleStyle}>Tap &quot;Claim Now!&quot; Button Below</h3>
                {/* <p className={stepTextStyle}>Start by clicking the main button.</p> */}
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#f0fff2] rounded-md shadow-sm">
              <div className={stepNumberStyle}>2</div>
              <div>
                <h3 className={stepTitleStyle}>Enter Your Basic Information</h3>
                {/* <p className={stepTextStyle}>Provide a few details to get started.</p> */}
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#f0fff2] rounded-md shadow-sm">
              <div className={stepNumberStyle}>3</div>
              <div>
                <h3 className={stepTitleStyle}>Complete 2-5 Partner Offers</h3>
                {/* <p className={stepTextStyle}>Engage with a few offers from our partners.</p> */}
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#f0fff2] rounded-md shadow-sm">
              <div className={stepNumberStyle}>4</div>
              <div>
                <h3 className={stepTitleStyle}>Receive Your Balance & Repeat</h3>
                {/* <p className={stepTextStyle}>Enjoy your earnings and feel free to continue!</p> */}
              </div>
            </div>
          </div>

          <a
            href={affiliateLink}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className={`${primaryButtonStyle} w-full text-md font-bold py-3`}
          >
            Claim Now!
          </a>

          <p className="text-xs text-slate-500 mt-4 text-center">
            <b>Tip:</b> The more offers you complete, the more you may earn!
          </p>
        </main>

        <footer className="mt-4 text-center text-xs text-slate-500">
          {/* Added "Level Up" for consistency */}
          <p>&copy; {new Date().getFullYear()}. All Rights Reserved.</p>
          {selectedRegion && <p className="text-[0.7rem] mt-0.5">Region: {selectedRegion}</p>} {/* Optional: display selected region */}
          <div className="mt-2 flex justify-center gap-4">
            <a href="/privacy-policy" className="hover:underline">Privacy</a>
            <a href="/terms-of-service" className="hover:underline">Terms</a>
            <a href="/affiliate-disclosure" className="hover:underline">Disclosure</a>
          </div>
        </footer>
      </div>
    );
  }

  // Fallback
  return (
    <div className={containerBaseStyle}>
      <p>Loading, please wait...</p>
    </div>
  );
}