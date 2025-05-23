import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

type MessageType = 'bot' | 'user';

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
}

/**
 * AI-Powered Chat Assistant widget with pre-sales question flow
 */
const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize chat with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: '1',
          type: 'bot',
          content: "Hi there! I'm NexaBot, your digital assistant. How can I help you today?",
          timestamp: new Date()
        }
      ]);
    }
  }, []);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  
  const addMessage = (content: string, type: MessageType) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    addMessage(inputValue, 'user');
    
    // Clear input
    setInputValue('');
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      
      // Simple response logic - could be replaced with actual AI service
      const userMessage = inputValue.toLowerCase();
      let botResponse = "I'm not sure how to help with that. Would you like to speak with a human agent?";
      
      if (userMessage.includes('pricing') || userMessage.includes('cost')) {
        botResponse = "Our pricing starts at $2,000 for basic websites and varies based on your specific needs. Would you like me to help you estimate the cost of your project?";
      } else if (userMessage.includes('timeline') || userMessage.includes('how long')) {
        botResponse = "Most of our projects take 8-12 weeks to complete, but we also offer accelerated timelines if you need your project completed sooner.";
      } else if (userMessage.includes('services') || userMessage.includes('what do you do')) {
        botResponse = "We offer web development, UI/UX design, AI integration, e-commerce solutions, and mobile app development. Which service are you interested in learning more about?";
      } else if (userMessage.includes('contact') || userMessage.includes('talk to someone')) {
        botResponse = "You can reach our team at info@nexaweb.com or fill out the contact form on our website. Would you like me to direct you there?";
      }
      
      addMessage(botResponse, 'bot');
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-80 md:w-96 h-[500px] flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-primary p-4 text-white flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-6 w-6 mr-2" />
                <span className="font-bold">NexaBot Assistant</span>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChat}
                className="text-white hover:text-white/80 hover:bg-primary-700/50"
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close chat</span>
              </Button>
            </div>
            
            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex items-start ${message.type === 'bot' ? '' : 'justify-end'}`}
                  >
                    {message.type === 'bot' && (
                      <div className="flex-shrink-0 mr-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary">
                          <MessageSquare className="h-5 w-5" />
                        </div>
                      </div>
                    )}
                    <div 
                      className={`p-3 rounded-lg max-w-[80%] ${
                        message.type === 'bot' 
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100' 
                          : 'bg-primary text-white ml-3'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="block mt-1 text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}
                
                {/* Bot typing indicator */}
                {isTyping && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* Chat input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
                <Input
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping}>
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className="w-16 h-16 rounded-full bg-primary hover:bg-primary-700 text-white shadow-lg flex items-center justify-center transition-all"
            aria-label="Open chat assistant"
          >
            <MessageSquare className="h-8 w-8" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChatAssistant;
