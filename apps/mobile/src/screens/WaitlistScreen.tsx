import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

const WaitlistScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // TODO: Implement actual API call
    Alert.alert(
      'Success!',
      'Thank you for joining our waitlist. You\'ll be notified when Pro features launch!',
      [{ text: 'OK' }]
    );
    
    setFormData({ name: '', email: '' });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Join the Pro Waitlist</Text>
        <Text style={styles.subtitle}>
          Be the first to access unlimited AI property analysis, deal alerts, 
          and advanced portfolio tools when we launch our Pro subscription.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="John Doe"
          />

          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            placeholder="john@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Join Pro Waitlist</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.benefits}>
          <Text style={styles.benefitsTitle}>Waitlist Benefits</Text>
          
          <View style={styles.benefit}>
            <Text style={styles.benefitTitle}>🎯 Early Access</Text>
            <Text style={styles.benefitText}>
              Get access before public launch
            </Text>
          </View>

          <View style={styles.benefit}>
            <Text style={styles.benefitTitle}>💰 Launch Discount</Text>
            <Text style={styles.benefitText}>
              Exclusive pricing for early adopters
            </Text>
          </View>

          <View style={styles.benefit}>
            <Text style={styles.benefitTitle}>⭐ VIP Updates</Text>
            <Text style={styles.benefitText}>
              Behind-the-scenes development updates
            </Text>
          </View>
        </View>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Pro Features Coming Soon</Text>
          
          <View style={styles.featuresList}>
            <Text style={styles.featureItem}>• Unlimited property searches</Text>
            <Text style={styles.featureItem}>• Real-time deal alerts</Text>
            <Text style={styles.featureItem}>• Portfolio management tools</Text>
            <Text style={styles.featureItem}>• Advanced market analytics</Text>
            <Text style={styles.featureItem}>• API access for automation</Text>
            <Text style={styles.featureItem}>• Export and reporting tools</Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  benefits: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  benefit: {
    marginBottom: 12,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 14,
    color: '#6b7280',
  },
  features: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
});

export default WaitlistScreen;