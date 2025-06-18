import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { useRef } from "react";
import UserAvatar from "./UserAvatar";

const ChatContainer = () => {

    const {messages, isMessagesLoading, getMessages, selectedUser, subscribeToMessages, unsubscribeFromMessages} = useChatStore();
    const {authUser} = useAuthStore();
    const messagesEndRef = useRef(null);


    // get messages and subscribe to messages
    useEffect(() => {
        getMessages(selectedUser._id);

        subscribeToMessages();

        return () => unsubscribeFromMessages();

    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

    // scroll to bottom when new message is received
    useEffect(() => {
        if (messagesEndRef.current && messages) {
            messagesEndRef.current.scrollIntoView({behavior: "smooth"});
        }
    }, [messages]);

    // show skeleton while loading
    if (isMessagesLoading) {
        return (
            <div className="flex-1 flex flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            {/* messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(messages || []).map((message)=> (
                    <div
                        key={message._id}

                        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                        ref={messagesEndRef}
                    >
                        <div className="chat-image avatar">
                            <UserAvatar 
                                src={message.senderId === authUser._id 
                                    ? authUser.profilePicture 
                                    : selectedUser.profilePicture
                                } 
                                name={message.senderId === authUser._id 
                                    ? authUser.fullname 
                                    : selectedUser.fullname
                                }
                                size="sm"
                            />
                        </div>

                        <div className="chat-header mb-1">
                            <time text-xs opacity-50 ml-1>
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>

                        <div className={`chat-bubble flex flex-col ${message.senderId !== authUser._id ? 'bg-gradient-to-r from-[rgba(24,138,141,1)] to-[rgba(96,221,142,1)] text-white' : ''}`}>
                            {message.image && (
                                <img 
                                    src={message.image} 
                                    alt="Attachment" 
                                    className="sm:max-w-[200px] rounded-md mb-2" 
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;