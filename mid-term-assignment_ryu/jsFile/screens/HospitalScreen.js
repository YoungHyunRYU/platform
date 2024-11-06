import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

const HospitalScreen = () => {
  const HIRA_URL = 'https://www.hira.or.kr/ra/hosp/getHealthMap.do';


  const handleLoadProgress = ({ nativeEvent }) => {
    if (nativeEvent.loading) {

      console.log('Loading...');
    }
  };


  const handleError = ({ nativeEvent }) => {
    console.warn('WebView error: ', nativeEvent);
  };

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: HIRA_URL }}
        style={styles.webview}
        onLoadProgress={handleLoadProgress}
        onError={handleError}

        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}

        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default HospitalScreen;