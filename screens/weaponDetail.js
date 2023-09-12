import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { fetchWeapon, getHighestStatsWeapons } from '../utils/api';
import { useEffect, useState } from 'react';
import StatsOutput from '../components/StatsOutput';

import DropDown from 'react-native-dropdown-picker';
import MeterComponent from './../components/MeterComponent';

const WeaponDetail = ({ route }) => {
  const data = route.params.data;
  const [weaponStats, setWeaponStats] = useState();
  const [highestStats, setHighestStats] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [comparedStats, setComparedStats] = useState({});
  const [comparedWeaponData, setComparedWeaponData] = useState({ displayName: 'null', displayIcon: 'null' });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getWeapon = async () => {
      const resultHighStat = await getHighestStatsWeapons();
      const result = await fetchWeapon(data.uuid);
      setHighestStats(resultHighStat.highestStatsWeapons);
      setItems(resultHighStat.weaponsCompare);
      setWeaponStats(result.weaponStats);
      

      const { 
        bodyDamage,
        equipTimeSeconds,
        fireRate,
        headDamage,
        legDamage,
        magazineSize,
        reloadTimeSeconds 
      } = result.weaponStats;
      const selectedWeapon = [
        {
          name: 'Fire Rate',
          label: 'fireRate',
          value: fireRate,
          isHighest: true,
        },
        {
          name: 'Body Damage',
          label: 'bodyDamage',
          value: bodyDamage,
          isHighest: true,
        },
        {
          name: 'Equip Time',
          label: 'equipTimeSeconds',
          value: equipTimeSeconds,
          isHighest: true
        },
        {
          name: 'Head Damage',
          label: 'headDamage',
          value: headDamage,
          isHighest: true
        },
        {
          name: 'Leg Damage',
          label: 'legDamage',
          value: legDamage,
          isHighest: true
        },
        {
          name: 'Magazine Size',
          label: 'magazineSize',
          value: magazineSize,
          isHighest: true
        },
        {
          name: 'Reload Time',
          label: 'reloadTimeSeconds',
          value: reloadTimeSeconds,
          isHighest: true
        },
      ];
      setComparedStats({selectedWeapon: [...selectedWeapon]});
      setIsFetching(false);
    }
    getWeapon();
  }, []);


  useEffect(() => {
    if (value === null) return
    const getWeapon = async () => {
      const result = await fetchWeapon(value);
      const { 
        bodyDamage,
        equipTimeSeconds,
        fireRate,
        headDamage,
        legDamage,
        magazineSize,
        reloadTimeSeconds 
      } = result.weaponStats;
      const comparedWeapon = [
        {
          name: 'Fire Rate',
          label: 'fireRate',
          value: fireRate,
          isHighest: false,
        },
        {
          name: 'Body Damage',
          label: 'bodyDamage',
          value: bodyDamage,
          isHighest: false,
        },
        {
          name: 'Equip Time',
          label: 'equipTimeSeconds',
          value: equipTimeSeconds,
          isHighest: false
        },
        {
          name: 'Head Damage',
          label: 'headDamage',
          value: headDamage,
          isHighest: false
        },
        {
          name: 'Leg Damage',
          label: 'legDamage',
          value: legDamage,
          isHighest: false
        },
        {
          name: 'Magazine Size',
          label: 'magazineSize',
          value: magazineSize,
          isHighest: false
        },
        {
          name: 'Reload Time',
          label: 'reloadTimeSeconds',
          value: reloadTimeSeconds,
          isHighest: false
        },
      ];
      const selectedWeapon = [...comparedStats.selectedWeapon];
      const { displayIcon, displayName } = result;

      comparedWeapon.forEach((item, index) => {
        item.isHighest = item.value >= selectedWeapon[index].value;
        selectedWeapon[index].isHighest = item.value <= selectedWeapon[index].value;
      })

      const newComparedStats = { selectedWeapon, comparedWeapon };

      console.log(newComparedStats);
      setComparedStats(newComparedStats);
      setComparedWeaponData({ displayIcon, displayName });
    }
    getWeapon();
  }, [value])

  /* Dropdown */
  DropDown.setListMode('MODAL');

  if (isFetching) {
    return (
      <View>
        <Text> LOADING </Text>
      </View>
    )
  }

  

  return (
    <ScrollView style={{ marginTop: 80, paddingHorizontal: 20, backgroundColor: '#0F1923', flex: 1 }} nestedScrollEnabled={true}>
        <Text style={styles.nameText}>{ data.displayName.toUpperCase() }</Text>
        <Text style={styles.categoryText}>{ data.category }</Text>
        <Text style={styles.descText}>{ data.longDesc }</Text>
        <Image
          style={[styles.weaponImage]}
          source={{ uri: data.displayIcon}}
        />
        <StatsOutput stats={weaponStats} highestStats={highestStats} />

        <Text style={styles.weaponComparisonText}>WEAPON COMPARISON</Text>
        <DropDown
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={{ fontFamily: 'kanit' }}
          style={{ fontFamily: 'kanit' }}
          textStyle={{ fontFamily: 'kanit' }}
          categorySelectable={true}
          listParentLabelStyle={{ fontFamily: 'kanit-bold' }}
          listChildContainerStyle={{ justifyContent: 'flex-start', margin: 0, padding: 0 }}
          listChildLabelStyle={{ justifyContent: 'flex-start', margin: 0, padding: 0 }}
        />

        {
          comparedStats.comparedWeapon ? (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.weaponComparisonTextTitle}>
                COMPARED WEAPON
              </Text>
              <Image
                style={[styles.weaponImage]}
                source={{ uri: comparedWeaponData.displayIcon}}
              />
              <Text style={styles.weaponComparisonNameText}>{ comparedWeaponData.displayName.toUpperCase() }</Text>
              {
                comparedStats.comparedWeapon.map(item => {
                  return (
                    <MeterComponent
                      key={item.name}
                      title={item.name}
                      value={item.value}
                      minValue={0}
                      maxValue={highestStats[item.label]} 
                      style={item.isHighest === false && styles.opacityReduce}
                    />
                  )
                })
              }
            </View>

          )
          :
          (
            <View style={{ height: 500 }}>
              <Text style={styles.weaponComparisonTextTitle}>
                COMPARED WEAPON
              </Text>
            </View>
          )
        }
        <View style={{ marginTop: 8 }}>
          <Text style={styles.weaponComparisonTextTitle}>
            SELECTED WEAPON
          </Text>
          <Image
            style={[styles.weaponImage]}
            source={{ uri: data.displayIcon}}
          />
          <Text style={styles.weaponComparisonNameText}>{ data.displayName.toUpperCase() }</Text>
          {
            comparedStats.selectedWeapon.map(item => {
              return (
                <MeterComponent
                  key={item.name}
                  title={item.name}
                  value={item.value}
                  minValue={0}
                  maxValue={highestStats[item.label]} 
                  style={item.isHighest === false && styles.opacityReduce}
                />
              )
            })
          }
        </View>
    </ScrollView>
  );
}

export default WeaponDetail;

const styles = StyleSheet.create({
  nameText: {
    color: 'white',
    fontFamily: 'kanit-bold',
    fontSize: 35,
    marginTop: 20
  },
  categoryText: {
    color: 'white',
    fontFamily: 'kanit',
    fontSize: 19
  },
  descText: {
    color: 'white',
    fontFamily: 'kanit-exlight',
    fontSize: 13,
    marginTop: 6,
  },
  weaponImage: {
    width: 300,
    height: 120,
    marginTop: 35,
    resizeMode: 'contain',
    alignSelf: 'center'
  },

  weaponComparisonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'kanit-bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 250
  },

  weaponComparisonTextTitle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'kanit-bold',
    textAlign: 'center',
    marginBottom: 0,
    marginTop: 30
  },

  weaponComparisonNameText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'kanit-bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30
  },

  opacityReduce: {
    opacity: 0.2
  }
});