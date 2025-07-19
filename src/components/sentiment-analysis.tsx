import React, { useState, useEffect } from 'react';
import { 
  Heart, TrendingUp, TrendingDown, Minus, Users, MessageSquare, 
  AlertCircle, Target, Lightbulb, Brain, Activity, Globe, Shield, Eye
} from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import CommunicationAnalysis from './communication-analysis';

// Mock AzureTextAnalyticsService definition
class AzureTextAnalyticsService {
  key: string;
  endpoint: string;

  constructor(key: string, endpoint: string) {
    this.key = key;
    this.endpoint = endpoint;
  }

  async initialize() {
    return new Promise(resolve => setTimeout(resolve, 100));
  }

  async analyzeSentiment(documents: { id: string; text: string }[]) {
    return documents.map(doc => ({
      sentiment: this.mockSentimentAnalysis(doc.text),
      confidenceScores: this.mockConfidenceScores(doc.text),
      sentences: this.mockSentenceAnalysis(doc.text)
    }));
  }

  async extractKeyPhrases(documents: { id: string; text: string }[]) {
    return documents.map(doc => ({ keyPhrases: this.mockKeyPhrases(doc.text) }));
  }

  async recognizeEntities(documents: { id: string; text: string }[]) {
    return documents.map(doc => ({ entities: this.mockEntities(doc.text) }));
  }

  async analyzeEmotions(documents: { id: string; text: string }[]) {
    return documents.map(doc => ({ emotions: this.mockEmotions(doc.text) }));
  }

  mockSentimentAnalysis(text: string): string {
    const positiveWords = [
      'good', 'great', 'excellent', 'amazing', 'fantastic', 'wonderful', 'perfect', 'outstanding',
      'brilliant', 'awesome', 'love', 'like', 'enjoy', 'happy', 'pleased', 'satisfied',
      'successful', 'achievement', 'progress', 'improvement', 'solution', 'resolved',
      'agree', 'yes', 'absolutely', 'definitely', 'excited', 'thrilled', 'delighted',
      'impressive', 'remarkable', 'effective', 'efficient', 'productive', 'valuable',
      'innovative', 'creative', 'opportunity', 'benefit', 'advantage', 'positive'
    ];
    const negativeWords = [
      'bad', 'terrible', 'awful', 'horrible', 'disappointing', 'frustrating', 'annoying',
      'hate', 'dislike', 'angry', 'upset', 'sad', 'worried', 'concerned', 'problem',
      'issue', 'difficulty', 'challenge', 'obstacle', 'failure', 'mistake', 'error',
      'wrong', 'incorrect', 'disagree', 'no', 'never', 'impossible', 'difficult',
      'complicated', 'confusing', 'unclear', 'ineffective', 'inefficient', 'waste',
      'delay', 'behind', 'late', 'slow', 'poor', 'weak', 'lacking', 'missing',
      'broken', 'damaged', 'flawed', 'risky', 'dangerous', 'negative', 'decline'
    ];

    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => positiveWords.some(pw => word.includes(pw))).length;
    const negativeCount = words.filter(word => negativeWords.some(nw => word.includes(nw))).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  mockConfidenceScores(text: string) {
    const sentiment = this.mockSentimentAnalysis(text);
    const base = 0.3 + Math.random() * 0.6;
    
    return {
      positive: sentiment === 'positive' ? base + 0.2 : Math.random() * 0.4,
      negative: sentiment === 'negative' ? base + 0.2 : Math.random() * 0.4,
      neutral: sentiment === 'neutral' ? base + 0.2 : Math.random() * 0.4
    };
  }

  mockSentenceAnalysis(text: string) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.map((sentence) => ({
      text: sentence.trim(),
      sentiment: this.mockSentimentAnalysis(sentence),
      confidenceScores: this.mockConfidenceScores(sentence),
      offset: text.indexOf(sentence),
      length: sentence.length
    }));
  }

  mockKeyPhrases(text: string): string[] {
    const phrases = [
      'team collaboration', 'project deadline', 'customer feedback', 'performance metrics',
      'market analysis', 'strategic planning', 'resource allocation', 'quality assurance',
      'innovation pipeline', 'competitive advantage', 'stakeholder engagement', 'process improvement'
    ];
    
    const words = text.toLowerCase();
    return phrases.filter(phrase => 
      phrase.split(' ').some(word => words.includes(word))
    ).slice(0, 5);
  }

  mockEntities(text: string) {
    const entities = [
      { text: 'Q4 2024', category: 'DateTime', confidence: 0.95 },
      { text: 'Microsoft', category: 'Organization', confidence: 0.92 },
      { text: 'New York', category: 'Location', confidence: 0.88 },
      { text: '50%', category: 'Quantity', confidence: 0.85 }
    ];
    
    return entities.filter(entity => 
      text.toLowerCase().includes(entity.text.toLowerCase())
    );
  }

  mockEmotions(text: string) {
    return {
      joy: Math.random() * 0.4 + 0.1,
      sadness: Math.random() * 0.3 + 0.05,
      anger: Math.random() * 0.2 + 0.05,
      fear: Math.random() * 0.2 + 0.05,
      surprise: Math.random() * 0.3 + 0.05,
      disgust: Math.random() * 0.15 + 0.05
    };
  }
}

// Enhanced Analysis Result Interface
interface EnhancedAnalysisResult {
  overall: {
    sentiment: string;
    confidence: number;
    score: number;
  };
  detailed: {
    sentences: any[];
    keyPhrases: string[];
    entities: any[];
    emotions: any;
  };
  insights: {
    type: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    actionable: boolean;
  }[];
  businessMetrics: {
    engagementScore: number;
    riskLevel: string;
    actionItems: string[];
    recommendations: string[];
  };
}

const EnhancedSentimentAnalysis = ({ data }: { data: any }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysis, setAnalysis] = useState<EnhancedAnalysisResult | null>(null);
  const [azureService] = useState(() => new AzureTextAnalyticsService(
    process.env.NEXT_PUBLIC_AZURE_TEXT_ANALYTICS_KEY || 'mock-key',
    process.env.NEXT_PUBLIC_AZURE_TEXT_ANALYTICS_ENDPOINT || 'mock-endpoint'
  ));
  const [analysisStage, setAnalysisStage] = useState('Initializing Azure Service...');

  useEffect(() => {
    const performEnhancedAnalysis = async () => {
      if (!data || (!data.transcript && !data.summary)) return;

      setIsAnalyzing(true);
      setAnalysisStage('Initializing Azure Service...');

      try {
        await azureService.initialize();
        
        const documents = [
          { id: 'transcript', text: data.transcript || '' },
          { id: 'summary', text: data.summary || '' }
        ].filter(doc => doc.text.length > 0);

        setAnalysisStage('Analyzing sentiment patterns...');
        const sentimentResults = await azureService.analyzeSentiment(documents);
        
        setAnalysisStage('Extracting key phrases...');
        const keyPhraseResults = await azureService.extractKeyPhrases(documents);
        
        setAnalysisStage('Recognizing entities...');
        const entityResults = await azureService.recognizeEntities(documents);
        
        setAnalysisStage('Analyzing emotions...');
        const emotionResults = await azureService.analyzeEmotions(documents);
        
        setAnalysisStage('Generating business insights...');
        
        const combinedAnalysis = processCombinedResults(
          sentimentResults, 
          keyPhraseResults, 
          entityResults, 
          emotionResults
        );
        
        setAnalysis(combinedAnalysis);
        setIsAnalyzing(false);
        
      } catch (error) {
        console.error('Analysis failed:', error);
        setIsAnalyzing(false);
      }
    };

    performEnhancedAnalysis();
  }, [data, azureService]);

  const processCombinedResults = (sentiment: any, keyPhrases: any, entities: any, emotions: any): EnhancedAnalysisResult => {
    const overallSentiment = sentiment[0];
    const overallEmotions = emotions[0];
    
    const engagementScore = Math.round(
      (overallSentiment.confidenceScores.positive * 40 + 
       overallEmotions.emotions.joy * 30 + 
       overallEmotions.emotions.surprise * 20 + 
       (1 - overallEmotions.emotions.sadness) * 10) * 100
    );
    
    const riskLevel = overallSentiment.confidenceScores.negative > 0.7 ? 'high' : 
                     overallSentiment.confidenceScores.negative > 0.4 ? 'medium' : 'low';
    
    const insights = generateBusinessInsights(sentiment, keyPhrases, entities, emotions);
    const recommendations = generateRecommendations(overallSentiment, overallEmotions, riskLevel);
    
    return {
      overall: {
        sentiment: overallSentiment.sentiment,
        confidence: Math.max(...Object.values(overallSentiment.confidenceScores) as number[]) * 100,
        score: overallSentiment.confidenceScores.positive - overallSentiment.confidenceScores.negative
      },
      detailed: {
        sentences: overallSentiment.sentences,
        keyPhrases: keyPhrases[0]?.keyPhrases || [],
        entities: entities[0]?.entities || [],
        emotions: overallEmotions.emotions
      },
      insights,
      businessMetrics: {
        engagementScore,
        riskLevel,
        actionItems: generateActionItems(overallSentiment, riskLevel),
        recommendations
      }
    };
  };

  const generateBusinessInsights = (sentiment: any, keyPhrases: any, entities: any, emotions: any) => {
    const insights = [];
    const overallSentiment = sentiment[0];
    const overallEmotions = emotions[0];
    
    if (overallSentiment.confidenceScores.positive > 0.6) {
      insights.push({
        type: 'engagement',
        title: 'High Team Engagement Detected',
        description: 'Strong positive sentiment indicates active participation and team alignment.',
        severity: 'low' as const,
        actionable: true
      });
    }
    
    if (overallSentiment.confidenceScores.negative > 0.5) {
      insights.push({
        type: 'risk',
        title: 'Potential Issues Identified',
        description: 'Negative sentiment patterns suggest areas requiring immediate attention.',
        severity: 'high' as const,
        actionable: true
      });
    }
    
    if (overallEmotions.emotions.anger > 0.3) {
      insights.push({
        type: 'emotion',
        title: 'Tension Detected',
        description: 'Elevated anger levels may indicate unresolved conflicts or frustrations.',
        severity: 'medium' as const,
        actionable: true
      });
    }
    
    return insights;
  };

  const generateRecommendations = (sentiment: any, emotions: any, riskLevel: string) => {
    const recommendations = [];
    
    if (riskLevel === 'high') {
      recommendations.push('Schedule immediate follow-up meetings with concerned stakeholders');
      recommendations.push('Implement conflict resolution strategies');
    }
    
    if (sentiment.confidenceScores.positive > 0.7) {
      recommendations.push('Leverage positive momentum for upcoming initiatives');
      recommendations.push('Document and share successful practices');
    }
    
    if (emotions.emotions.joy < 0.2) {
      recommendations.push('Consider team building or morale boosting activities');
      recommendations.push('Review workload distribution and stress factors');
    }
    
    return recommendations;
  };

  const generateActionItems = (sentiment: any, riskLevel: string) => {
    const actionItems = [];
    
    if (riskLevel === 'high') {
      actionItems.push('Address negative feedback within 24 hours');
      actionItems.push('Escalate critical issues to management');
    }
    
    if (sentiment.confidenceScores.neutral > 0.6) {
      actionItems.push('Seek more specific feedback from participants');
      actionItems.push('Clarify unclear discussion points');
    }
    
    return actionItems;
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'from-green-500 to-emerald-500';
      case 'negative': return 'from-red-500 to-rose-500';
      default: return 'from-blue-500 to-indigo-500';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp className="w-6 h-6 text-white" />;
      case 'negative': return <TrendingDown className="w-6 h-6 text-white" />;
      default: return <Minus className="w-6 h-6 text-white" />;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Azure AI Sentiment Analysis</h2>
              <p className="text-gray-600">Enterprise-grade emotional intelligence</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Activity className="w-10 h-10 text-white animate-bounce" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis in Progress</h3>
              <p className="text-gray-600 mb-4">{analysisStage}</p>
              <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-1000" 
                     style={{ width: isAnalyzing ? '75%' : '100%' }}></div>
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analysis Failed</h3>
            <p className="text-gray-600">Unable to connect to Azure Text Analytics. Please check your configuration.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Azure AI Sentiment Analysis</h2>
                <p className="text-gray-600">Enterprise-grade emotional intelligence insights</p>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 rounded-full text-sm border flex items-center">
              <Globe className="w-3 h-3 mr-1" />
              Azure Powered
            </div>
            {/* <Link href={}>
            <Button>communication</Button>
            </Link> */}
          </div>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`bg-gradient-to-r ${getSentimentColor(analysis.overall.sentiment)} rounded-2xl p-6 text-white shadow-lg`}>
          <div className="flex items-center justify-between mb-4">
            {getSentimentIcon(analysis.overall.sentiment)}
            <div className="text-white border-white/30 bg-white/20 px-2 py-1 rounded border text-sm">
              {Math.round(analysis.overall.confidence)}%
            </div>
          </div>
          <div className="text-2xl font-bold mb-1 capitalize">{analysis.overall.sentiment}</div>
          <p className="text-sm opacity-90">Overall Sentiment</p>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-6 h-6" />
            <span className="text-2xl font-bold">{analysis.businessMetrics.engagementScore}</span>
          </div>
          <div className="text-sm opacity-90">Engagement Score</div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-6 h-6" />
            <div className={`${getRiskColor(analysis.businessMetrics.riskLevel)} border-0 px-2 py-1 rounded text-sm`}>
              {analysis.businessMetrics.riskLevel}
            </div>
          </div>
          <div className="text-sm opacity-90">Risk Level</div>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-6 h-6" />
            <span className="text-2xl font-bold">{analysis.insights.length}</span>
          </div>
          <div className="text-sm opacity-90">Key Insights</div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Emotional Breakdown */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-rose-500" />
            <h3 className="text-lg font-semibold text-gray-900">Emotional Analysis</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(analysis.detailed.emotions).map(([emotion, score]) => (
              <div key={emotion} className="flex items-center justify-between">
                <span className="text-gray-700 capitalize">{emotion}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${(score as number) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12">
                    {Math.round((score as number) * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Insights */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">Business Insights</h3>
          </div>
          <div className="space-y-4">
            {analysis.insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  insight.severity === 'high' ? 'bg-red-500' : 
                  insight.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{insight.title}</p>
                    {insight.actionable && (
                      <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        Actionable
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Phrases and Entities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-900">Key Phrases</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {analysis.detailed.keyPhrases.map((phrase, index) => (
              <div key={index} className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 rounded text-sm border">
                {phrase}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-900">Recognized Entities</h3>
          </div>
          <div className="space-y-3">
            {analysis.detailed.entities.map((entity, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-gray-900">{entity.text}</span>
                  <div className="ml-2 bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded inline-block">
                    {entity.category}
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {Math.round(entity.confidence * 100)}%
                </span>
              </div>
            ))}
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default EnhancedSentimentAnalysis;


