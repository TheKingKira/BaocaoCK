import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function GoalsScreen() {
  const [goals, setGoals] = useState<{ title: string, date: string, completed: boolean }[]>([]); // Danh sách mục tiêu
  const [newGoal, setNewGoal] = useState(''); // Mục tiêu mới

  // Trạng thái cho ngày tháng năm
  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2024');

  const [dateInput, setDateInput] = useState('');

  // Hàm thay đổi ngày
  const updateDateInput = () => {
    const formattedDate = `${selectedDay}-${selectedMonth}-${selectedYear}`;
    setDateInput(formattedDate);
  };

  // Hàm thêm mục tiêu
  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, { title: newGoal, date: dateInput, completed: false }]);
      setNewGoal('');
      setDateInput('');
    }
  };

  // Hàm xử lý khi mục tiêu hoàn thành
  const markAsCompleted = (index: number) => {
    const updatedGoals = [...goals];
    updatedGoals[index].completed = true;
    setGoals(updatedGoals);
  };

  // Hàm xử lý xóa mục tiêu
  const deleteGoal = (index: number) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  // Hàm kiểm tra ngày quá hạn
  const isOverdue = (goalDate: string) => {
    const goalDateParts = goalDate.split('-');  // Format: "DD-MM-YYYY"
    
    // Chuyển thành đối tượng Date theo định dạng chuẩn (YYYY-MM-DD)
    const goalDateObj = new Date(`${goalDateParts[2]}-${goalDateParts[1]}-${goalDateParts[0]}`);

    // Lấy ngày hiện tại
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Đặt giờ hiện tại về 00:00 để so sánh chỉ ngày

    // So sánh ngày mục tiêu với ngày hiện tại
    return goalDateObj < currentDate;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Goals</Text>

      {/* Input cho mục tiêu mới */}
      <TextInput
        style={styles.input}
        placeholder="Enter new goal"
        value={newGoal}
        onChangeText={setNewGoal}
      />

      {/* Chọn ngày tháng năm */}
      <Text style={styles.subtitle}>Chọn ngày tháng năm</Text>
      <View style={styles.dateTimeContainer}>
        <Picker
          selectedValue={selectedDay}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedDay(itemValue)}
        >
          {[...Array(31).keys()].map(i => (
            <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedMonth}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMonth(itemValue)}
        >
          {[...Array(12).keys()].map(i => (
            <Picker.Item key={i} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedYear}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedYear(itemValue)}
        >
          {[...Array(81).keys()].map(i => (
            <Picker.Item key={i} label={`${2024 + i}`} value={`${2024 + i}`} />
          ))}
        </Picker>
      </View>

      <Button title="Cập nhật ngày" onPress={updateDateInput} />
      <Button title="Thêm mục tiêu" onPress={addGoal} />

      {/* Hiển thị danh sách mục tiêu */}
      <FlatList
        data={goals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalText}>{item.title}</Text>
            <Text style={styles.dateText}>Ngày: {item.date}</Text>

            {/* Kiểm tra xem mục tiêu đã quá hạn chưa */}
            {isOverdue(item.date) ? (
              <Text style={styles.overdueText}>Quá hạn</Text>
            ) : item.completed ? (
              <Text style={styles.completedText}>Hoàn thành</Text>
            ) : (
              <View style={styles.actionButtons}>
                <Button title="Complete" onPress={() => markAsCompleted(index)} />
                <Button title="Xóa" onPress={() => deleteGoal(index)} />
              </View>
            )}
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
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  dateTimeContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  picker: { height: 50, width: '30%' },
  goalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  goalText: { fontSize: 16, fontWeight: 'bold' },
  dateText: { fontSize: 14, color: 'gray' },
  overdueText: { fontSize: 14, color: 'red', fontWeight: 'bold' },
  completedText: { fontSize: 14, color: 'green', fontWeight: 'bold' },
  actionButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }
});
