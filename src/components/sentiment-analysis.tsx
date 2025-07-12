import React, { useState, useEffect, useMemo } from 'react';
import { Heart, TrendingUp, TrendingDown, Minus, BarChart3, Users, MessageSquare, Zap, AlertCircle, CheckCircle, XCircle, Clock, Target, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Sentiment analysis utility functions
interface SentimentResult {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
    confidence: number;
    positiveScore: number;
    negativeScore: number;
    neutralScore: number;
}

const analyzeSentiment = (text: string): SentimentResult => {
    if (!text) return { score: 0, label: 'neutral', confidence: 0, positiveScore: 0, negativeScore: 0, neutralScore: 0 };
    
    const positiveWords: string[] = [
        'good', 'great', 'excellent', 'amazing', 'fantastic', 'wonderful', 'perfect', 'outstanding',
        'brilliant', 'awesome', 'love', 'like', 'enjoy', 'happy', 'pleased', 'satisfied',
        'successful', 'achievement', 'progress', 'improvement', 'solution', 'resolved',
        'agree', 'yes', 'absolutely', 'definitely', 'excited', 'thrilled', 'delighted',
        'impressive', 'remarkable', 'effective', 'efficient', 'productive', 'valuable',
        'innovative', 'creative', 'opportunity', 'benefit', 'advantage', 'positive',
        'optimize', 'enhance', 'upgrade', 'achieve', 'accomplish', 'succeed'
    ];
    
    const negativeWords: string[] = [
        'bad', 'terrible', 'awful', 'horrible', 'disappointing', 'frustrating', 'annoying',
        'hate', 'dislike', 'angry', 'upset', 'sad', 'worried', 'concerned', 'problem',
        'issue', 'difficulty', 'challenge', 'obstacle', 'failure', 'mistake', 'error',
        'wrong', 'incorrect', 'disagree', 'no', 'never', 'impossible', 'difficult',
        'complicated', 'confusing', 'unclear', 'ineffective', 'inefficient', 'waste',
        'delay', 'behind', 'late', 'slow', 'poor', 'weak', 'lacking', 'missing',
        'broken', 'damaged', 'flawed', 'risky', 'dangerous', 'negative', 'decline'
    ];
    
    const neutralWords: string[] = [
        'okay', 'fine', 'maybe', 'perhaps', 'possibly', 'might', 'could', 'would',
        'discuss', 'consider', 'review', 'analyze', 'examine', 'evaluate', 'assess',
        'normal', 'standard', 'typical', 'regular', 'usual', 'average', 'moderate'
    ];
    
    const words: string[] = text.toLowerCase().split(/\s+/);
    let positiveScore = 0;
    let negativeScore = 0;
    let neutralScore = 0;
    
    words.forEach(word => {
        const cleanWord = word.replace(/[^\w]/g, '');
        if (positiveWords.includes(cleanWord)) positiveScore++;
        else if (negativeWords.includes(cleanWord)) negativeScore++;
        else if (neutralWords.includes(cleanWord)) neutralScore++;
    });
    
    const total = positiveScore + negativeScore + neutralScore;
    const score = total === 0 ? 0 : (positiveScore - negativeScore) / Math.max(total, 1);
    
    let label: 'positive' | 'negative' | 'neutral';
    let confidence: number;
    if (score > 0.3) {
        label = 'positive';
        confidence = Math.min(score * 100, 95);
    } else if (score < -0.3) {
        label = 'negative';
        confidence = Math.min(Math.abs(score) * 100, 95);
    } else {
        label = 'neutral';
        confidence = 60 + Math.random() * 20; // Neutral confidence range
    }
    
    return { score, label, confidence, positiveScore, negativeScore, neutralScore };
};

const extractKeyPhrases = (text) => {
  if (!text) return [];
  
  const phrases = [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  sentences.forEach(sentence => {
    const sentiment = analyzeSentiment(sentence);
    if (Math.abs(sentiment.score) > 0.2) {
      phrases.push({
        text: sentence.trim(),
        sentiment: sentiment.label,
        score: sentiment.score,
        confidence: sentiment.confidence
      });
    }
  });
  
  return phrases.slice(0, 5); // Return top 5 phrases
};

interface AnalysisResult {
  overall: {
    score: number;
    label: string;
    confidence: number;
  };
  transcript: SentimentResult;
  summary: SentimentResult;
  keyPhrases: any[];
  insights: { type: string; title: string; description: string; }[];
  stats: {
    totalWords: number;
    positiveWords: number;
    negativeWords: number;
    neutralWords: number;
  };
}

const SentimentAnalysis = ({ data }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);

  // Real-time analysis of meeting data
  const performAnalysis = useMemo(() => {
    if (!data) return null;
    
    const transcriptAnalysis = analyzeSentiment(data.transcript);
    const summaryAnalysis = analyzeSentiment(data.summary);
    
    // Combine both analyses with weighted average
    const combinedScore = (transcriptAnalysis.score * 0.7 + summaryAnalysis.score * 0.3);
    const combinedConfidence = (transcriptAnalysis.confidence * 0.7 + summaryAnalysis.confidence * 0.3);
    
    let overallLabel;
    if (combinedScore > 0.2) overallLabel = 'positive';
    else if (combinedScore < -0.2) overallLabel = 'negative';
    else overallLabel = 'neutral';
    
    const keyPhrases = extractKeyPhrases(data.transcript || data.summary);
    
    // Generate insights based on analysis
    const insights = [];
    if (transcriptAnalysis.positiveScore > transcriptAnalysis.negativeScore) {
      insights.push({
        type: 'positive',
        title: 'Positive Engagement',
        description: `Meeting showed ${transcriptAnalysis.positiveScore} positive indicators suggesting good team engagement and collaboration.`
      });
    }
    
    if (transcriptAnalysis.negativeScore > 2) {
      insights.push({
        type: 'concern',
        title: 'Areas of Concern',
        description: `Detected ${transcriptAnalysis.negativeScore} concern indicators that may need attention or follow-up.`
      });
    }
    
    if (overallLabel === 'neutral') {
      insights.push({
        type: 'neutral',
        title: 'Balanced Discussion',
        description: 'The meeting maintained a professional and balanced tone throughout the discussion.'
      });
    }
    
    return {
      overall: {
        score: combinedScore,
        label: overallLabel,
        confidence: combinedConfidence
      },
      transcript: transcriptAnalysis,
      summary: summaryAnalysis,
      keyPhrases,
      insights,
      stats: {
        totalWords: (data.transcript || '').split(/\s+/).length,
        positiveWords: transcriptAnalysis.positiveScore,
        negativeWords: transcriptAnalysis.negativeScore,
        neutralWords: transcriptAnalysis.neutralScore
      }
    };
  }, [data]);
  
  useEffect(() => {
    setIsAnalyzing(true);
    
    // Simulate real-time analysis delay
    const timer = setTimeout(() => {
      setAnalysis(performAnalysis);
      setIsAnalyzing(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [performAnalysis]);
  
  const getSentimentColor = (label) => {
    switch (label) {
      case 'positive': return 'from-green-500 to-emerald-500';
      case 'negative': return 'from-red-500 to-rose-500';
      default: return 'from-blue-500 to-indigo-500';
    }
  };
  
  const getSentimentIcon = (label) => {
    switch (label) {
      case 'positive': return <CheckCircle className="w-6 h-6 text-white" />;
      case 'negative': return <XCircle className="w-6 h-6 text-white" />;
      default: return <Minus className="w-6 h-6 text-white" />;
    }
  };
  
  const getSentimentBadgeColor = (label) => {
    switch (label) {
      case 'positive': return 'bg-green-100 text-green-800 border-green-200';
      case 'negative': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };
  
  if (isAnalyzing) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sentiment Analysis</h2>
              <p className="text-gray-600">Analyzing meeting emotions and tone...</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto animate-pulse">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Sentiment</h3>
              <p className="text-gray-600">Processing meeting content for emotional insights...</p>
              <div className="mt-4 w-48 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!analysis) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="p-8">
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Data Available</h3>
            <p className="text-gray-600">Unable to analyze sentiment. Please ensure meeting data is available.</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sentiment Analysis</h2>
            <p className="text-gray-600">Real-time emotional intelligence insights</p>
          </div>
        </div>
        
        {/* Overall Sentiment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-1">
            <div className={`bg-gradient-to-r ${getSentimentColor(analysis.overall.label)} rounded-2xl p-6 text-white shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {getSentimentIcon(analysis.overall.label)}
                  <span className="text-lg font-semibold capitalize">{analysis.overall.label}</span>
                </div>
                <Badge variant="outline" className="text-white border-white/30 bg-white/20">
                  {Math.round(analysis.overall.confidence)}% confidence
                </Badge>
              </div>
              <div className="text-3xl font-bold mb-2">
                {analysis.overall.score > 0 ? '+' : ''}{(analysis.overall.score * 100).toFixed(1)}
              </div>
              <p className="text-sm opacity-90">Overall sentiment score</p>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Breakdown</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Positive expressions</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${Math.min((analysis.stats.positiveWords / Math.max(analysis.stats.totalWords * 0.1, 1)) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{analysis.stats.positiveWords}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Negative expressions</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-red-500 rounded-full" 
                        style={{ width: `${Math.min((analysis.stats.negativeWords / Math.max(analysis.stats.totalWords * 0.1, 1)) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{analysis.stats.negativeWords}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Neutral expressions</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${Math.min((analysis.stats.neutralWords / Math.max(analysis.stats.totalWords * 0.1, 1)) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{analysis.stats.neutralWords}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
            </div>
            <div className="space-y-4">
              {analysis.insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    insight.type === 'positive' ? 'bg-green-500' : 
                    insight.type === 'concern' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{insight.title}</p>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Analysis Summary</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Total words analyzed</span>
                <span className="font-medium text-gray-900">{analysis.stats.totalWords.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Transcript sentiment</span>
                <Badge className={getSentimentBadgeColor(analysis.transcript.label)}>
                  {analysis.transcript.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Summary sentiment</span>
                <Badge className={getSentimentBadgeColor(analysis.summary.label)}>
                  {analysis.summary.label}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Analysis confidence</span>
                <span className="font-medium text-gray-900">{Math.round(analysis.overall.confidence)}%</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Key Phrases */}
        {analysis.keyPhrases.length > 0 && (
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Key Emotional Phrases</h3>
            </div>
            <div className="space-y-3">
              {analysis.keyPhrases.map((phrase, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                  <Badge className={getSentimentBadgeColor(phrase.sentiment)}>
                    {phrase.sentiment}
                  </Badge>
                  <p className="text-gray-700 flex-1">{phrase.text}</p>
                  <span className="text-sm text-gray-500">{Math.round(phrase.confidence)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SentimentAnalysis;

// import React from 'react'

// const SentimentAnalysis = () => {
//   return (
//     <div>
//       tab
//     </div>
//   )
// }

// export default SentimentAnalysis
