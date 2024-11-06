import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XMLParser from 'react-xml-parser';



const HeartRateScreen = () => {
  const [heartRateData, setHeartRateData] = useState({
    labels: [],
    datasets: [{
      data: []
    }]
  });
  const [fileName, setFileName] = useState('');
  const [averageHR, setAverageHR] = useState(0);
  const [maxHR, setMaxHR] = useState(0);
  const [minHR, setMinHR] = useState(0);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/xml'
      });

      if (result.type === 'success') {
        setFileName(result.name);
        const fileContent = await FileSystem.readAsStringAsync(result.uri);
        parseXMLData(fileContent);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const parseXMLData = (xmlContent) => {
    try {
      const xml = new XMLParser().parseFromString(xmlContent);
      const records = xml.getElementsByTagName('Record');
      
      const heartRates = records
        .filter(record => record.attributes.type === 'HKQuantityTypeIdentifierHeartRate')
        .map(record => ({
          time: new Date(record.attributes.startDate),
          value: parseFloat(record.attributes.value)
        }))
        .sort((a, b) => a.time - b.time);

      if (heartRates.length > 0) {

        const step = Math.floor(heartRates.length / 6);
        const sampledData = [];
        for (let i = 0; i < heartRates.length; i += step) {
          if (sampledData.length < 6) {
            sampledData.push(heartRates[i]);
          }
        }

        const labels = sampledData.map(hr => 
          hr.time.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
          })
        );
        const values = sampledData.map(hr => hr.value);


        const hrValues = heartRates.map(hr => hr.value);
        const avg = hrValues.reduce((a, b) => a + b, 0) / hrValues.length;
        const max = Math.max(...hrValues);
        const min = Math.min(...hrValues);

        setHeartRateData({
          labels,
          datasets: [{
            data: values
          }]
        });
        setAverageHR(Math.round(avg));
        setMaxHR(Math.round(max));
        setMinHR(Math.round(min));
      }
    } catch (err) {
      console.error('Error parsing XML:', err);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title="XML 파일 업로드" />
        <Card.Content>
          <Button 
            mode="contained" 
            onPress={pickDocument}
            style={styles.uploadButton}
          >
            파일 선택
          </Button>
          {fileName ? (
            <Text style={styles.fileName}>선택된 파일: {fileName}</Text>
          ) : null}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="심박수 그래프" />
        <Card.Content>
          <LineChart
            data={heartRateData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={styles.chart}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="심박수 통계" />
        <Card.Content>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{minHR}</Text>
              <Text style={styles.statLabel}>최저 BPM</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{averageHR}</Text>
              <Text style={styles.statLabel}>평균 BPM</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{maxHR}</Text>
              <Text style={styles.statLabel}>최고 BPM</Text>
            </View>
          </View>
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
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  currentBPM: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
  },
  timestamp: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    color: '#666',
    marginTop: 4,
  },
});

export default HeartRateScreen;