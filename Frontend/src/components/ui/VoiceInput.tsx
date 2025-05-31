
import React, { useState } from "react";
import { Mic, MicOff } from "lucide-react";

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, disabled = false }) => {
  const [isListening, setIsListening] = useState(false);

  // This is a simulated voice recognition function
  // In a real application, you would use the Web Speech API
  const toggleListening = () => {
    if (disabled) return;

    if (isListening) {
      setIsListening(false);
      // In a real app, you would stop the speech recognition here
    } else {
      setIsListening(true);
      // Simulate voice recognition with a timeout
      setTimeout(() => {
        const fakeTranscript = "This is a simulated voice transcript.";
        onTranscript(fakeTranscript);
        setIsListening(false);
      }, 3000);

      // In a real application, you would use something like:
      /*
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          onTranscript(transcript);
          setIsListening(false);
        };
        
        recognition.start();
      }
      */
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      disabled={disabled}
      className={`rounded-r-lg px-4 flex items-center justify-center ${
        isListening
          ? "bg-red-500 text-white"
          : "bg-assistant-primary text-white"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
    </button>
  );
};

export default VoiceInput;
