import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory'; // Import từ 'victory'

interface ProgressChartProps {
  data: { x: string; y: number }[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productivity Chart</Text>
      <VictoryPie
        data={data}
        colorScale={['#4CAF50', '#FF5722', '#2196F3']}
        innerRadius={50}
        labels={({ datum }) => `${datum.x}: ${datum.y}%`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', margin: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});

export default ProgressChart;
