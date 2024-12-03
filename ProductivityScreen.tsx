import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';

export default function ProductivityScreen() {
  const [tasks, setTasks] = useState<{ title: string; completed: boolean }[]>([]); // Lưu danh sách công việc với trạng thái hoàn thành
  const [newTask, setNewTask] = useState(''); // Lưu công việc mới nhập vào

  // Thêm công việc mới vào danh sách
  const addTask = () => {
    if (newTask.trim()) {
      const newTaskItem = { title: newTask, completed: false };
      setTasks([...tasks, newTaskItem]); // Thêm công việc mới vào danh sách
      setNewTask(''); // Xóa input sau khi thêm
    }
  };

  // Đánh dấu công việc là hoàn thành
  const toggleTaskCompletion = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Xóa công việc
  const deleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index); // Xóa công việc tại chỉ số index
    setTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Productivity</Text>

      {/* Hiển thị số công việc hoàn thành */}
      <Text style={styles.productivityText}>Completed Tasks: {tasks.filter(task => task.completed).length} / {tasks.length}</Text>

      {/* Input cho công việc mới */}
      <TextInput
        style={styles.input}
        placeholder="Enter new task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Add Task" onPress={addTask} />

      {/* Hiển thị danh sách công việc */}
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.title}</Text>
            <Button title={item.completed ? "Undo" : "Complete"} onPress={() => toggleTaskCompletion(index)} />
            <Button title="Delete" onPress={() => deleteTask(index)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  productivityText: { fontSize: 18, marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: { fontSize: 16, flex: 1 },
  completedTask: { textDecorationLine: 'line-through', color: 'gray' }, // Đánh dấu công việc đã hoàn thành
});
