import { Image, StyleSheet, Pressable } from "react-native";

const AbilitiesOutput = ({ abilities, onPress }) => {
  return (
    abilities.map(data => {
      return (
        <Pressable key={data.slot} onPress={() => onPress(data.slot)}>
          <Image
            style={[styles.abilitiesThumbIc, data.isSelected && styles.abilitiesThumbIcActive ]}
            source={{ uri: data.displayIcon }}
          />
        </Pressable>
      )
    })
  );
}

export default AbilitiesOutput;

const styles = StyleSheet.create({
  weaponCategory: {
    fontFamily: 'kanit-bold',
    fontSize: 24,
    paddingLeft: 25
  },
  weaponsContainer: {
    marginTop: 20
  },
  weaponItem: {
    width: '100%',
    height: 340,
    borderWidth: 1,
    borderColor: '#4b4b4b2f',
    alignItems: 'center',
    justifyContent: 'center'
  },
  weaponImage: {
    width: '90%',
    resizeMode: 'contain'
  },
  weaponDescShort: {
    fontFamily: 'kanit',
    fontSize: 16,
    color: 'grey',
    alignSelf: 'flex-start',
    position: 'absolute',
    bottom: 20,
    left: 20
  },
  weaponName: {
    fontFamily: 'kanit-bold',
    fontSize: 23,
    paddingLeft: 25,
    position: 'absolute',
    top: 20,
    left: 0
  }
})