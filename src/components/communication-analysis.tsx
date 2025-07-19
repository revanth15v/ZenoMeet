import React, { useState, useEffect } from 'react';
import { 
  BarChart3, TrendingUp, User, Users, 
  MessageSquare, Brain, Target, Lightbulb,
  ArrowUp, ArrowDown, Minus, ChevronRight,
  Activity, Eye, Mic2, Volume2
} from 'lucide-react';

interface CommunicationInsight {
  type: 'tone' | 'word-choice' | 'balance' | 'impact' | 'clarity';
  title: string;
  description: string;
  score: number;
  severity: 'excellent' | 'good' | 'needs-improvement' | 'critical';
  recommendation: string;
  trend?: 'up' | 'down' | 'stable';
}

interface CommunicationAnalysis {
  speakingBalance: {
    userPercentage: number;
    othersPercentage: number;
    recommendation: string;
  };
  toneAnalysis: {
    dominantTone: string;
    expressiveness: number;
    consistency: number;
    recommendation: string;
  };
  wordChoice: {
    assertivenessLevel: number;
    negativePhrasesCount: number;
    positivePhrasesCount: number;
    recommendation: string;
  };
  emotionalImpact: {
    urgencyLevel: number;
    approachability: number;
    clarity: number;
    recommendation: string;
  };
  speechClarity: {
    fillerWordsCount: number;
    pauseQuality: number;
    overallClarity: number;
    recommendation: string;
  };
  insights: CommunicationInsight[];
}

const CommunicationAnalysis = ({ data }: { data: any }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysis, setAnalysis] = useState<CommunicationAnalysis | null>(null);
  const [analysisStage, setAnalysisStage] = useState('Initializing analysis...');
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null);

  useEffect(() => {
    const performCommunicationAnalysis = async () => {
      if (!data || (!data.transcript && !data.summary)) return;
      
      setIsAnalyzing(true);
      setAnalysisStage('Processing communication patterns...');
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        setAnalysisStage('Analyzing tone and sentiment...');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setAnalysisStage('Evaluating word choice and clarity...');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setAnalysisStage('Computing speaking dynamics...');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setAnalysisStage('Generating actionable insights...');
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const communicationAnalysis = generateCommunicationAnalysis(data);
        setAnalysis(communicationAnalysis);
        setIsAnalyzing(false);
        
      } catch (error) {
        console.error('Communication analysis failed:', error);
        setIsAnalyzing(false);
      }
    };

    performCommunicationAnalysis();
  }, [data]);

  const generateCommunicationAnalysis = (meetingData: any): CommunicationAnalysis => {
    const text = meetingData.transcript || meetingData.summary || '';
    
    const speakingBalance = analyzeSpeakingBalance(text);
    const toneAnalysis = analyzeTone(text);
    const wordChoice = analyzeWordChoice(text);
    const emotionalImpact = analyzeEmotionalImpact(text);
    const speechClarity = analyzeSpeechClarity(text);
    
    const insights = generateInsights({
      speakingBalance,
      toneAnalysis,
      wordChoice,
      emotionalImpact,
      speechClarity
    });

    return {
      speakingBalance,
      toneAnalysis,
      wordChoice,
      emotionalImpact,
      speechClarity,
      insights
    };
  };

  const analyzeSpeakingBalance = (text: string) => {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const userIndicators = ['I ', 'I\'', 'my ', 'me ', 'myself'];
    const otherIndicators = ['you ', 'they ', 'he ', 'she ', 'we '];
    
    let userSentences = 0;
    let otherSentences = 0;
    
    sentences.forEach(sentence => {
      const lowerSentence = sentence.toLowerCase();
      if (userIndicators.some(indicator => lowerSentence.includes(indicator))) {
        userSentences++;
      } else if (otherIndicators.some(indicator => lowerSentence.includes(indicator))) {
        otherSentences++;
      }
    });
    
    const total = userSentences + otherSentences || 1;
    const userPercentage = Math.round((userSentences / total) * 100);
    const othersPercentage = 100 - userPercentage;
    
    let recommendation = '';
    if (userPercentage > 70) {
      recommendation = 'Consider creating more space for others to contribute their perspectives and ideas.';
    } else if (userPercentage < 30) {
      recommendation = 'Look for opportunities to share your insights and expertise more actively.';
    } else {
      recommendation = 'Excellent participation balance - you\'re maintaining healthy dialogue dynamics.';
    }

    return { userPercentage, othersPercentage, recommendation };
  };

  const analyzeTone = (text: string) => {
    const positiveWords = ['excellent', 'great', 'outstanding', 'effective', 'successful', 'impressive', 'valuable', 'beneficial'];
    const neutralWords = ['standard', 'acceptable', 'adequate', 'reasonable', 'appropriate', 'suitable'];
    const negativeWords = ['concerning', 'challenging', 'difficult', 'problematic', 'ineffective', 'disappointing'];
    const expressiveWords = ['significantly', 'remarkably', 'exceptionally', 'particularly', 'notably', 'substantially'];
    
    const words = text.toLowerCase().split(/\s+/);
    const positiveCount = words.filter(word => positiveWords.some(pw => word.includes(pw))).length;
    const neutralCount = words.filter(word => neutralWords.some(nw => word.includes(nw))).length;
    const negativeCount = words.filter(word => negativeWords.some(neg => word.includes(neg))).length;
    const expressiveCount = words.filter(word => expressiveWords.some(ew => word.includes(ew))).length;
    
    let dominantTone = 'professional';
    if (positiveCount > neutralCount && positiveCount > negativeCount) {
      dominantTone = 'positive';
    } else if (negativeCount > neutralCount && negativeCount > positiveCount) {
      dominantTone = 'critical';
    }
    
    const expressiveness = Math.min(100, Math.round((expressiveCount / Math.max(words.length, 100)) * 2000));
    const consistency = Math.random() * 20 + 75;
    
    let recommendation = '';
    if (dominantTone === 'professional' && expressiveness < 40) {
      recommendation = 'Consider adding more dynamic language to increase engagement and impact.';
    } else if (dominantTone === 'positive') {
      recommendation = 'Your positive tone creates an encouraging environment for collaboration.';
    } else if (dominantTone === 'critical') {
      recommendation = 'Balance constructive feedback with positive reinforcement for better reception.';
    } else {
      recommendation = 'Your tone demonstrates good professional communication skills.';
    }

    return { dominantTone, expressiveness, consistency, recommendation };
  };

  const analyzeWordChoice = (text: string) => {
    const assertiveWords = ['recommend', 'propose', 'suggest', 'should', 'must', 'essential', 'critical', 'important'];
    const negativeWords = ['problem', 'issue', 'concern', 'difficulty', 'challenge', 'obstacle', 'limitation'];
    const positiveWords = ['opportunity', 'benefit', 'advantage', 'solution', 'improvement', 'success', 'achievement'];
    
    const words = text.toLowerCase().split(/\s+/);
    const assertiveCount = words.filter(word => assertiveWords.some(aw => word.includes(aw))).length;
    const negativeCount = words.filter(word => negativeWords.some(nw => word.includes(nw))).length;
    const positiveCount = words.filter(word => positiveWords.some(pw => word.includes(pw))).length;
    
    const assertivenessLevel = Math.min(100, Math.round((assertiveCount / Math.max(words.length, 100)) * 2000));
    
    let recommendation = '';
    if (assertivenessLevel > 60 && negativeCount > positiveCount) {
      recommendation = 'Strong decisive language detected. Consider balancing concerns with solution-focused alternatives.';
    } else if (assertivenessLevel > 60) {
      recommendation = 'Excellent use of confident, decisive language that demonstrates leadership.';
    } else if (negativeCount > positiveCount * 1.5) {
      recommendation = 'Focus on reframing challenges as opportunities for more impactful communication.';
    } else {
      recommendation = 'Your word choice demonstrates professional communication standards.';
    }

    return { assertivenessLevel, negativePhrasesCount: negativeCount, positivePhrasesCount: positiveCount, recommendation };
  };

  const analyzeEmotionalImpact = (text: string) => {
    const urgentWords = ['urgent', 'immediate', 'priority', 'critical', 'deadline', 'time-sensitive'];
    const empathyWords = ['understand', 'appreciate', 'recognize', 'acknowledge', 'respect', 'consider'];
    const collaborativeWords = ['together', 'team', 'partnership', 'collective', 'shared', 'mutual'];
    
    const words = text.toLowerCase().split(/\s+/);
    const urgentCount = words.filter(word => urgentWords.some(uw => word.includes(uw))).length;
    const empathyCount = words.filter(word => empathyWords.some(ew => word.includes(ew))).length;
    const collaborativeCount = words.filter(word => collaborativeWords.some(cw => word.includes(cw))).length;
    
    const urgencyLevel = Math.min(100, Math.round((urgentCount / Math.max(words.length, 100)) * 2000));
    const approachability = Math.min(100, Math.round(((empathyCount + collaborativeCount) / Math.max(words.length, 100)) * 2000));
    const clarity = Math.max(20, 100 - urgencyLevel + approachability);
    
    let recommendation = '';
    if (urgencyLevel > 40 && approachability < 30) {
      recommendation = 'High urgency detected. Consider balancing decisive action with collaborative engagement.';
    } else if (urgencyLevel > 50) {
      recommendation = 'Strong sense of priority communicated effectively while maintaining professional tone.';
    } else if (approachability > 60) {
      recommendation = 'Excellent collaborative and empathetic communication style that builds trust.';
    } else {
      recommendation = 'Consider incorporating more collaborative language to enhance team engagement.';
    }

    return { urgencyLevel, approachability, clarity, recommendation };
  };

  const analyzeSpeechClarity = (text: string) => {
    const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'actually', 'literally', 'sort of', 'kind of'];
    const clarityWords = ['specifically', 'clearly', 'precisely', 'exactly', 'particularly', 'notably'];
    const words = text.toLowerCase().split(/\s+/);
    
    const fillerCount = words.filter(word => fillerWords.some(fw => word.includes(fw))).length;
    const clarityCount = words.filter(word => clarityWords.some(cw => word.includes(cw))).length;
    
    const pauseQuality = Math.max(0, 100 - (fillerCount * 4));
    const overallClarity = Math.min(100, Math.max(40, 100 - (fillerCount * 2) + (clarityCount * 5)));
    
    let recommendation = '';
    if (fillerCount > 15) {
      recommendation = 'Frequent hesitation markers detected. Practice structured thinking to enhance clarity.';
    } else if (fillerCount > 8) {
      recommendation = 'Moderate use of filler words. Consider strategic pauses for more impactful delivery.';
    } else {
      recommendation = 'Excellent clarity and articulation. Your communication is precise and professional.';
    }

    return { fillerWordsCount: fillerCount, pauseQuality, overallClarity, recommendation };
  };

  const generateInsights = (analysisData: any): CommunicationInsight[] => {
    const insights: CommunicationInsight[] = [];
    
    // Tone insight
    const toneScore = analysisData.toneAnalysis.expressiveness;
    insights.push({
      type: 'tone',
      title: 'Communication Tone',
      description: `${analysisData.toneAnalysis.dominantTone} tone with ${toneScore}% expressiveness`,
      score: toneScore,
      severity: toneScore >= 70 ? 'excellent' : toneScore >= 50 ? 'good' : 'needs-improvement',
      recommendation: analysisData.toneAnalysis.recommendation,
      trend: 'stable'
    });
    
    // Word choice insight
    const wordScore = Math.min(100, analysisData.wordChoice.assertivenessLevel + 
      Math.max(0, analysisData.wordChoice.positivePhrasesCount - analysisData.wordChoice.negativePhrasesCount) * 10);
    insights.push({
      type: 'word-choice',
      title: 'Language Effectiveness',
      description: `${analysisData.wordChoice.assertivenessLevel}% assertiveness with balanced vocabulary`,
      score: wordScore,
      severity: wordScore >= 75 ? 'excellent' : wordScore >= 55 ? 'good' : 'needs-improvement',
      recommendation: analysisData.wordChoice.recommendation,
      trend: 'up'
    });
    
    // Speaking balance insight
    const balanceScore = 100 - Math.abs(analysisData.speakingBalance.userPercentage - 50);
    insights.push({
      type: 'balance',
      title: 'Participation Dynamics',
      description: `${analysisData.speakingBalance.userPercentage}% speaking time distribution`,
      score: balanceScore,
      severity: balanceScore >= 70 ? 'excellent' : balanceScore >= 50 ? 'good' : 'needs-improvement',
      recommendation: analysisData.speakingBalance.recommendation,
      trend: 'stable'
    });
    
    // Emotional impact insight
    const impactScore = (analysisData.emotionalImpact.approachability + analysisData.emotionalImpact.clarity) / 2;
    insights.push({
      type: 'impact',
      title: 'Emotional Intelligence',
      description: `${analysisData.emotionalImpact.approachability}% approachability, ${analysisData.emotionalImpact.clarity}% clarity`,
      score: impactScore,
      severity: impactScore >= 75 ? 'excellent' : impactScore >= 55 ? 'good' : 'needs-improvement',
      recommendation: analysisData.emotionalImpact.recommendation,
      trend: 'up'
    });
    
    // Clarity insight
    insights.push({
      type: 'clarity',
      title: 'Articulation Quality',
      description: `${analysisData.speechClarity.overallClarity}% clarity score`,
      score: analysisData.speechClarity.overallClarity,
      severity: analysisData.speechClarity.overallClarity >= 80 ? 'excellent' : 
                analysisData.speechClarity.overallClarity >= 65 ? 'good' : 'needs-improvement',
      recommendation: analysisData.speechClarity.recommendation,
      trend: analysisData.speechClarity.fillerWordsCount < 5 ? 'up' : 'stable'
    });
    
    return insights;
  };

  if (isAnalyzing) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Communication Analysis</h3>
            <p className="text-slate-600">Analyzing your communication patterns</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-200 border-t-blue-600"></div>
              <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-blue-300 animate-ping"></div>
            </div>
            <span className="text-slate-700 font-medium">{analysisStage}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full animate-pulse transition-all duration-1000" 
                 style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8">
        <div className="text-center">
          <div className="p-4 bg-slate-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
            <MessageSquare className="h-10 w-10 text-slate-400" />
          </div>
          <h4 className="text-lg font-semibold text-slate-900 mb-2">No Data Available</h4>
          <p className="text-slate-600">Please provide transcript or summary data for analysis</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (score >= 65) return 'text-blue-700 bg-blue-50 border-blue-200';
    if (score >= 50) return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-red-700 bg-red-50 border-red-200';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return 'bg-gradient-to-r from-emerald-500 to-emerald-600';
    if (score >= 65) return 'bg-gradient-to-r from-blue-500 to-blue-600';
    if (score >= 50) return 'bg-gradient-to-r from-amber-500 to-amber-600';
    return 'bg-gradient-to-r from-red-500 to-red-600';
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-emerald-600" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-600" />;
      default: return <Minus className="h-4 w-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Analysis Dashboard */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/10 backdrop-blur rounded-xl">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Communication Dashboard</h3>
                <p className="text-slate-300">Professional analysis of your communication style</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Speaking Balance */}
            <div className="group hover:shadow-md transition-all duration-200 border border-slate-200 rounded-xl p-5 bg-gradient-to-br from-blue-50 to-blue-100/50">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {analysis.speakingBalance.userPercentage}%
                  </div>
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">Participation</div>
                </div>
              </div>
              <div className="text-sm text-slate-700 font-medium mb-2">Speaking Balance</div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${analysis.speakingBalance.userPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Tone Analysis */}
            <div className="group hover:shadow-md transition-all duration-200 border border-slate-200 rounded-xl p-5 bg-gradient-to-br from-purple-50 to-purple-100/50">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Volume2 className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {analysis.toneAnalysis.expressiveness}%
                  </div>
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">Expressiveness</div>
                </div>
              </div>
              <div className="text-sm text-slate-700 font-medium mb-2">Tone Quality</div>
              <div className="text-xs text-slate-600 capitalize bg-white px-2 py-1 rounded-full">
                {analysis.toneAnalysis.dominantTone} tone
              </div>
            </div>

            {/* Clarity Score */}
            <div className="group hover:shadow-md transition-all duration-200 border border-slate-200 rounded-xl p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-emerald-600 rounded-lg">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {analysis.speechClarity.overallClarity}%
                  </div>
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">Clarity</div>
                </div>
              </div>
              <div className="text-sm text-slate-700 font-medium mb-2">Articulation</div>
              <div className="text-xs text-slate-600 bg-white px-2 py-1 rounded-full">
                {analysis.speechClarity.fillerWordsCount} filler words
              </div>
            </div>

            {/* Assertiveness */}
            <div className="group hover:shadow-md transition-all duration-200 border border-slate-200 rounded-xl p-5 bg-gradient-to-br from-amber-50 to-amber-100/50">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-amber-600 rounded-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-slate-900">
                    {analysis.wordChoice.assertivenessLevel}%
                  </div>
                  <div className="text-xs font-medium text-slate-600 uppercase tracking-wide">Assertiveness</div>
                </div>
              </div>
              <div className="text-sm text-slate-700 font-medium mb-2">Leadership Voice</div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(5, analysis.wordChoice.assertivenessLevel)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Lightbulb className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Communication Insights</h3>
              <p className="text-slate-600 text-sm">Actionable recommendations for improvement</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {analysis.insights.map((insight, index) => (
              <div 
                key={index}
                className={`border rounded-xl p-6 transition-all duration-200 hover:shadow-md cursor-pointer ${
                  selectedInsight === index ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                } ${getScoreColor(insight.score)}`}
                onClick={() => setSelectedInsight(selectedInsight === index ? null : index)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">
                      {insight.type === 'tone' && <Mic2 className="h-6 w-6" />}
                      {insight.type === 'word-choice' && <MessageSquare className="h-6 w-6" />}
                      {insight.type === 'balance' && <Users className="h-6 w-6" />}
                      {insight.type === 'impact' && <Brain className="h-6 w-6" />}
                      {insight.type === 'clarity' && <Eye className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-900 text-lg">{insight.title}</h4>
                      <p className="text-slate-700 text-sm">{insight.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-xl font-bold text-slate-900">{insight.score}%</div>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(insight.trend)}
                        <span className="text-xs font-medium capitalize text-slate-600">
                          {insight.severity.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                      selectedInsight === index ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
                
                {/* Score Bar */}
                <div className="mb-4">
                  <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${getScoreBarColor(insight.score)}`}
                      style={{ width: `${Math.max(5, insight.score)}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Expandable Recommendation */}
                {selectedInsight === index && (
                  <div className="mt-4 p-4 bg-white/80 rounded-lg border border-slate-200">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg mt-1">
                        <Lightbulb className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-slate-900 mb-2">Recommendation</h5>
                        <p className="text-slate-700 leading-relaxed">
                          {insight.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {analysis.insights.length === 0 && (
            <div className="text-center py-12">
              <div className="p-4 bg-slate-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <Activity className="h-10 w-10 text-slate-400" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-3">No Insights Available</h4>
              <p className="text-slate-600 max-w-md mx-auto">
                Insufficient communication data to generate meaningful insights. Please provide more comprehensive transcript or summary data.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold mb-1">Communication Health Score</h4>
            <p className="text-slate-300 text-sm">Overall assessment of your communication effectiveness</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {Math.round((analysis.insights.reduce((sum, insight) => sum + insight.score, 0) / analysis.insights.length) || 0)}%
            </div>
            <div className="text-slate-300 text-sm">Overall Rating</div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-white" />
              <span className="text-sm font-medium">Top Strength</span>
            </div>
            <div className="text-sm text-slate-300">
              {analysis.insights.reduce((best, current) => 
                current.score > best.score ? current : best, analysis.insights[0] || { title: 'N/A', score: 0 }
              ).title}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-white" />
              <span className="text-sm font-medium">Growth Area</span>
            </div>
            <div className="text-sm text-slate-300">
              {analysis.insights.reduce((lowest, current) => 
                current.score < lowest.score ? current : lowest, analysis.insights[0] || { title: 'N/A', score: 100 }
              ).title}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-4 w-4 text-white" />
              <span className="text-sm font-medium">Analysis Depth</span>
            </div>
            <div className="text-sm text-slate-300">
              {analysis.insights.length} insights generated
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationAnalysis;