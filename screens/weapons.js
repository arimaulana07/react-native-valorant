import { View, Text, StyleSheet, Image, Button, Animated, Dimensions, Pressable, ScrollView } from 'react-native';
import { fetchWeapons } from '../utils/api';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const Weapons = () => {
  const [weapons, setWeapons] = useState([]);
  const [weaponCategory, setWeaponsCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [position] = useState(new Animated.ValueXY({ x: -Dimensions.get('window').width, y: 0 }));
  const [currentIndexShow, setCurrentIndexShow] = useState(null);
  const [positions, setPositions] = useState([]);

  const navigation = useNavigation();

  const seeWeaponDetail = (data) => {
    navigation.navigate('WeaponDetail', { data });
  }

  const animatePosition = () => {
    if (!show) {
      Animated.timing(position, {
        toValue: { x: 0, y: 0 },
        duration: 200,
        useNativeDriver: false
      }).start();
      setShow(true);
    } else {
      Animated.timing(position, {
        toValue: { x: -Dimensions.get('window').width, y: 0 },
        duration: 200,
        useNativeDriver: false
      }).start();
      setShow(false);
    }
  }

  const animatePositions = (index) => {
    if (positions[index].isShow === false) {
      const newPositions = [...positions];
      newPositions[index].isShow = true;
      if (currentIndexShow !== null && currentIndexShow !== index) {
        newPositions[currentIndexShow].isShow = false;
        Animated.timing(positions[currentIndexShow].position, {
          toValue: { x: -Dimensions.get('window').width, y: 0 },
          duration: 280,
          useNativeDriver: false
        }).start();
      };
      Animated.timing(positions[index].position, {
        toValue: { x: 0, y: 0 },
        duration: 280,
        useNativeDriver: false
      }).start();
      setPositions(newPositions);
      setCurrentIndexShow(index);
    } else {
      Animated.timing(positions[index].position, {
        toValue: { x: -Dimensions.get('window').width, y: 0 },
        duration: 280,
        useNativeDriver: false
      }).start();
      const newPositions = [...positions];
      newPositions[index].isShow = false;
      setPositions(newPositions)
    }
  }

  useEffect(() => {
    const getAgents = async () => {
      const result = await fetchWeapons();
      setWeapons(result);

      const positions = [];
      result.forEach(item => {
        positions.push({
         position: new Animated.ValueXY({ x: -Dimensions.get('window').width, y: 0 }),
         isShow: false
        });
      });
      setPositions(positions);

      const category = [...new Set(result.map((weapon) => weapon.category))];
      setWeaponsCategory(category);
    }
    getAgents();
  }, []);

  

  return (
    <ScrollView style={styles.rootContainer}>
      {
        weaponCategory.map(item => {
          return (
            <View key={item} style={{ paddingTop: 20 }}>
              <Text style={styles.weaponCategory}>
                { item.toUpperCase() }
              </Text>
              <View style={styles.weaponsContainer}>
              {
                weapons.map((itemWeapon, index) => {
                  if (itemWeapon.category == item) {
                    return(
                      <Pressable key={itemWeapon.uuid} onPress={() => animatePositions(index)}>
                        <Animated.View
                          style={[
                            styles.modalShow,
                            positions[index].position.getLayout(),
                            itemWeapon.category === 'Melee' && {justifyContent: 'flex-start'}
                          ]}
                        >
                          <Text style={styles.textModalTitle}> { itemWeapon.displayName.toUpperCase() } </Text>
                          <Text style={styles.textModalDescription}>
                            { itemWeapon.longDesc }
                          </Text>
                          { itemWeapon.category !== 'Melee' ?
                            (
                              <Pressable onPress={() => seeWeaponDetail(itemWeapon)}>
                                <View style={styles.btnModal}>
                                  <Text style={styles.btnText}>
                                    SEE DETAILS
                                  </Text>
                                </View>
                              </Pressable>
                            ) : ''
                          }
                        </Animated.View>
                        <View  style={styles.weaponItem}>
                          <Text style={styles.weaponName}>
                            { itemWeapon.displayName.toUpperCase() }
                          </Text>
                          <Image
                            style={[styles.weaponImage, itemWeapon.category == 'Pistols' && styles.weaponImagePistol]}
                            source={{ uri: itemWeapon.displayIcon}}
                          />
                          <Text style={styles.weaponDescShort}>
                            { itemWeapon.shortDesc }
                          </Text>
                        </View>
                      </Pressable>
                    )
                  }
                })
              }
              </View>
            </View>
          )
        })
      }

     

    </ScrollView>
  );
}

export default Weapons;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#ECE8E2',
  },
  weaponCategory: {
    fontFamily: 'kanit-bold',
    fontSize: 28,
    paddingLeft: 25
  },
  weaponsContainer: {
    marginTop: 20,
  },
  weaponItem: {
    width: '100%',
    height: 340,
    borderWidth: 1,
    borderColor: '#4b4b4b2f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  },
  weaponImage: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain'
  },
  weaponImagePistol: {
    width: '65%',
    height: '65%',
    resizeMode: 'contain'
  },
  weaponDescShort: {
    fontFamily: 'kanit-exlight',
    fontSize: 16,
    color: 'grey',
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: '95%'
  },
  weaponName: {
    fontFamily: 'kanit-bold',
    fontSize: 23,
    paddingLeft: 25,
    position: 'absolute',
    top: 20,
    left: 0
  },

  modalShow: {
    height: '100%',
    backgroundColor:'#FF445A',
    position: 'absolute',
    width: '100%',
    zIndex: 99,
    padding: 20,
    justifyContent: "space-between",
  },
  textModalTitle: {
    color: 'white',
    fontFamily: 'kanit-bold',
    fontSize: 45
  },
  textModalDescription: {
    color: 'white',
    fontFamily: 'kanit-exlight',
    text: 23,
    width: '80%'
  },
  btnModal: {
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: 'white',
    fontSize: 19,
    fontFamily: 'kanit-bold'
  }
});