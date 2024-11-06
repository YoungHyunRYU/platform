import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';

const ECGScreen = () => {
  const ecgData = {
    labels: ['', '', '', '', '', ''],
    datasets: [{
      data: [1.2, 0.8, 1.5, 0.3, 1.8, 0.5]
    }]
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.prod.website-files.com/60b553829ae790f1371bfcf1/66b915d6539fa709d5c236c3_6141071c85e66dc4460a79b4_p-wave_loop_low_quality.gif' }}
        style={styles.gifImage}
        resizeMode="contain"
      />
      <Card style={styles.card}>
        <Card.Title title="실시간 심전도" />
        <Card.Content>
          <LineChart
            data={ecgData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  gifImage: {
    width: Dimensions.get('window').width - 32, // 패딩값을 고려하여 조정
    height: 200,
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  }
});

export default ECGScreen;