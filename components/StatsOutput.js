import { StyleSheet, View, Text } from 'react-native';
import MeterComponent from './MeterComponent';

const StatsOutput = ({ stats, highestStats }) => {
  return (
    <View style={styles.root}>
        <Text style={styles.title}> STATS </Text>
        <MeterComponent
          title="Fire Rate"
          value={stats.fireRate}
          maxValue={highestStats.fireRate}
          minValue={0}
        />
        <MeterComponent
          title="Equip Time"
          value={stats.equipTimeSeconds}
          maxValue={highestStats.equipTimeSeconds}
          minValue={0}
        />
        <MeterComponent
          title="Reload Time"
          value={stats.reloadTimeSeconds}
          maxValue={highestStats.reloadTimeSeconds}
          minValue={0}
        />
        <MeterComponent
          title="Magazine"
          value={stats.magazineSize}
          maxValue={highestStats.magazineSize}
          minValue={0}
        />
        <MeterComponent
          title="Head Damage"
          value={stats.headDamage}
          maxValue={highestStats.headDamage}
          minValue={0}
        />
        <MeterComponent
          title="Body Damage"
          value={stats.bodyDamage}
          maxValue={highestStats.bodyDamage}
          minValue={0}
        />
        <MeterComponent
          title="Leg Damage"
          value={stats.legDamage}
          maxValue={highestStats.legDamage}
          minValue={0}
        />
    </View>
  );
}

export default StatsOutput;

const styles = StyleSheet.create({
  root: {
    marginTop: 20
  },
  title: {
    fontSize: 24,
    fontFamily: 'kanit-bold',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 20
  }
});
