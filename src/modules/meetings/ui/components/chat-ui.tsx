// "use client";

// import { LoadingState } from "@/components/loading-state";
// import { useTRPC } from "@/trpc/client";
// import { useMutation } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import type { Channel as StreamChannel } from "stream-chat";
// import {
//   Channel,
//   Chat,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window,
//   useCreateChatClient,
// } from "stream-chat-react";
// import "stream-chat-react/dist/css/v2/index.css";

// interface Props {
//   meetingId: string;
//   meetingName: string;
//   userId: string;
//   userName: string;
//   userImage: string | undefined;
// }

// export const ChatUI = ({ meetingId, userId, userName, userImage }: Props) => {
//   const trpc = useTRPC();

//   const { mutateAsync: generateChatToken } = useMutation(
//     trpc.meetings.generateChatToken.mutationOptions()
//   );

//   const [channel, setChannel] = useState<StreamChannel>();

//   const client = useCreateChatClient({
//     apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
//     tokenOrProvider: generateChatToken,
//     userData: {
//       id: userId,
//       name: userName,
//       image: userImage,
//     },
//   });

//   useEffect(() => {
//     if (!client) return;

//     const channel = client.channel("messaging", meetingId, {
//       members: [userId],
//     });

//     setChannel(channel);
//   }, [client, meetingId, userId]);

//   if (!client) {
//     return (
//       <LoadingState
//         title="Loading chat"
//         description="This may take a few seconds"
//       />
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg border overflow-hidden">
//       <Chat client={client}>
//         <Channel channel={channel}>
//           <Window>
//             <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b">
//               <MessageList />
//             </div>
//             <MessageInput />
//           </Window>
//           <Thread />
//         </Channel>
//       </Chat>
//     </div>
//   );
// };






"use client";

import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Channel as StreamChannel } from "stream-chat";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useCreateChatClient,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { Send, Users, MessageCircle, Sparkles } from "lucide-react";

interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string | undefined;
}

export const ChatUI = ({ meetingId, meetingName, userId, userName, userImage }: Props) => {
  const trpc = useTRPC();

  const { mutateAsync: generateChatToken } = useMutation(
    trpc.meetings.generateChatToken.mutationOptions()
  );

  const [channel, setChannel] = useState<StreamChannel>();
  const [isTyping, setIsTyping] = useState(false);

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
    tokenOrProvider: generateChatToken,
    userData: {
      id: userId,
      name: userName,
      image: userImage,
    },
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", meetingId, {
      members: [userId],
    });

    setChannel(channel);
  }, [client, meetingId, userId]);

  if (!client) {
    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl border border-gray-200/60 shadow-xl backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-purple-400/5"></div>
        <div className="relative p-8">
          <LoadingState
            title="Initializing Chat Experience"
            description="Creating your personalized chat environment..."
          />
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-2xl border border-gray-200/60 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-3xl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(244,114,182,0.1),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <div className="relative border-b border-gray-200/60 bg-white/80 backdrop-blur-md">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  {meetingName || "Meeting Chat"}
                </h3>
                <p className="text-sm text-gray-500">Live discussion</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 px-3 py-1.5 bg-gray-100/80 rounded-full">
                <Users className="w-3.5 h-3.5 text-gray-500" />
                <span className="text-xs font-medium text-gray-600">Active</span>
              </div>
              <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative">
        <Chat client={client}>
          <Channel channel={channel}>
            <Window>
              {/* Messages Area */}
              <div className="relative flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] bg-gradient-to-b from-transparent to-blue-50/20">
                {/* Scroll Fade Effects */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/80 to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-blue-50/40 to-transparent z-10 pointer-events-none"></div>
                
                <div className="p-4">
                  <MessageList />
                </div>
              </div>

              {/* Typing Indicator */}
              {isTyping && (
                <div className="px-6 py-2 bg-gray-50/80 border-t border-gray-200/60">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span>Someone is typing...</span>
                  </div>
                </div>
              )}

              {/* Message Input */}
              <div className="relative border-t border-gray-200/60 bg-white/90 backdrop-blur-md">
                <div className="p-4">
                  <div className="relative">
                    <MessageInput />
                    {/* Custom Send Button Overlay */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                        <Send className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        /* Custom Stream Chat Styling */
        .str-chat__message-list {
          background: transparent !important;
        }
        
        .str-chat__message-input {
          background: rgba(255, 255, 255, 0.8) !important;
          border: 2px solid rgba(229, 231, 235, 0.6) !important;
          border-radius: 16px !important;
          padding: 12px 16px !important;
          transition: all 0.2s ease !important;
          backdrop-filter: blur(8px) !important;
        }
        
        .str-chat__message-input:focus-within {
          border-color: rgba(59, 130, 246, 0.5) !important;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
          transform: translateY(-1px) !important;
        }
        
        .str-chat__message-simple {
          background: rgba(255, 255, 255, 0.9) !important;
          border-radius: 16px !important;
          margin: 8px 0 !important;
          padding: 12px 16px !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
          backdrop-filter: blur(8px) !important;
          transition: all 0.2s ease !important;
        }
        
        .str-chat__message-simple:hover {
          transform: translateY(-1px) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }
        
        .str-chat__message-simple--me {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9)) !important;
          color: white !important;
          margin-left: auto !important;
          margin-right: 0 !important;
        }
        
        .str-chat__message-text {
          line-height: 1.5 !important;
          font-size: 14px !important;
        }
        
        .str-chat__avatar {
          border: 2px solid rgba(255, 255, 255, 0.8) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        }
        
        .str-chat__message-team-meta {
          opacity: 0.7 !important;
          font-size: 12px !important;
          margin-bottom: 4px !important;
        }
        
        /* Scrollbar Styling */
        .str-chat__message-list::-webkit-scrollbar {
          width: 6px !important;
        }
        
        .str-chat__message-list::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.5) !important;
          border-radius: 3px !important;
        }
        
        .str-chat__message-list::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgba(59, 130, 246, 0.6), rgba(147, 51, 234, 0.6)) !important;
          border-radius: 3px !important;
        }
        
        .str-chat__message-list::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgba(59, 130, 246, 0.8), rgba(147, 51, 234, 0.8)) !important;
        }
        
        /* Animation for new messages */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .str-chat__message-simple {
          animation: slideInUp 0.3s ease-out !important;
        }
        
        /* Enhance thread styling */
        .str-chat__thread {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(12px) !important;
          border-left: 1px solid rgba(229, 231, 235, 0.6) !important;
        }
      `}</style>
    </div>
  );
};
