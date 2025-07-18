import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#0ea5e9', '#0284c7']}
        style={styles.header}
      >
        <Text style={styles.title}>PropertyAI Pro</Text>
        <Text style={styles.subtitle}>
          AI-Powered Real Estate Investment Analysis
        </Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get Deep AI Insights</Text>
          <Text style={styles.sectionText}>
            Analyze any property nationwide with Claude 3 Haiku AI. Get ROI calculations, 
            market context, and investment recommendations for just $5 per search.
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>🎯 Deal Analysis</Text>
            <Text style={styles.featureText}>
              AI-powered investment scoring and recommendations
            </Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>📊 Financial Metrics</Text>
            <Text style={styles.featureText}>
              ROI, cash flow, cap rates, and more
            </Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>🏘️ Market Context</Text>
            <Text style={styles.featureText}>
              Local comparables and market trends
            </Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>⚠️ Risk Assessment</Text>
            <Text style={styles.featureText}>
              Identify potential red flags and risks
            </Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Search')}
          >
            <Text style={styles.primaryButtonText}>
              Analyze Property - $5
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Waitlist')}
          >
            <Text style={styles.secondaryButtonText}>
              Join Pro Waitlist
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pricing}>
          <Text style={styles.pricingTitle}>Simple Pricing</Text>
          
          <View style={styles.pricingCard}>
            <Text style={styles.price}>$5</Text>
            <Text style={styles.priceText}>per search</Text>
            <Text style={styles.priceDescription}>
              Full AI analysis with no subscription required
            </Text>
          </View>

          <View style={styles.comingSoon}>
            <Text style={styles.comingSoonTitle}>Coming Soon: Pro Subscription</Text>
            <Text style={styles.comingSoonPrice}>$39.99/month</Text>
            <Text style={styles.comingSoonText}>
              Unlimited searches, deal alerts, portfolio tools
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    padding: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#bfdbfe',
    textAlign: 'center',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  features: {
    marginBottom: 30,
  },
  feature: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: '#6b7280',
  },
  buttons: {
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  secondaryButtonText: {
    color: '#1f2937',
    fontSize: 16,
    fontWeight: '500',
  },
  pricing: {
    alignItems: 'center',
  },
  pricingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  pricingCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0ea5e9',
  },
  priceText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  priceDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  comingSoon: {
    backgroundColor: '#fef3c7',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginBottom: 4,
  },
  comingSoonPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 4,
  },
  comingSoonText: {
    fontSize: 12,
    color: '#92400e',
    textAlign: 'center',
  },
});

export default HomeScreen;