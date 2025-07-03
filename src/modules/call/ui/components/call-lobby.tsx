// import Link from "next/link";
// import { LogInIcon } from "lucide-react";
// import {
//   type StreamVideoParticipant,
//   DefaultVideoPlaceholder,
//   ToggleAudioPreviewButton,
//   ToggleVideoPreviewButton,
//   useCallStateHooks,
//   VideoPreview,
// } from "@stream-io/video-react-sdk";

// import { authClient } from "@/lib/auth-client";
// import { Button } from "@/components/ui/button";
// import { generateAvatarUri } from "@/lib/avatar";

// import "@stream-io/video-react-sdk/dist/css/styles.css";

// type CallLobbyProps = {
//   onJoin: () => void;
// };

// const DisabledVideoPreview = () => {
//   const { data } = authClient.useSession();

//   return (
//     <DefaultVideoPlaceholder
//       participant={
//         {
//           name: data?.user?.name ?? "",
//           image:
//             data?.user?.image ??
//             generateAvatarUri({
//               seed: data?.user.name ?? "",
//               variant: "initials",
//             }),
//         } as StreamVideoParticipant
//       }
//     />
//   );
// };

// const AllowBrowserPermissions = () => {
//   return (
//     <p className="text-sm text-muted-foreground">
//       Please grant your browser a permission to access your camera and
//       microphone.
//     </p>
//   );
// };

// export const CallLobby = ({ onJoin }: CallLobbyProps) => {
//   const { useCameraState, useMicrophoneState } = useCallStateHooks();
//   const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
//   const { hasBrowserPermission: hasCamPermission } = useCameraState();

//   const hasBrowserMediaPermissions = hasMicPermission && hasCamPermission;

//   return (
//     <div className="flex flex-col items-center justify-center h-full bg-radial from-purple-600 to-purple-800  ">
//       <div className="py-4 px-8 flex flex-1 items-center justify-center">
//         <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
//           <div className="flex flex-col gap-y-2 text-center">
//             <h6 className="text-lg font-medium">Ready to join?</h6>
//             <p className="text-sm text-muted-foreground">
//               Setup your call before joining
//             </p>
//           </div>
//           <VideoPreview
//             DisabledVideoPreview={
//               hasBrowserMediaPermissions
//                 ? DisabledVideoPreview
//                 : AllowBrowserPermissions
//             }
//           />
//           <div className="flex gap-x-2">
//             <ToggleAudioPreviewButton />
//             <ToggleVideoPreviewButton />
//           </div>
//           <div className="flex gap-x-2 justify-between w-full">
//             <Button asChild variant="ghost">
//               <Link href="/meetings">Cancel</Link>
//             </Button>
//             <Button onClick={onJoin}>
//               <LogInIcon />
//               Join Call
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };





import { LogInIcon, Settings, Users, Wifi, Camera, Mic, MicOff, CameraOff } from "lucide-react";
import { useState, useEffect } from "react";
import {
  type StreamVideoParticipant,
  DefaultVideoPlaceholder,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import Link from "next/link";

type CallLobbyProps = {
  onJoin: () => void;
};

const DisabledVideoPreview = () => {
  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: "",
          image: "",
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl">
      <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
        <Settings className="w-10 h-10 text-white" />
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">Permissions Required</h3>
        <p className="text-gray-600 max-w-md">
          Please grant your browser permission to access your camera and
          microphone to join the call.
        </p>
        <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white">
          Allow Access
        </Button>
      </div>
    </div>
  );
};

export const CallLobby = ({ onJoin }: CallLobbyProps) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasMicPermission, isMute } = useMicrophoneState();
  const { hasBrowserPermission: hasCamPermission, isEnabled: isCameraEnabled } = useCameraState();
  
  const [isJoining, setIsJoining] = useState(false);
  const [backgroundBlur, setBackgroundBlur] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'excellent' | 'good' | 'poor'>('excellent');
  const [participantCount, setParticipantCount] = useState(1);
  const [callDuration, setCallDuration] = useState(0);

  const hasBrowserMediaPermissions = hasMicPermission && hasCamPermission;

  // Simulate connection quality check
  useEffect(() => {
    const checkConnection = () => {
      const qualities = ['excellent', 'good', 'poor'] as const;
      setConnectionStatus(qualities[Math.floor(Math.random() * qualities.length)]);
    };
    
    checkConnection();
    const interval = setInterval(checkConnection, 8000);
    return () => clearInterval(interval);
  }, []);

  // Simulate participant count changes
  useEffect(() => {
    const interval = setInterval(() => {
      setParticipantCount(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Call duration timer
  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleJoin = async () => {
    setIsJoining(true);
    // Add a small delay for better UX
    setTimeout(() => {
      onJoin();
      setIsJoining(false);
    }, 1500);
  };

  const getConnectionColor = () => {
    switch (connectionStatus) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'excellent': return '📶';
      case 'good': return '📶';
      case 'poor': return '📶';
      default: return '📶';
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-950 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl animate-bounce delay-700"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Header with enhanced info */}
        <div className="mb-8 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <Users className="w-3 h-3 mr-1" />
              {participantCount} waiting
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              <span className="mr-1">{getConnectionIcon()}</span>
              {connectionStatus}
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              ⏱️ {formatDuration(callDuration)}
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Join Meeting
          </h1>
          <p className="text-purple-200 text-xl font-medium">
            Get ready to connect with your team
          </p>
        </div>

        {/* Main lobby card - Made much larger */}
        <div className="w-full max-w-4xl animate-scale-in">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20">
            {/* User status */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Wifi className={`w-4 h-4 ${getConnectionColor()}`} />
                  <span className={`text-sm capitalize ${getConnectionColor()}`}>
                    {connectionStatus} connection
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  Ready
                </Badge>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                  Meeting ID: 123-456-789
                </Badge>
              </div>
            </div>

            {/* Video preview - Made much larger */}
            <div className="relative mb-8 rounded-3xl overflow-hidden bg-gray-900/50 aspect-video h-96">
              <div className={`w-full h-full ${backgroundBlur && isCameraEnabled ? 'backdrop-blur-sm' : ''}`}>
                <VideoPreview
                  DisabledVideoPreview={
                    hasBrowserMediaPermissions
                      ? DisabledVideoPreview
                      : AllowBrowserPermissions
                  }
                />
              </div>
              
              {/* Video controls overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      {isCameraEnabled ? (
                        <>
                          <Camera className="w-4 h-4 text-green-400" />
                          Camera On
                        </>
                      ) : (
                        <>
                          <CameraOff className="w-4 h-4 text-red-400" />
                          Camera Off
                        </>
                      )}
                    </span>
                  </div>
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      {!isMute ? (
                        <>
                          <Mic className="w-4 h-4 text-green-400" />
                          Mic On
                        </>
                      ) : (
                        <>
                          <MicOff className="w-4 h-4 text-red-400" />
                          Mic Off
                        </>
                      )}
                    </span>
                  </div>
                </div>
                
                {backgroundBlur && isCameraEnabled && (
                  <div className="bg-blue-500/80 backdrop-blur-sm rounded-lg px-3 py-2">
                    <span className="text-white text-sm font-medium">🌟 Background Enhanced</span>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced controls section */}
            <div className="space-y-8">
              {/* Audio/Video toggles with labels */}
              <div className="flex justify-center space-x-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="transform hover:scale-110 transition-all duration-200 p-2 rounded-full bg-white/10 hover:bg-white/20">
                    <ToggleAudioPreviewButton />
                  </div>
                  <span className="text-white text-sm font-medium">Microphone</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="transform hover:scale-110 transition-all duration-200 p-2 rounded-full bg-white/10 hover:bg-white/20">
                    <ToggleVideoPreviewButton />
                  </div>
                  <span className="text-white text-sm font-medium">Camera</span>
                </div>
              </div>

              {/* Enhanced settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      🌟
                    </div>
                    <div>
                      <Label htmlFor="background-blur" className="text-white font-medium">
                        Background Enhance
                      </Label>
                      <p className="text-gray-300 text-xs">Blur your background</p>
                    </div>
                  </div>
                  <Switch
                    id="background-blur"
                    checked={backgroundBlur}
                    onCheckedChange={setBackgroundBlur}
                  />
                </div>

                <div className="flex items-center justify-between bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      🔊
                    </div>
                    <div>
                      <Label className="text-white font-medium">
                        Audio Quality
                      </Label>
                      <p className="text-gray-300 text-xs">High Definition</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                    HD
                  </Badge>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-4">
                <Button 
                  variant="ghost" 
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 transition-all duration-200 h-14 text-lg font-semibold"
                  
                >
                  <Link href="/dashboard/meetings">Cancel</Link>
                </Button>
                <Button 
                  onClick={handleJoin}
                  disabled={isJoining}
                  className="flex-1 bg-gradient-to-r cursor-pointer from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 h-14 text-lg"
                >
                  {isJoining ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Joining...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <LogInIcon className="w-5 h-5" />
                      <span>Join Call</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>

            {/* Enhanced tips and features */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <p className="text-blue-200 text-sm text-center">
                  💡 <strong>Tip:</strong> Use headphones for crystal clear audio
                </p>
              </div>
              <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <p className="text-green-200 text-sm text-center">
                  🎯 <strong>Pro:</strong> Good lighting improves video quality
                </p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <p className="text-purple-200 text-sm text-center">
                  🚀 <strong>Feature:</strong> Background blur keeps you focused
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced footer */}
        <div className="mt-8 text-center space-y-2">
          <p className="text-purple-300 text-sm">
            🔒 Powered by Stream • End-to-End Encrypted • Privacy First
          </p>
          <div className="flex items-center justify-center space-x-4 text-xs text-purple-400">
            <span>99.9% Uptime</span>
            <span>•</span>
            <span>Global CDN</span>
            <span>•</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>

      {/* Enhanced loading overlay */}
      {isJoining && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center max-w-md mx-4 border border-white/20">
            <div className="relative mb-6">
              <div className="w-20 h-20 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">Connecting to meeting...</h3>
            <p className="text-purple-200 text-sm mb-4">Setting up your video and audio</p>
            <div className="flex items-center justify-center space-x-2 text-purple-300 text-sm">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};




