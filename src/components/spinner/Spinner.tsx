import React from 'react';
import {ActivityIndicator, StyleSheet, View, SafeAreaView} from 'react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const Loading = ({isLoading}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Other components or content can go here */}
      {isLoading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Your page background color
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for dim effect
    justifyContent: 'center', // Centers the spinner vertically
    marginTop: responsiveHeight(40),
    alignItems: 'center', // Centers the spinner horizontally
    zIndex: 1000,
  },
});
