import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Calendar: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', borderRadius: 10, marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold' },
});

export default Calendar;
