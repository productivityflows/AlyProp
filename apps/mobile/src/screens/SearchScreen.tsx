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

const SearchScreen = ({ navigation }: any) => {
  const [address, setAddress] = useState('');
  const [strategy, setStrategy] = useState('rental');

  const handleAnalyze = () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter a property address');
      return;
    }

    // TODO: Implement actual API call and payment processing
    navigation.navigate('Results', { address, strategy });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Property Analysis</Text>
        <Text style={styles.subtitle}>
          Enter a property address to get AI-powered investment insights
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Property Address</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="123 Main Street, Anytown, State 12345"
            multiline
          />

          <Text style={styles.label}>Investment Strategy</Text>
          <View style={styles.strategies}>
            {['rental', 'flip', 'brrrr', 'wholesale'].map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.strategyButton,
                  strategy === s && styles.strategyButtonActive
                ]}
                onPress={() => setStrategy(s)}
              >
                <Text style={[
                  styles.strategyText,
                  strategy === s && styles.strategyTextActive
                ]}>
                  {s.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.analyzeButton}
            onPress={handleAnalyze}
          >
            <Text style={styles.analyzeButtonText}>
              Analyze Property - $5.00
            </Text>
          </TouchableOpacity>
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
    marginBottom: 24,
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
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
    marginBottom: 20,
    minHeight: 50,
  },
  strategies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  strategyButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  strategyButtonActive: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0ea5e9',
  },
  strategyText: {
    fontSize: 14,
    color: '#6b7280',
  },
  strategyTextActive: {
    color: '#ffffff',
  },
  analyzeButton: {
    backgroundColor: '#0ea5e9',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  analyzeButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SearchScreen;