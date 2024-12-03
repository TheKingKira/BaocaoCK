import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TaskProps {
  task: {
    id: string;
    title: string;
    deadline: string;
    type: string;
  };
}

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.type}>Type: {task.type}</Text>
      <Text style={styles.deadline}>Deadline: {task.deadline}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 15, backgroundColor: '#f9f9f9', borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  type: { fontSize: 16, color: '#333' },
  deadline: { fontSize: 14, color: '#666' },
});

export default TaskCard;
