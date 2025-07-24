"use client";

import React, { useEffect, useRef, useState } from "react";

interface ChatMessage {
  sender: "user" | "assistant";
  text: string;
}

interface SelectionPopup {
  show: boolean;
  x: number;
  y: number;
  text: string;
}

export default function AIChatAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedContext, setSelectedContext] = useState("");
  const [selectionPopup, setSelectionPopup] = useState<SelectionPopup>({
    show: false,
    x: 0,
    y: 0,
    text: "",
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom and clear browser selection whenever the chat opens or new messages arrive
  useEffect(() => {
    if (isOpen && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      window.getSelection()?.removeAllRanges();
    }
  }, [isOpen, messages]);

  // Show/hide the “Add as context” popup when the user selects text
  useEffect(() => {
    const handleMouseUp = () => {
      const sel = window.getSelection();
      if (sel && sel.toString().trim().length > 0) {
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (rect.width > 0 || rect.height > 0) {
          const popupHeight = 40;
          const spaceBelow = window.innerHeight - rect.bottom;
          const popupY =
            spaceBelow > popupHeight + 10
              ? rect.bottom + 10
              : rect.top - popupHeight;
          setSelectionPopup({
            show: true,
            x: rect.left + rect.width / 2,
            y: popupY,
            text: sel.toString().trim(),
          });
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Hide the popup if the click is anywhere other than the popup itself
      if (!target.closest(".selection-popup")) {
        setSelectionPopup((p) => ({ ...p, show: false }));
      }
    };

    // Use mouseup with capture to ensure it works across all components
    window.addEventListener("mouseup", handleMouseUp, true);
    // Use mousedown to hide the popup
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp, true);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  const addContextFromSelection = () => {
    setSelectedContext(selectionPopup.text);
    setSelectionPopup({ show: false, x: 0, y: 0, text: "" });
    setIsOpen(true);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { sender: "user", text: input };
    const context =
      selectedContext ||
      window.getSelection()?.toString() ||
      document.body.innerText.slice(0, 2000);

    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    setInput("");

    // clear context after sending
    setSelectedContext("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, context }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { sender: "assistant", text: data.answer },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { sender: "assistant", text: "Sorry, I encountered an error." },
      ]);
    }
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {selectionPopup.show && (
        <div
          className="selection-popup fixed z-50 bg-blue-600 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium cursor-pointer hover:bg-blue-700 transition-colors"
          style={{
            left: `${selectionPopup.x}px`,
            top: `${selectionPopup.y}px`,
            transform: "translateX(-50%)",
          }}
          onClick={addContextFromSelection}
        >
          💬 Add as context
        </div>
      )}

      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
        title="AI Assistant"
      >
        {/* chat icon */}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="chat-window-root fixed bottom-20 right-4 z-40 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl flex flex-col max-h-[70vh]">
          <div className="bg-blue-600 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">AI Assistant</h3>
            <div>
              <button
                onClick={handleClearChat}
                className="text-white hover:text-gray-200 p-1 rounded-full"
                title="Clear Chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 p-1 rounded-full ml-1"
                title="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto p-3 space-y-3 min-h-[300px] max-h-[400px]"
          >
            {messages.length === 0 && (
              <div className="text-gray-500 text-sm text-center py-4">
                👋 Hi! I'm here to help you with signal processing questions.
                <br />
                <br />
                💡 <strong>Tip:</strong> Select text on the page and ask me
                about it for context-specific help!
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap break-words">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700">
            {selectedContext && (
              <div className="mb-2 p-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700 dark:text-blue-300 font-medium">
                    📋 Context added
                  </span>
                  <button
                    onClick={() => setSelectedContext("")}
                    className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-blue-600 dark:text-blue-400 mt-1 truncate">
                  &quot;{selectedContext.slice(0, 60)}...&quot;
                </div>
              </div>
            )}
            <div className="flex space-x-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={2}
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ask about signal processing..."
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
