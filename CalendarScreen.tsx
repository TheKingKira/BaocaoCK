import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CalendarScreen() {
  const [events, setEvents] = useState<{ title: string, date: string, time: string }[]>([]);
  const [newEvent, setNewEvent] = useState('');

  const [selectedDay, setSelectedDay] = useState('1');
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2024');

  const [selectedHour, setSelectedHour] = useState('00');
  const [selectedMinute, setSelectedMinute] = useState('00');

  const [dateInput, setDateInput] = useState('');
  const [timeInput, setTimeInput] = useState('');

  // Hàm thay đổi ngày
  const updateDateInput = () => {
    const formattedDate = `${selectedDay}-${selectedMonth}-${selectedYear}`;
    setDateInput(formattedDate);
  };

  // Hàm thay đổi giờ
  const updateTimeInput = () => {
    const formattedTime = `${selectedHour}:${selectedMinute}`;
    setTimeInput(formattedTime);
  };

  // Hàm thêm sự kiện
  const addEvent = () => {
    if (newEvent.trim()) {
      setEvents([...events, { title: newEvent, date: dateInput, time: timeInput }]); // Thêm sự kiện với ngày và thời gian
      setNewEvent('');
      setDateInput('');
      setTimeInput('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch</Text>
      
      <FlatList
        data={events}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.event}>{item.title} - {item.date} at {item.time}</Text>
        )}
      />
      <Text style={styles.subtitle}>Tên Sự Kiện</Text>
      <TextInput
        style={styles.input}
        placeholder="Thêm sự kiện mới"
        value={newEvent}
        onChangeText={setNewEvent}
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

      {/* Chọn thời gian */}
      <Text style={styles.subtitle}>Chọn thời gian</Text>
      <View style={styles.dateTimeContainer}>
        <Picker
          selectedValue={selectedHour}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedHour(itemValue)}
        >
          {[...Array(24).keys()].map(i => (
            <Picker.Item key={i} label={i < 10 ? `0${i}` : `${i}`} value={i < 10 ? `0${i}` : `${i}`} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedMinute}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedMinute(itemValue)}
        >
          {[...Array(60).keys()].map(i => (
            <Picker.Item key={i} label={i < 10 ? `0${i}` : `${i}`} value={i < 10 ? `0${i}` : `${i}`} />
          ))}
        </Picker>
      </View>

      <Button title="Cập nhật ngày và giờ" onPress={() => { updateDateInput(); updateTimeInput(); }} />
      <Button title="Thêm sự kiện" onPress={addEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  event: { fontSize: 16, padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  dateTimeContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 20 
  },
  picker: { height: 50, width: '30%' },
});
