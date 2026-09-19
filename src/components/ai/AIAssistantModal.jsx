import React, { useState, useRef, useEffect } from 'react';
import { useAgriStore } from '../../context/AgriStoreContext';
import { getAgriculturalAdvice } from '../../services/aiAdvisor';
import {
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Key,
  ShieldAlert,
  HelpCircle,
  RefreshCw,
  CornerDownLeft
} from 'lucide-react';

export const AIAssistantModal = ({ isOpen, onClose }) => {
  const { language, t, geminiApiKey, setGeminiApiKey, weather } = useAgriStore();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: language === 'hi'
        ? "नमस्ते किसान भाई! 🙏 मैं आपका KrishiSetu एआई सहायक हूँ। अपनी फसल, कीट, रोग, सिंचाई या सरकारी योजनाओं के बारे में कुछ भी पूछें। आप बोलकर (माइक) भी पूछ सकते हैं!"
        : language === 'mr'
        ? "नमस्कार शेतकरी मित्रांनो! 🙏 मी आपला KrishiSetu कृषी सहाय्यक आहे. पिक, खते, रोग, हवामान किंवा शासकीय योजनांबद्दल कोणताही प्रश्न विचारा. आपण आवाजातही बोलू शकता!"
        : "Hello Farmer! 🙏 I am your KrishiSetu AI Assistant. Ask me anything about crop diseases, pests, fertilizers, irrigation schedules, or government subsidies. You can type or use the microphone to speak!",
      source: 'KrishiSetu AI',
      disclaimer: false
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(geminiApiKey);

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Speech to Text (Voice Input)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser. Please type your query.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
        setIsListening(false);
      }
    }
  };

  // Text to Speech (Voice Output)
  const speakText = (text) => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Strip markdown formatting for cleaner audio
    const cleanText = text.replace(/[*_#`~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
    utterance.rate = 0.95;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (customPrompt = null) => {
    const textToSend = customPrompt || inputText;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await getAgriculturalAdvice(textToSend, language, geminiApiKey, weather);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: response.text,
        source: response.source,
        confidence: response.confidence,
        disclaimer: response.disclaimerRequired
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: "Sorry, I had trouble retrieving advice. Please try again or consult your local KVK officer.",
          source: 'Error',
          disclaimer: false
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = language === 'hi' ? [
    "कपास की पत्तियां पीली पड़ रही हैं, क्या करूं?",
    "गुलाबी सुंडी (Pink Bollworm) का जैविक नियंत्रण?",
    "कल बारिश होगी? क्या सिंचाई टालनी चाहिए?",
    "ट्रैक्टर व रोटावेटर पर 50% सरकारी सब्सिडी कैसे लें?"
  ] : language === 'mr' ? [
    "कापसाची पाने पिवळी पडत आहेत, काय उपाय?",
    "गुलाबी बोंडअळी नियंत्रणासाठी सेंद्रिय उपाय?",
    "उद्या पाऊस पडेल का? पाणी कधी द्यावे?",
    "रोटाव्हेटर व ट्रॅक्टर अनुदानासाठी कोणती योजना आहे?"
  ] : [
    "Why are my cotton leaves turning yellow?",
    "How to manage pink bollworm organically?",
    "Will it rain tomorrow? Should I irrigate?",
    "Which scheme gives 50% subsidy on rotavators?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col h-[90vh] max-h-[750px] overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-700 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base tracking-tight">{t.ai.title}</h3>
                <span className="text-[10px] bg-emerald-500/40 text-emerald-100 px-2 py-0.5 rounded-full font-semibold border border-emerald-400/30">
                  {geminiApiKey ? 'Gemini 1.5 Live' : 'Agri-Expert Core'}
                </span>
              </div>
              <p className="text-xs text-emerald-100/80">{t.ai.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowKeyModal(true)}
              className="p-1.5 text-emerald-100 hover:text-white hover:bg-white/10 rounded-lg transition"
              title="Configure Gemini API Key"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-emerald-100 hover:text-white hover:bg-white/10 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gemini Key Config Overlay */}
        {showKeyModal && (
          <div className="bg-amber-50 border-b border-amber-200 p-4 animate-in slide-in-from-top">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5" /> Optional Gemini API Key
              </span>
              <button onClick={() => setShowKeyModal(false)} className="text-amber-700 hover:text-amber-900">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-amber-800 mb-2">
              Add your Google Gemini API key to unlock real-time generative multi-modal reasoning. (The built-in expert engine works without any key!)
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
              />
              <button
                onClick={() => {
                  setGeminiApiKey(tempApiKey);
                  setShowKeyModal(false);
                }}
                className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-lg text-xs font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/70">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                  m.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-br-none'
                    : 'bg-white text-stone-800 border border-stone-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line prose prose-xs max-w-none">
                  {m.text}
                </div>

                {m.sender === 'ai' && (
                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {m.source}
                    </span>

                    <button
                      onClick={() => speakText(m.text)}
                      className="text-stone-500 hover:text-emerald-700 flex items-center gap-1 p-1 hover:bg-stone-100 rounded transition"
                      title="Read Aloud"
                    >
                      {isSpeaking ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                          <span className="text-rose-600 font-semibold">Stop</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Listen</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {m.disclaimer && (
                <div className="flex items-center gap-1 text-[10px] text-stone-500 mt-1 max-w-[85%] px-1">
                  <ShieldAlert className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>Always verify chemical dosages with local Krishi Vigyan Kendra (KVK).</span>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-stone-500 bg-white p-3 rounded-xl border border-stone-200 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>Krishi AI is analyzing agronomic data...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-white border-t border-stone-100 overflow-x-auto">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Quick Questions (Click to Ask)
          </p>
          <div className="flex gap-2 pb-1">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] whitespace-nowrap bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 px-3 py-1.5 rounded-full border border-stone-200 transition shrink-0"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Mic button for voice input */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-600 animate-pulse ring-4 ring-rose-200'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
              }`}
              title={isListening ? "Listening... Speak now!" : "Click to speak in Hindi/Marathi/English"}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {/* Input field */}
            <input
              type="text"
              placeholder={isListening ? "Listening to your voice..." : t.ai.inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-stone-50"
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl shadow transition"
              title="Send Query"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
