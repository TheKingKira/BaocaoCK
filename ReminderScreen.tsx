import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';

export default function ReminderScreen() {
  const [reminders, setReminders] = useState<string[]>([]); // Lưu danh sách nhắc nhở
  const [newReminder, setNewReminder] = useState(''); // Lưu nhắc nhở mới nhập vào

  const addReminder = () => {
    if (newReminder.trim()) {
      setReminders([...reminders, newReminder]); // Thêm nhắc nhở mới vào danh sách
      setNewReminder(''); // Xóa input sau khi thêm
    }
  };

  const deleteReminder = (index: number) => {
    const updatedReminders = reminders.filter((_, i) => i !== index); // Xóa nhắc nhở tại chỉ số index
    setReminders(updatedReminders);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders</Text>

      {/* Input cho nhắc nhở mới */}
      <TextInput
        style={styles.input}
        placeholder="Enter new reminder"
        value={newReminder}
        onChangeText={setNewReminder}
      />

      <Button title="Add Reminder" onPress={addReminder} />

      {/* Hiển thị danh sách nhắc nhở */}
      <FlatList
        data={reminders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.reminderItem}>
            <Text style={styles.reminderText}>{item}</Text>
            <Button title="Delete" onPress={() => deleteReminder(index)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  reminderText: { fontSize: 16, flex: 1 },
});
