'use client';

import { useState, useEffect, useRef } from 'react';
import { fetchConversations } from '@/services/api';
import { ConversationWithUser, Message } from '@/types/database';
import { cn } from '@/lib/utils';
import {
    Search,
    Send,
    Phone,
    Video,
    MoreVertical,
    Check,
    CheckCheck,
    Smile,
    Paperclip,
    ArrowLeft,
    MessageSquare,
    User,
} from 'lucide-react';

const CURRENT_USER_ID = 'usr_002';

function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

// ─── Contact List Panel ───────────────────────────────────────────────
function ContactList({
    conversations,
    selectedId,
    onSelect,
    searchQuery,
    onSearchChange,
}: {
    conversations: ConversationWithUser[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    searchQuery: string;
    onSearchChange: (q: string) => void;
}) {
    const filtered = conversations.filter((c) =>
        c.otherUser.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-200 bg-white">
                <h2 className="text-xl font-bold text-slate-900 mb-3">Chats</h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search or start new chat"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-slate-100 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:bg-white border border-transparent focus:border-indigo-300 transition-all"
                    />
                </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
                {filtered.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-sm">
                        No conversations found
                    </div>
                ) : (
                    filtered.map((conv) => {
                        const isSelected = selectedId === conv.id;
                        return (
                            <button
                                key={conv.id}
                                onClick={() => onSelect(conv.id)}
                                className={cn(
                                    'w-full flex items-center gap-3 px-5 py-4 text-left transition-colors border-b border-slate-100 hover:bg-slate-50',
                                    isSelected && 'bg-indigo-50 border-l-4 border-l-indigo-500 hover:bg-indigo-50'
                                )}
                            >
                                {/* Avatar */}
                                <div className={cn(
                                    'h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-sm',
                                    isSelected
                                        ? 'bg-gradient-to-br from-indigo-500 to-indigo-700'
                                        : 'bg-gradient-to-br from-slate-400 to-slate-500'
                                )}>
                                    {conv.otherUser.full_name.split(' ').map(n => n[0]).join('')}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="font-semibold text-slate-900 text-sm truncate">
                                            {conv.otherUser.full_name}
                                        </span>
                                        <span className="text-xs text-slate-400 flex-shrink-0 ml-2">
                                            {conv.last_message_at && formatDate(conv.last_message_at)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-slate-500 truncate max-w-[180px]">
                                            {conv.last_message}
                                        </p>
                                        {conv.unread_count > 0 && (
                                            <span className="flex-shrink-0 ml-2 h-5 min-w-5 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center px-1.5">
                                                {conv.unread_count}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}

// ─── Message Bubble ───────────────────────────────────────────────────
function MessageBubble({ message, isSent }: { message: Message; isSent: boolean }) {
    return (
        <div className={cn('flex mb-3', isSent ? 'justify-end' : 'justify-start')}>
            <div
                className={cn(
                    'max-w-[75%] rounded-2xl px-4 py-2.5 shadow-sm relative',
                    isSent
                        ? 'bg-indigo-500 text-white rounded-br-md'
                        : 'bg-white text-slate-800 rounded-bl-md border border-slate-100'
                )}
            >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className={cn(
                    'flex items-center gap-1 mt-1',
                    isSent ? 'justify-end' : 'justify-end'
                )}>
                    <span className={cn(
                        'text-[10px]',
                        isSent ? 'text-indigo-200' : 'text-slate-400'
                    )}>
                        {formatTime(message.created_at)}
                    </span>
                    {isSent && (
                        message.is_read
                            ? <CheckCheck className="h-3.5 w-3.5 text-indigo-200" />
                            : <Check className="h-3.5 w-3.5 text-indigo-200" />
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Chat Window Panel ────────────────────────────────────────────────
function ChatWindow({
    conversation,
    onBack,
}: {
    conversation: ConversationWithUser;
    onBack: () => void;
}) {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>(conversation.messages);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages(conversation.messages);
    }, [conversation]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        const newMsg: Message = {
            id: `msg_new_${Date.now()}`,
            conversation_id: conversation.id,
            sender_id: CURRENT_USER_ID,
            content: inputValue.trim(),
            created_at: new Date().toISOString(),
            is_read: false,
        };
        setMessages((prev) => [...prev, newMsg]);
        setInputValue('');
    };

    return (
        <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="px-5 py-3 border-b border-slate-200 bg-white flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 text-slate-600" />
                </button>

                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {conversation.otherUser.full_name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-sm">
                        {conversation.otherUser.full_name}
                    </h3>
                    <p className="text-xs text-emerald-500 font-medium">online</p>
                </div>

                <div className="flex items-center gap-1">
                    <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
                        <Phone className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
                        <Video className="h-5 w-5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div
                className="flex-1 overflow-y-auto px-5 py-4"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e2e8f0' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundColor: '#f0f2f5',
                }}
            >
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isSent={msg.sender_id === CURRENT_USER_ID}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-4 py-3 border-t border-slate-200 bg-white flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500">
                    <Smile className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-500">
                    <Paperclip className="h-5 w-5" />
                </button>

                <input
                    type="text"
                    placeholder="Type a message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-slate-100 rounded-full px-5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:bg-white border border-transparent focus:border-indigo-300 transition-all"
                />

                <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className={cn(
                        'p-2.5 rounded-full transition-all shadow-sm',
                        inputValue.trim()
                            ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/30'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    )}
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}

// ─── Empty State ──────────────────────────────────────────────────────
function EmptyChatState() {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-slate-50 text-center px-8">
            <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center mb-5">
                <MessageSquare className="h-10 w-10 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
                Peer2Peer Messaging
            </h3>
            <p className="text-sm text-slate-500 max-w-xs">
                Select a conversation to start chatting with your peers, mentors, and alumni.
            </p>
        </div>
    );
}

// ─── Messages Page ────────────────────────────────────────────────────
export default function MessagesPage() {
    const [conversations, setConversations] = useState<ConversationWithUser[]>([]);
    const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showChat, setShowChat] = useState(false); // mobile: toggle between list and chat

    useEffect(() => {
        fetchConversations(CURRENT_USER_ID).then((data) => {
            setConversations(data);
            setIsLoading(false);
        });
    }, []);

    const selectedConversation = conversations.find((c) => c.id === selectedConvId);

    const handleSelectConversation = (id: string) => {
        setSelectedConvId(id);
        setShowChat(true);
    };

    const handleBack = () => {
        setShowChat(false);
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden" style={{ height: 'calc(100vh - 7rem)' }}>
                <div className="flex h-full">
                    <div className="w-full lg:w-96 border-r border-slate-200 p-5 space-y-4">
                        <div className="h-8 bg-slate-100 rounded-lg animate-pulse w-24" />
                        <div className="h-10 bg-slate-100 rounded-lg animate-pulse" />
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-slate-100 animate-pulse" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-4 bg-slate-100 rounded animate-pulse w-3/4" />
                                    <div className="h-3 bg-slate-100 rounded animate-pulse w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            style={{ height: 'calc(100vh - 7rem)' }}
        >
            <div className="flex h-full overflow-hidden">
                {/* Left: Contact List */}
                <div className={cn(
                    'lg:w-96 border-r border-slate-200 flex-shrink-0 overflow-hidden',
                    showChat ? 'hidden lg:flex lg:flex-col w-0 lg:w-96' : 'w-full lg:w-96 flex flex-col'
                )}>
                    <ContactList
                        conversations={conversations}
                        selectedId={selectedConvId}
                        onSelect={handleSelectConversation}
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </div>

                {/* Right: Chat Window */}
                <div className={cn(
                    'flex-1 min-w-0 flex flex-col overflow-hidden',
                    showChat ? 'flex' : 'hidden lg:flex'
                )}>
                    {selectedConversation ? (
                        <ChatWindow
                            conversation={selectedConversation}
                            onBack={handleBack}
                        />
                    ) : (
                        <EmptyChatState />
                    )}
                </div>
            </div>
        </div>
    );
}
