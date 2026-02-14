'use client';

import React, { useState } from 'react';
import html2canvas from 'html2canvas';

interface CardDownloadButtonProps {
  cardElementId: string;
  cardTitle?: string;
}

export const CardDownloadButton: React.FC<CardDownloadButtonProps> = ({
  cardElementId,
  cardTitle = 'valentine-card',
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const handleDownload = async (format: 'png' | 'jpeg') => {
    setIsDownloading(true);
    setDownloadComplete(false);

    try {
      const cardElement = document.getElementById(cardElementId);

      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const canvas = await html2canvas(cardElement, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
        imageTimeout: 0,
      });

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error('Failed to create image');
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const timestamp = new Date().toISOString().split('T')[0];

          link.download = `${cardTitle}-${timestamp}.${format}`;
          link.href = url;
          link.click();

          URL.revokeObjectURL(url);

          setDownloadComplete(true);

          setTimeout(() => {
            setIsDownloading(false);
            setDownloadComplete(false);
          }, 2000);
        },
        format === 'png' ? 'image/png' : 'image/jpeg',
        0.95
      );
    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      alert('Failed to download card. Please try again.');
    }
  };

  return (
    <div className="download-container">
      <div className={`wax-seal ${downloadComplete ? 'sealed' : ''}`}>
        <svg
          viewBox="0 0 100 100"
          className="seal-stamp"
          style={{
            filter: downloadComplete ? 'none' : 'grayscale(0.3)',
          }}
        >
          <circle cx="50" cy="50" r="48" fill="#8B1538" opacity="0.9" />
          <circle cx="50" cy="50" r="45" fill="#A01D48" />

          <path
            d="M50 65 Q35 55 35 45 Q35 35 45 35 Q50 40 50 40 Q50 40 55 35 Q65 35 65 45 Q65 55 50 65"
            fill="#8B1538"
            stroke="#6B0F2A"
            strokeWidth="1"
          />

          <ellipse cx="30" cy="90" rx="8" ry="4" fill="#8B1538" opacity="0.6" />
          <ellipse cx="70" cy="88" rx="6" ry="3" fill="#8B1538" opacity="0.6" />
          <ellipse cx="50" cy="92" rx="7" ry="4" fill="#8B1538" opacity="0.6" />
        </svg>

        {downloadComplete && (
          <div className="checkmark-overlay">
            <svg viewBox="0 0 52 52" className="checkmark">
              <circle cx="26" cy="26" r="25" fill="none" />
              <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
        )}
      </div>

      <div className="stamp-buttons">
        <button
          onClick={() => handleDownload('png')}
          disabled={isDownloading}
          className="stamp-btn png-stamp"
          aria-label="Download as PNG"
        >
          <div className="stamp-border">
            <div className="stamp-content">
              <span className="stamp-text">PNG</span>
              <div className="postmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleDownload('jpeg')}
          disabled={isDownloading}
          className="stamp-btn jpeg-stamp"
          aria-label="Download as JPEG"
        >
          <div className="stamp-border">
            <div className="stamp-content">
              <span className="stamp-text">JPEG</span>
              <div className="postmark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
            </div>
          </div>
        </button>
      </div>

      {isDownloading && <p>⏳ Downloading...</p>}
      {downloadComplete && <p>✅ Download complete!</p>}

      <style jsx>{`
        .download-container {
          padding: 2rem;
          text-align: center;
        }

        .wax-seal {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 2rem;
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .wax-seal.sealed {
          transform: rotate(360deg) scale(1.1);
        }

        .seal-stamp {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 8px rgba(139, 21, 56, 0.4));
          transition: transform 0.3s ease;
        }

        .wax-seal:hover .seal-stamp {
          transform: scale(1.05) rotate(-5deg);
        }

        .checkmark-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-in;
        }

        .checkmark {
          width: 60px;
          height: 60px;
          stroke: #FFF;
          stroke-width: 3;
        }

        .stamp-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          z-index: 2;
        }

        .stamp-btn {
          position: relative;
          padding: 0;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          font-family: 'Courier New', monospace;
        }

        .stamp-btn:hover:not(:disabled) {
          transform: translateY(-4px) rotate(-2deg);
        }

        .stamp-btn:active:not(:disabled) {
          transform: translateY(0) rotate(0deg);
        }

        .stamp-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .stamp-border {
          position: relative;
          padding: 4px;
          background: linear-gradient(135deg, #8B1538 0%, #A01D48 100%);
          filter: drop-shadow(0 4px 6px rgba(139, 21, 56, 0.3));
        }

        .stamp-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #FFF5F7 0%, #FFE8EC 100%);
          color: #8B1538;
        }

        .stamp-text {
          font-size: 1.25rem;
          font-weight: bold;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .postmark {
          width: 24px;
          height: 24px;
          opacity: 0.7;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CardDownloadButton;
