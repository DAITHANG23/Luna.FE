"use client";
import React, { useRef, useState } from "react";

interface OTPInputProps {
  onComplete: (otp: string) => void;
  length?: number;
  name?: string;
}
export const OTPInput = ({ name, length = 6, onComplete }: OTPInputProps) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Trigger completion callback
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el!;
          }}
          name={name}
          type="text"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          className="w-12 h-12 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-primary-text"
        />
      ))}
    </div>
  );
};
