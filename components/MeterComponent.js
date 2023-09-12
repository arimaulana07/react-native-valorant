import { View, Text, StyleSheet } from 'react-native';

const MeterComponent = ({ title, value, minValue, maxValue, style }) => {
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
            { title }
        </Text>
        <Text style={styles.statsText}> 
            (<Text style={styles.boldText}> { value } </Text> / {maxValue})
        </Text>
      </View>
      <View style={[styles.meterContainer, style]}>
        <View style={[styles.meterFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

export default MeterComponent;

const styles = StyleSheet.create({
  container: {
    marginBottom: 28
  },
  titleWrapper: {
    flexDirection: 'row'
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'kanit',
    marginBottom: 4
  },
  statsText: {
    color: 'white',
    fontFamily: 'kanit',
    marginLeft: 10
  },
  boldText: {
    fontFamily: 'kanit-bold'
  },
  meterContainer: {
    height: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
    merginBottom: 15
  },
  meterFill: {
    height: '100%',
    backgroundColor: '#FF445A'
  },
  meterValue: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white', // Change this color to match your design
  },
});