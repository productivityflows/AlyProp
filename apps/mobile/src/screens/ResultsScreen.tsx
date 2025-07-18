import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const ResultsScreen = ({ route }: any) => {
  const { address, strategy } = route.params;

  // Mock data - replace with actual API call
  const mockResults = {
    dealScore: 8.2,
    price: 285000,
    cashFlow: 425,
    capRate: 6.8,
    roi: 15.2,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.address}>{address}</Text>
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>{mockResults.dealScore}/10</Text>
            <Text style={styles.scoreLabel}>AI Deal Score</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Details</Text>
          <View style={styles.metrics}>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>${mockResults.price.toLocaleString()}</Text>
              <Text style={styles.metricLabel}>List Price</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>3/2</Text>
              <Text style={styles.metricLabel}>Bed/Bath</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>1,850</Text>
              <Text style={styles.metricLabel}>Sq Ft</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>1995</Text>
              <Text style={styles.metricLabel}>Year Built</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Analysis</Text>
          <View style={styles.metrics}>
            <View style={styles.metric}>
              <Text style={[styles.metricValue, styles.positive]}>
                ${mockResults.cashFlow}
              </Text>
              <Text style={styles.metricLabel}>Monthly Cash Flow</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{mockResults.capRate}%</Text>
              <Text style={styles.metricLabel}>Cap Rate</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>{mockResults.roi}%</Text>
              <Text style={styles.metricLabel}>Total ROI</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>12.4%</Text>
              <Text style={styles.metricLabel}>Cash-on-Cash</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>AI Insights</Text>
          <Text style={styles.summary}>
            This property shows strong rental potential with above-market cash flow. 
            The neighborhood is experiencing steady appreciation with good rental demand.
          </Text>
          
          <View style={styles.insights}>
            <Text style={styles.insightTitle}>✅ Strengths</Text>
            <Text style={styles.insightText}>• Strong rental market with 95% occupancy rates</Text>
            <Text style={styles.insightText}>• Recent neighborhood improvements</Text>
            <Text style={styles.insightText}>• Cash flow positive from day one</Text>
          </View>

          <View style={styles.insights}>
            <Text style={styles.insightTitle}>⚠️ Risks</Text>
            <Text style={styles.insightText}>• Roof may need replacement within 5-7 years</Text>
            <Text style={styles.insightText}>• Local property taxes trending upward</Text>
            <Text style={styles.insightText}>• Some deferred maintenance visible</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.exportButton}>
          <Text style={styles.exportButtonText}>Export Full Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  content: {
    padding: 20,
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0ea5e9',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metric: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  positive: {
    color: '#059669',
  },
  summary: {
    fontSize: 16,
    color: '#6b7280',
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  insights: {
    marginBottom: 16,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  insightText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  exportButton: {
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  exportButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResultsScreen;