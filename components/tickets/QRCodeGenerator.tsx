// components/tickets/QRCodeGenerator.tsx
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  data: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: "L" | "M" | "Q" | "H";
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  data,
  size = 200,
  bgColor = "#ffffff",
  fgColor = "#000000",
  level = "H",
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 blur-xl opacity-20 bg-gradient-to-br from-red-500 to-purple-600 rounded-full transform -translate-x-6 -translate-y-6"></div>

      <div className="relative bg-white p-3 rounded-2xl shadow-lg">
        <QRCodeSVG
          value={data}
          size={size}
          bgColor={bgColor}
          fgColor={fgColor}
          level={level}
        />
      </div>
    </div>
  );
};

export default QRCodeGenerator;