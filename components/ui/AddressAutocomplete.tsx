'use client';

import { useRef, useEffect, useState } from 'react';

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = 'Enter address',
  required = false,
  className = '',
  disabled = false,
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    const options = {
      fields: ['formatted_address', 'geometry', 'name'],
      strictBounds: false,
    };

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, options);
    
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setInputValue(place.formatted_address);
        onChange(place.formatted_address);
      }
    });

    const applyCustomStyles = () => {
      const pacContainers = document.querySelectorAll('.pac-container');
      
      pacContainers.forEach(container => {
        Object.assign((container as HTMLElement).style, {
          backgroundColor: '#121212',
          border: '1px solid #333',
          borderRadius: '0.375rem',
          marginTop: '4px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
          padding: '0.5rem',
          zIndex: '9999',
          color: 'white'
        });
      });
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        const pacContainer = document.querySelector('.pac-container');
        if (pacContainer) {
          applyCustomStyles();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .pac-item {
        background-color: #121212;
        color: #eee;
        padding: 8px;
        cursor: pointer;
        border-top: 1px solid #333;
      }
      .pac-item:hover {
        background-color: #333;
      }
      .pac-item-query {
        color: #fff;
      }
      .pac-matched {
        color: #ff4444;
      }
      .pac-icon {
        filter: invert(1);
      }
    `;
    document.head.appendChild(styleElement);

    return () => {
      google.maps.event.clearInstanceListeners(autocomplete);
      observer.disconnect();
      document.head.removeChild(styleElement);
    };
  }, [onChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder={placeholder}
      required={required}
      className={className}
      disabled={disabled}
    />
  );
}