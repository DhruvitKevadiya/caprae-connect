import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Search, MessageCircle } from 'lucide-react';
import { mockBuyers, mockMessages, Message } from '@/data/mockData';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockBuyers[0]?.id || '');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations based on search
  const filteredConversations = mockBuyers.filter(buyer =>
    buyer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: 'current',
      content: newMessage,
      timestamp: new Date(),
      type: 'sent'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate response after a delay
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedConversation,
        content: "Thanks for your message! I'll review this and get back to you soon.",
        timestamp: new Date(),
        type: 'received'
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const selectedBuyer = mockBuyers.find(buyer => buyer.id === selectedConversation);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Messages</h1>
          <p className="text-neutral-600 mt-1">
            Communicate with potential buyers and sellers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-12rem)]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {filteredConversations.map((buyer) => {
                  const isSelected = buyer.id === selectedConversation;
                  const hasUnread = Math.random() > 0.7; // Simulate unread messages
                  
                  return (
                    <button
                      key={buyer.id}
                      onClick={() => setSelectedConversation(buyer.id)}
                      className={`w-full p-4 text-left hover:bg-neutral-50 transition-colors border-b border-neutral-100 ${
                        isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                            {buyer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-neutral-900 truncate">
                              {buyer.name}
                            </p>
                            {hasUnread && (
                              <Badge variant="destructive" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-neutral-600 truncate">
                            {buyer.industries[0]} • {buyer.budget}
                          </p>
                          <p className="text-xs text-neutral-500 mt-1">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedBuyer ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b border-neutral-200">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                        {selectedBuyer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {selectedBuyer.name}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {selectedBuyer.industries.join(', ')} • {selectedBuyer.location}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.type === 'sent' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.type === 'sent'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-neutral-100 text-neutral-900'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.type === 'sent'
                                ? 'text-primary-foreground/70'
                                : 'text-neutral-500'
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Message Input */}
                <div className="p-4 border-t border-neutral-200">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      variant="corporate"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-neutral-600">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;