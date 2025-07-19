// azure-text-analytics.js
import { TextAnalyticsClient, AzureKeyCredential } from '@azure/ai-text-analytics';

class AzureTextAnalyticsService {
  constructor() {
    this.client = null;
    this.initialized = false;
  }

  async initialize() {
    try {
      const key = process.env.AZURE_TEXT_ANALYTICS_KEY;
      const endpoint = process.env.AZURE_TEXT_ANALYTICS_ENDPOINT;
      
      if (!key || !endpoint) {
        throw new Error('Azure Text Analytics credentials not found in environment variables');
      }

      this.client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));
      this.initialized = true;
      
      // Test the connection
      await this.testConnection();
      
      console.log('Azure Text Analytics service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Azure Text Analytics:', error);
      throw error;
    }
  }

  async testConnection() {
    try {
      const testDocuments = [{ id: "1", text: "Hello world" }];
      await this.client.analyzeSentiment(testDocuments);
      return true;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }

  async analyzeSentiment(documents) {
    if (!this.initialized) {
      throw new Error('Service not initialized. Call initialize() first.');
    }

    try {
      const formattedDocs = documents.map((doc, index) => ({
        id: doc.id || index.toString(),
        text: doc.text.substring(0, 5120), // Azure limit is 5120 characters
        language: doc.language || 'en'
      }));

      const results = await this.client.analyzeSentiment(formattedDocs);
      
      return results.map(result => ({
        id: result.id,
        sentiment: result.sentiment,
        confidenceScores: result.confidenceScores,
        sentences: result.sentences.map(sentence => ({
          text: sentence.text,
          sentiment: sentence.sentiment,
          confidenceScores: sentence.confidenceScores,
          offset: sentence.offset,
          length: sentence.length
        })),
        warnings: result.warnings || []
      }));
    } catch (error) {
      console.error('Sentiment analysis failed:', error);
      throw error;
    }
  }

  async extractKeyPhrases(documents) {
    if (!this.initialized) {
      throw new Error('Service not initialized. Call initialize() first.');
    }

    try {
      const formattedDocs = documents.map((doc, index) => ({
        id: doc.id || index.toString(),
        text: doc.text.substring(0, 5120),
        language: doc.language || 'en'
      }));

      const results = await this.client.extractKeyPhrases(formattedDocs);
      
      return results.map(result => ({
        id: result.id,
        keyPhrases: result.keyPhrases,
        warnings: result.warnings || []
      }));
    } catch (error) {
      console.error('Key phrase extraction failed:', error);
      throw error;
    }
  }

  async recognizeEntities(documents) {
    if (!this.initialized) {
      throw new Error('Service not initialized. Call initialize() first.');
    }

    try {
      const formattedDocs = documents.map((doc, index) => ({
        id: doc.id || index.toString(),
        text: doc.text.substring(0, 5120),
        language: doc.language || 'en'
      }));

      const results = await this.client.recognizeEntities(formattedDocs);
      
      return results.map(result => ({
        id: result.id,
        entities: result.entities.map(entity => ({
          text: entity.text,
          category: entity.category,
          subCategory: entity.subCategory,
          confidence: entity.confidenceScore,
          offset: entity.offset,
          length: entity.length
        })),
        warnings: result.warnings || []
      }));
    } catch (error) {
      console.error('Entity recognition failed:', error);
      throw error;
    }
  }

  async recognizePiiEntities(documents) {
    if (!this.initialized) {
      throw new Error('Service not initialized. Call initialize() first.');
    }

    try {
      const formattedDocs = documents.map((doc, index) => ({
        id: doc.id || index.toString(),
        text: doc.text.substring(0, 5120),
        language: doc.language || 'en'
      }));

      const results = await this.client.recognizePiiEntities(formattedDocs);
      
      return results.map(result => ({
        id: result.id,
        entities: result.entities.map(entity => ({
          text: entity.text,
          category: entity.category,
          subCategory: entity.subCategory,
          confidence: entity.confidenceScore,
          offset: entity.offset,
          length: entity.length
        })),
        redactedText: result.redactedText,
        warnings: result.warnings || []
      }));
    } catch (error) {
      console.error('PII entity recognition failed:', error);
      throw error;
    }
  }

  async detectLanguage(documents) {
    if (!this.initialized) {
      throw new Error('Service not initialized. Call initialize() first.');
    }

    try {
      const formattedDocs = documents.map((doc, index) => ({
        id: doc.id || index.toString(),
        text: doc.text.substring(0, 5120)
      }));

      const results = await this.client.detectLanguage(formattedDocs);
      
      return results.map(result => ({
        id: result.id,
        primaryLanguage: result.primaryLanguage,
        warnings: result.warnings || []
      }));
    } catch (error) {
      console.error('Language detection failed:', error);
      throw error;
    }
  }

  async analyzeHealthcare(documents) {
    if (!this.initialized) {
      throw new Error('Service not initialized. Call initialize() first.');
    }

    try {
      const formattedDocs = documents.map((doc, index) => ({
        id: doc.id || index.toString(),
        text: doc.text.substring(0, 5120),
        language: doc.language || 'en'
      }));

      const poller = await this.client.beginAnalyzeHealthcareEntities(formattedDocs);
      const results = await poller.pollUntilDone();
      
      return Array.from(results).map(result => ({
        id: result.id,
        entities: result.entities.map(entity => ({
          text: entity.text,
          category: entity.category,
          subCategory: entity.subCategory,
          confidence: entity.confidenceScore,
          offset: entity.offset,
          length: entity.length,
          assertion: entity.assertion,
          normalizedText: entity.normalizedText
        })),
        entityRelations: result.entityRelations,
        warnings: result.warnings || []
      }));
    } catch (error) {
      console.error('Healthcare analysis failed:', error);
      throw error;
    }
  }

  async performBatchAnalysis(documents) {
    if (!this.initialized) {
      throw new Error('Service not initialized. Call initialize() first.');
    }

    try {
      // Perform all analyses in parallel for better performance
      const [
        sentimentResults,
        keyPhraseResults,
        entityResults,
        languageResults
      ] = await Promise.all([
        this.analyzeSentiment(documents),
        this.extractKeyPhrases(documents),
        this.recognizeEntities(documents),
        this.detectLanguage(documents)
      ]);

      // Combine results by document ID
      const combinedResults = documents.map(doc => {
        const id = doc.id || '0';
        return {
          id,
          originalText: doc.text,
          sentiment: sentimentResults.find(r => r.id === id),
          keyPhrases: keyPhraseResults.find(r => r.id === id),
          entities: entityResults.find(r => r.id === id),
          language: languageResults.find(r => r.id === id)
        };
      });

      return combinedResults;
    } catch (error) {
      console.error('Batch analysis failed:', error);
      throw error;
    }
  }

  // Helper method to process meeting transcripts with chunking
  async processMeetingTranscript(transcript, chunkSize = 4000) {
    if (!transcript || transcript.length === 0) {
      throw new Error('Empty transcript provided');
    }

    try {
      // Split transcript into chunks if it's too long
      const chunks = this.chunkText(transcript, chunkSize);
      const documents = chunks.map((chunk, index) => ({
        id: `chunk_${index}`,
        text: chunk
      }));

      // Perform batch analysis
      const results = await this.performBatchAnalysis(documents);

      // Aggregate results
      const aggregatedResult = this.aggregateResults(results);
      
      return aggregatedResult;
    } catch (error) {
      console.error('Meeting transcript processing failed:', error);
      throw error;
    }
  }

  chunkText(text, chunkSize) {
    const chunks = [];
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    let currentChunk = '';

    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > chunkSize && currentChunk.length > 0) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += sentence + '. ';
      }
    }

    if (currentChunk.trim().length > 0) {
      chunks.push(currentChunk.trim());
    }

    return chunks;
  }

  aggregateResults(results) {
    // Aggregate sentiment scores
    const sentimentScores = results.map(r => r.sentiment.confidenceScores);
    const avgSentiment = {
      positive: sentimentScores.reduce((sum, s) => sum + s.positive, 0) / sentimentScores.length,
      negative: sentimentScores.reduce((sum, s) => sum + s.negative, 0) / sentimentScores.length,
      neutral: sentimentScores.reduce((sum, s) => sum + s.neutral, 0) / sentimentScores.length
    };

    // Determine overall sentiment
    const overallSentiment = avgSentiment.positive > avgSentiment.negative ? 
      (avgSentiment.positive > avgSentiment.neutral ? 'positive' : 'neutral') :
      (avgSentiment.negative > avgSentiment.neutral ? 'negative' : 'neutral');

    // Aggregate key phrases
    const allKeyPhrases = results.flatMap(r => r.keyPhrases.keyPhrases);
    const uniqueKeyPhrases = [...new Set(allKeyPhrases)];

    // Aggregate entities
    const allEntities = results.flatMap(r => r.entities.entities);
    const uniqueEntities = allEntities.filter((entity, index, self) => 
      index === self.findIndex(e => e.text === entity.text && e.category === entity.category)
    );

    // Get all sentences for detailed analysis
    const allSentences = results.flatMap(r => r.sentiment.sentences);

    return {
      overall: {
        sentiment: overallSentiment,
        confidenceScores: avgSentiment,
        confidence: Math.max(...Object.values(avgSentiment)) * 100
      },
      detailed: {
        sentences: allSentences,
        keyPhrases: uniqueKeyPhrases,
        entities: uniqueEntities,
        chunks: results.length
      },
      businessMetrics: this.generateBusinessMetrics(overallSentiment, avgSentiment, uniqueKeyPhrases, uniqueEntities),
      rawResults: results
    };
  }

  generateBusinessMetrics(sentiment, confidenceScores, keyPhrases, entities) {
    // Calculate engagement score based on sentiment and content richness
    const engagementScore = Math.round(
      (confidenceScores.positive * 40 + 
       (keyPhrases.length / 10) * 30 + 
       (entities.length / 10) * 20 + 
       (sentiment === 'positive' ? 10 : sentiment === 'neutral' ? 5 : 0)) * 100
    );

    // Determine risk level
    const riskLevel = confidenceScores.negative > 0.7 ? 'high' : 
                     confidenceScores.negative > 0.4 ? 'medium' : 'low';

    // Generate action items based on analysis
    const actionItems = [];
    if (riskLevel === 'high') {
      actionItems.push('Address negative sentiment immediately');
      actionItems.push('Schedule follow-up meeting with stakeholders');
    }
    if (confidenceScores.neutral > 0.6) {
      actionItems.push('Seek more specific feedback from participants');
    }

    // Generate recommendations
    const recommendations = [];
    if (sentiment === 'positive') {
      recommendations.push('Leverage positive momentum for future initiatives');
      recommendations.push('Document successful practices for team reference');
    }
    if (keyPhrases.length > 5) {
      recommendations.push('Consider breaking down complex topics into focused sessions');
    }

    return {
      engagementScore: Math.min(engagementScore, 100),
      riskLevel,
      actionItems,
      recommendations,
      keyTopics: keyPhrases.slice(0, 5),
      entityTypes: [...new Set(entities.map(e => e.category))]
    };
  }

  // Utility method to format results for frontend
  formatForFrontend(analysisResult) {
    return {
      overall: {
        sentiment: analysisResult.overall.sentiment,
        confidence: analysisResult.overall.confidence,
        score: analysisResult.overall.confidenceScores.positive - analysisResult.overall.confidenceScores.negative
      },
      detailed: {
        sentences: analysisResult.detailed.sentences,
        keyPhrases: analysisResult.detailed.keyPhrases,
        entities: analysisResult.detailed.entities,
        emotions: this.generateEmotionScores(analysisResult.overall.sentiment, analysisResult.overall.confidenceScores)
      },
      insights: this.generateInsights(analysisResult),
      businessMetrics: analysisResult.businessMetrics,
      trends: {
        sentimentTrend: analysisResult.overall.sentiment === 'positive' ? 'improving' : 'declining',
        confidenceTrend: 'stable',
        keyTopics: analysisResult.businessMetrics.keyTopics
      }
    };
  }

  generateEmotionScores(sentiment, confidenceScores) {
    // Generate emotion scores based on sentiment (Azure doesn't provide emotion analysis directly)
    const baseEmotions = {
      joy: 0.1,
      sadness: 0.1,
      anger: 0.1,
      fear: 0.1,
      surprise: 0.1,
      disgust: 0.1
    };

    if (sentiment === 'positive') {
      baseEmotions.joy = confidenceScores.positive * 0.8;
      baseEmotions.surprise = confidenceScores.positive * 0.3;
    } else if (sentiment === 'negative') {
      baseEmotions.sadness = confidenceScores.negative * 0.4;
      baseEmotions.anger = confidenceScores.negative * 0.5;
      baseEmotions.disgust = confidenceScores.negative * 0.3;
    }

    return baseEmotions;
  }

  generateInsights(analysisResult) {
    const insights = [];
    const { sentiment, confidenceScores } = analysisResult.overall;
    const { keyPhrases, entities } = analysisResult.detailed;

    // Sentiment-based insights
    if (sentiment === 'positive' && confidenceScores.positive > 0.6) {
      insights.push({
        type: 'engagement',
        title: 'High Positive Engagement',
        description: 'Strong positive sentiment indicates excellent team engagement and satisfaction.',
        severity: 'low',
        actionable: true
      });
    }

    if (sentiment === 'negative' && confidenceScores.negative > 0.5) {
      insights.push({
        type: 'risk',
        title: 'Negative Sentiment Detected',
        description: 'Elevated negative sentiment requires immediate attention and follow-up.',
        severity: 'high',
        actionable: true
      });
    }

    // Content richness insights
    if (keyPhrases.length > 8) {
      insights.push({
        type: 'communication',
        title: 'Rich Discussion Content',
        description: 'Multiple key topics discussed indicating comprehensive meeting coverage.',
        severity: 'low',
        actionable: false
      });
    }

    // Entity-based insights
    const organizationEntities = entities.filter(e => e.category === 'Organization');
    if (organizationEntities.length > 3) {
      insights.push({
        type: 'stakeholder',
        title: 'Multiple Stakeholders Involved',
        description: 'Discussion involves multiple organizations, suggesting complex stakeholder dynamics.',
        severity: 'medium',
        actionable: true
      });
    }

    return insights;
  }
}

// Export singleton instance
export const azureTextAnalytics = new AzureTextAnalyticsService();
export default AzureTextAnalyticsService;