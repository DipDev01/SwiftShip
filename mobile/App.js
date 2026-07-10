import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function App() {
  const [apiStatus, setApiStatus] = useState('Checking connection...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If testing on a physical device, replace localhost with your computer's local IP address
    fetch('http://localhost:3001/api/status')
      .then(response => response.json())
      .then(data => {
        setApiStatus(data.status ? `Connected to Database!\nTime: ${data.dbTime}` : 'API Connected, DB Failed');
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setApiStatus('Failed to connect to backend API.\nEnsure NestJS is running on port 3000.');
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>SwiftShip API Status:</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.indicator} />
      ) : (
        <Text style={styles.statusText}>{apiStatus}</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#333',
  },
  indicator: {
    marginTop: 20,
  }
});
