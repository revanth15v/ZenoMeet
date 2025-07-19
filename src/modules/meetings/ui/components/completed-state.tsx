// import Markdown from "react-markdown";

// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { MeetingGetOne } from "../../types";

// import {
//   BookOpenTextIcon,
//   SparklesIcon,
//   FileTextIcon,
//   FileVideoIcon,
//   ClockFadingIcon,
// } from "lucide-react";
// import Link from "next/link";
// import { GeneratedAvatar } from "@/components/generated-avatar";
// import { format } from "date-fns";
// import { Badge } from "@/components/ui/badge";

// import humanizeDuration from "humanize-duration";


// type Props = {
//   data: MeetingGetOne;
// };

// function formatDuration(seconds: number) {
//   return humanizeDuration(seconds * 1000, {
//     largest: 1,
//     units: ["h", "m", "s"],
//     round: true,
//   });
// }

// const CompletedState = ({ data }: Props) => {
//   return (
//     <div className="flex flex-col gap-y-4">
//       <Tabs defaultValue="summary">
//         <div className="bg-white rounded-lg border px-3">
//           <ScrollArea>
//             <TabsList className="p-0 bg-background justify-start rounded-none h-13 gap-2">
//               <TabsTrigger
//                 value="summary"
//                 className=" text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
//                 <BookOpenTextIcon />
//                 Summary
//               </TabsTrigger>
//               <TabsTrigger
//                 value="transcript"
//                 className=" text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
//                 <FileTextIcon />
//                 Transcript
//               </TabsTrigger>
//               <TabsTrigger
//                 value="recording"
//                 className=" text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
//                 <FileVideoIcon />
//                 Recording
//               </TabsTrigger>
//               <TabsTrigger
//                 value="chat"
//                 className=" text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground">
//                 <SparklesIcon />
//                 Ask AI
//               </TabsTrigger>
//             </TabsList>
//             <ScrollBar orientation="horizontal" />
//           </ScrollArea>
//         </div>

       

//         <TabsContent value="recording">
//           <div className="bg-white rounded-lg border px-4 py-5">
//             <video
//               src={data.recordingUrl!}
//               className="w-full rounded-lg"
//               controls
//             />
//           </div>
//         </TabsContent>
//         <TabsContent value="summary">
//           <div className="bg-white rounded-lg border ">
//             <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
//               <h2 className=" text-2xl font-medium capitalize">{data.name}</h2>
//               <div className=" flex gap-x-2 items-center">
//                 <Link
//                   href={`/agents/${data.agents.id}`}
//                   className="flex items-center gap-x-2 underline underline-offset-4 capitalize">
//                   <GeneratedAvatar
//                     variant="botttsNeutral"
//                     seed={data.agents.name}
//                     className="size-5"
//                   />
//                   {data.agents.name}
//                 </Link>{" "}
//                 <p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
//               </div>
//               <div className="flex gap-x-2 items-center">
//                 <SparklesIcon className="size-4" />
//                 <p>General summary</p>
//               </div>
//               <Badge
//                 variant={"outline"}
//                 className="flex items-center gap-x-2 [&>svg]:size-4">
//                 <ClockFadingIcon className=" text-blue-700" />
//                 {data.duration ? formatDuration(data.duration) : "No Duration"}
//               </Badge>
//               <div>
//                 <Markdown
//                   components={{
//                     h1: (props) => (
//                       <h1 className="text-2xl font-medium mb-6" {...props} />
//                     ),
//                     h2: (props) => (
//                       <h2 className="text-xl font-medium mb-6" {...props} />
//                     ),
//                     h3: (props) => (
//                       <h3 className="text-lg font-medium mb-6" {...props} />
//                     ),
//                     h4: (props) => (
//                       <h4 className="text-base font-medium mb-6" {...props} />
//                     ),
//                     p: (props) => (
//                       <p className="mb-6 leading-relaxed" {...props} />
//                     ),
//                     ul: (props) => (
//                       <ul className=" list-disc list-inside mb-6" {...props} />
//                     ),
//                     ol: (props) => (
//                       <ol
//                         className=" list-decimal list-inside mb-6"
//                         {...props}
//                       />
//                     ),
//                     li: (props) => <li className=" mb-1" {...props} />,
//                     strong: (props) => (
//                       <strong className=" font-semibold" {...props} />
//                     ),
//                     code: (props) => (
//                       <code
//                         className=" bg-gray-100 px-1 py-0.5 rounded"
//                         {...props}
//                       />
//                     ),
//                     blockquote: (props) => (
//                       <blockquote
//                         className=" border-l-4 pl-4 italic my-4"
//                         {...props}
//                       />
//                     ),
//                   }}>
//                   {data.summary}
//                 </Markdown>
//               </div>
//             </div>
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default CompletedState;







import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Sparkles,
  FileText,
  Video,
  Clock,
  Calendar,
  User,
  TrendingUp,
  Zap,
  Share2,
  Download,
  Star,
  MessageSquare,
  Check,
  Copy,
  Mail,
  FileDown,
  BarChart3,
  Heart,
  Users
} from "lucide-react";
import Link from "next/link";
import { GeneratedAvatar } from "@/components/generated-avatar";

import { format } from "date-fns";
import humanizeDuration from "humanize-duration";
import { MeetingGetOne } from "../../types";
import SentimentAnalysis from "@/components/sentiment-analysis";
import Transcript from "./transcript";
import { ChatProvider } from "./chat-provider";
import EnhancedSentimentAnalysis from "@/components/sentiment-analysis";
import CommunicationAnalysis from "@/components/communication-analysis";


type Props = {
  data: MeetingGetOne;
};

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    units: ["h", "m", "s"],
    round: true,
  });
}

const CompletedState = ({ data }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [copySuccess, setCopySuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to create a plain text version of the meeting summary
  const createPlainTextSummary = () => {
    const meetingDate = data.startedAt ? format(data.startedAt, "PPP") : "Date not available";
    const duration = data.duration ? formatDuration(data.duration) : "Duration not available";
    
    return `
MEETING SUMMARY
===============

Meeting: ${data.name}
Date: ${meetingDate}
Duration: ${duration}
Host: ${data.agents.name}

SUMMARY
-------
${data.summary || "No summary available"}

TRANSCRIPT
----------
${data.transcriptUrl || "No transcript available"}

---
Generated by AI Meeting Assistant
    `.trim();
  };

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: `Meeting Summary: ${data.name}`,
      text: `Meeting "${data.name}" summary from ${data.startedAt ? format(data.startedAt, "PPP") : "today"}`,
      url: window.location.href,
    };

    try {
      // Try native sharing first (mobile/modern browsers)
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } else {
        // Fallback: Copy to clipboard
        const summaryText = createPlainTextSummary();
        await navigator.clipboard.writeText(summaryText);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      }
    } catch (error) {
      // Final fallback: Try copying to clipboard
      try {
        const summaryText = createPlainTextSummary();
        await navigator.clipboard.writeText(summaryText);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (clipboardError) {
        console.error('Share failed:', error);
        // Could show an error toast here
      }
    }
  };

  // Email sharing functionality
  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Meeting Summary: ${data.name}`);
    const body = encodeURIComponent(createPlainTextSummary());
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoLink, '_blank');
  };

  // Download functionality
  const handleDownload = () => {
    const summaryText = createPlainTextSummary();
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `meeting-summary-${data.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${data.startedAt ? format(data.startedAt, "yyyy-MM-dd") : "unknown-date"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Download as PDF (basic HTML to PDF approach)
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const summaryHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Meeting Summary: ${data.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            h1 { color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
            h2 { color: #6366f1; margin-top: 30px; }
            .header { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
            .meta { display: flex; justify-content: space-between; margin-bottom: 20px; }
            .meta div { background: white; padding: 10px; border-radius: 4px; border: 1px solid #e2e8f0; }
            pre { background: #f8fafc; padding: 15px; border-radius: 4px; white-space: pre-wrap; }
          </style>
        </head>
        <body>
          <h1>Meeting Summary: ${data.name}</h1>
          <div class="header">
            <div class="meta">
              <div><strong>Date:</strong> ${data.startedAt ? format(data.startedAt, "PPP") : "Date not available"}</div>
              <div><strong>Duration:</strong> ${data.duration ? formatDuration(data.duration) : "Duration not available"}</div>
              <div><strong>Host:</strong> ${data.agents.name}</div>
            </div>
          </div>
          
          <h2>Summary</h2>
          <div>${data.summary?.replace(/\n/g, '<br>') || "No summary available"}</div>
          
          <h2>Transcript</h2>
          <pre>${data.transcriptUrl || "No transcript available"}</pre>
          
          <footer style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px;">
            Generated by AI Meeting Assistant on ${new Date().toLocaleString()}
          </footer>
        </body>
        </html>
      `;
      
      printWindow.document.write(summaryHTML);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-300"></div>
          
          <div className="relative z-10 text-white">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <GeneratedAvatar
                    variant="botttsNeutral"
                    seed={data.agents.name}
                    className="w-12 h-12"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1 capitalize">{data.name}</h1>
                  <p className="text-blue-100 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {data.startedAt ? format(data.startedAt, "PPP") : ""}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {/* Share Button with Dropdown */}
                <div className="relative group">
                  <button 
                    onClick={handleShare}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 relative"
                  >
                    {shareSuccess || copySuccess ? (
                      <Check className="w-5 h-5 text-green-300" />
                    ) : (
                      <Share2 className="w-5 h-5" />
                    )}
                  </button>
                  
                  {/* Share Dropdown */}
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <button
                      onClick={handleShare}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                    >
                      <Share2 className="w-4 h-4" />
                      Share Link
                    </button>
                    <button
                      onClick={handleEmailShare}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                    >
                      <Mail className="w-4 h-4" />
                      Email Summary
                    </button>
                    <button
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(createPlainTextSummary());
                          setCopySuccess(true);
                          setTimeout(() => setCopySuccess(false), 2000);
                        } catch (error) {
                          console.error('Copy failed:', error);
                        }
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                    >
                      <Copy className="w-4 h-4" />
                      Copy to Clipboard
                    </button>
                  </div>
                </div>

                {/* Download Button with Dropdown */}
                <div className="relative group">
                  <button 
                    onClick={handleDownload}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  
                  {/* Download Dropdown */}
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <button
                      onClick={handleDownload}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                    >
                      <FileText className="w-4 h-4" />
                      Download as TXT
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700"
                    >
                      <FileDown className="w-4 h-4" />
                      Download as PDF
                    </button>
                  </div>
                </div>

                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110">
                  <Star className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Success Messages */}
            {copySuccess && (
              <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-top">
                ✓ Copied to clipboard!
              </div>
            )}
            {shareSuccess && (
              <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-top">
                ✓ Shared successfully!
              </div>
            )}
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/30 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Duration</p>
                    <Badge variant="outline" className="text-white border-white/30 bg-white/10">
                      {data.duration ? formatDuration(data.duration) : "No Duration"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/30 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Host</p>
                    <Link
                      href={`/agents/${data.agents.id}`}
                      className="text-white hover:text-blue-200 transition-colors capitalize font-medium"
                    >
                      {data.agents.name}
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500/30 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">AI Summary</p>
                    <p className="text-white font-medium">Generated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Tabs */}
        <Tabs defaultValue="summary" className="w-full">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 shadow-xl border border-white/20">
            <ScrollArea>
              <TabsList className="p-0 bg-transparent justify-start rounded-none h-auto gap-2">
                <TabsTrigger
                  value="summary"
                  className="group flex items-center gap-3 px-6 py-4 text-muted-foreground rounded-xl bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  <BookOpen className="w-5 h-5 group-data-[state=active]:animate-pulse" />
                  <span className="font-medium">Summary</span>
                </TabsTrigger>
                <TabsTrigger
                  value="transcript"
                  className="group flex items-center gap-3 px-6 py-4 text-muted-foreground rounded-xl bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  <FileText className="w-5 h-5 group-data-[state=active]:animate-pulse" />
                  <span className="font-medium">Transcript</span>
                </TabsTrigger>
                <TabsTrigger
                  value="recording"
                  className="group flex items-center gap-3 px-6 py-4 text-muted-foreground rounded-xl bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  <Video className="w-5 h-5 group-data-[state=active]:animate-pulse" />
                  <span className="font-medium">Recording</span>
                </TabsTrigger>
                <TabsTrigger
                  value="chat"
                  className="group flex items-center gap-3 px-6 py-4 text-muted-foreground rounded-xl bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  <Sparkles className="w-5 h-5 group-data-[state=active]:animate-pulse" />
                  <span className="font-medium">Ask AI</span>
                </TabsTrigger>
                <TabsTrigger
                  value="sentiment"
                  className="group flex items-center gap-3 px-6 py-4 text-muted-foreground rounded-xl bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  <Heart className="w-5 h-5 group-data-[state=active]:animate-pulse" />
                  <span className="font-medium">Sentiment</span>
                </TabsTrigger>
                
<TabsTrigger
                  value="communication"
                  className="group flex items-center gap-3 px-6 py-4 text-muted-foreground rounded-xl bg-transparent data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
                >
                  <Users className="w-5 h-5 group-data-[state=active]:animate-pulse" />
                  <span className="font-medium">Communication</span>
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>

          {/* Recording Tab */}
          <TabsContent value="recording" className="mt-8">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Meeting Recording</h2>
                    <p className="text-gray-600">High-quality video capture</p>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
                  <video
                    src={data.recordingUrl!}
                    className="w-full aspect-video rounded-2xl"
                    controls
                    style={{
                      filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))'
                    }}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Summary Tab */}
          <TabsContent value="summary" className="mt-8">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">AI-Generated Summary</h2>
                    <p className="text-gray-600">Powered by advanced language models</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <div className="flex items-center gap-x-2 mb-4">
                      <Sparkles className="w-5 h-5 text-blue-600" />
                      <p className="text-blue-800 font-medium">General Summary</p>
                    </div>
                    
                    <div className="prose prose-lg max-w-none">
                      <Markdown
                        components={{
                          h1: (props) => (
                            <h1 className="text-3xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent" {...props} />
                          ),
                          h2: (props) => (
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b border-gray-200 pb-2" {...props} />
                          ),
                          h3: (props) => (
                            <h3 className="text-xl font-semibold mb-3 text-gray-800" {...props} />
                          ),
                          h4: (props) => (
                            <h4 className="text-lg font-medium mb-3 text-gray-800" {...props} />
                          ),
                          p: (props) => (
                            <p className="mb-4 leading-relaxed text-gray-700" {...props} />
                          ),
                          ul: (props) => (
                            <ul className="space-y-2 mb-6" {...props} />
                          ),
                          ol: (props) => (
                            <ol className="space-y-2 mb-6" {...props} />
                          ),
                          li: (props) => (
                            <li className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700" {...props} />
                            </li>
                          ),
                          strong: (props) => (
                            <strong className="font-semibold text-gray-900 bg-yellow-100 px-1 py-0.5 rounded" {...props} />
                          ),
                          code: (props) => (
                            <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono text-sm" {...props} />
                          ),
                          blockquote: (props) => (
                            <blockquote className="border-l-4 border-gradient-to-b from-purple-500 to-pink-500 pl-6 py-4 my-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-r-lg italic text-gray-700" {...props} />
                          ),
                        }}
                      >
                        {data.summary}
                      </Markdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Transcript Tab */}
          <TabsContent value="transcript" className="mt-8">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Meeting Transcript</h2>
                    <p className="text-gray-600">AI-powered speech recognition</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                  <div className="space-y-4 font-mono text-sm">
                    <p className="text-gray-700 leading-relaxed">
                     <Transcript meetingId={data.id}/>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="mt-8">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Ask AI Assistant</h2>
                    <p className="text-gray-600">Get insights about your meeting</p>
                  </div>
                </div>
                 
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium mb-2">AI Assistant</p>
                        <p className="text-gray-700">I can help you analyze the meeting content, extract key insights, create action items, or answer specific questions about the discussion. What would you like to know?</p>
                      </div>
                    </div>
                  </div>
                  
                 <ChatProvider meetingId={data.id} meetingName={data.name}/>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Sentiment Analysis Tab */}
          <TabsContent value="sentiment" className="mt-8">
            <EnhancedSentimentAnalysis data={data} />
          </TabsContent>

           {/* Communication Analysis Tab */}
          <TabsContent value="communication" className="mt-8">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Communication Analysis</h2>
                    <p className="text-gray-600">Team interaction patterns and dynamics</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                    <div className="flex items-center gap-x-2 mb-4">
                      <Users className="w-5 h-5 text-indigo-600" />
                      <p className="text-indigo-800 font-medium">Communication Insights</p>
                    </div>
                   
                    <CommunicationAnalysis data={data}/>
                    
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompletedState;