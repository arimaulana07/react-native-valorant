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
  abilitiesThumbIc: {
    width: 60,
    height: 60,
    borderWidth: 1,
    marginTop: 15,
    borderColor: 'white',
  },
  abilitiesThumbIcActive: {
    backgroundColor: '#FF445A'
  },
})