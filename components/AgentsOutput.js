import { Image, StyleSheet, Pressable, ScrollView } from "react-native";

const AgentsOutput = ({ agents, onPress, selectedUuid }) => {
  return (
    <ScrollView contentContainerStyle={styles.contentContainer} horizontal={true} style={styles.agentSelectContainer}>
    {
      agents.map(data => {
        return (
          <Pressable key={data.uuid} onPress={() => onPress(data.uuid)}>
            <Image
              style={[styles.agentThumbnailPict, data.uuid === selectedUuid && styles.agentThumbnailPictActive ]}
              source={{ uri: data.displayIcon }}
          />
        </Pressable>
        )
      })
    }
    </ScrollView>
  );
}

export default AgentsOutput;

const styles = StyleSheet.create({
  agentThumbnailPict: {
    width: 70,
    height: 70,
    marginRight: 25,
    alignSelf: 'center'
  },
  agentThumbnailPictActive: {
    borderWidth: 1,
    borderColor: '#FF445A'
  },
  agentSelectContainer: {
    width:'100%',
    height: 100,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 14,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})