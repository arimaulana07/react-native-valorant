import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { fetchAgents, getListDeploy } from '../utils/api';
import  { FadeInDown, FadeOut } from 'react-native-reanimated';
import { RandomReveal } from 'react-random-reveal';

import Animated from 'react-native-reanimated';
import AbilitiesOutput from '../components/AbilitiesOutput';
import AgentsOutput from '../components/AgentsOutput';

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState({});
  const [abilities, setAbilities] = useState([]);
  const [selectedAbility, setSelectedAbility] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [uniqueKey, setUniqueKey] = useState(Math.random());
  const [uniqueKeyAbility, setUniqueKeyAbility] = useState(Math.random());
  const [abilityTitleKey, setAbilityTitleKey] = useState(Math.random());
  const [nameKey, setNameKey] = useState(Math.random());
  const [roleKey, setRoleKey] = useState(Math.random());

  const characterSet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

  /* Fetching Agents */
  useEffect(() => {
    const getAgents = async () => {
      const result = await fetchAgents();
      setAgents(result.data);
      setSelectedAgent(result.data[0]);
      setAbilities(result.data[0].abilities);
      setIsFetching(false);
    }
    getAgents();
  }, [])
  
  /* Select Agent */
  const selectAgent = (uuid) => {
    setSelectedAgent(agents.find(item => item.uuid === uuid));
    setAbilities(agents.find(item => item.uuid === uuid).abilities);
    setUniqueKeyAbility(Math.random());
    setUniqueKey(Math.random());
    setNameKey(Math.random());
    setRoleKey(Math.random());
    setAbilityTitleKey(Math.random());
  }

  /* Select Abilities */
  const selectAbilities = (slot) => {
    const newAbilities = [...abilities];
    setUniqueKeyAbility(Math.random());
    newAbilities.forEach((item) => {
      if (item.slot === slot) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }
    })
    setAbilities(newAbilities);
    setAbilityTitleKey(Math.random());
  }


  if (isFetching) {
    return (
      <View>
        <Text> LOADING </Text>
      </View>
    )
  }

  return (
    <View>
        <ScrollView style={styles.container}>
        <View>
            {/* Info & Biography */}
            <Text key={nameKey} style={styles.nameText}>
              <RandomReveal
                isPlaying
                duration={0.3}
                updateInterval={0.045}
                characterSet={characterSet}
                characters={ selectedAgent.displayName.toUpperCase() }
              />
            </Text>
            <Text style={styles.roleTitle}>ROLE</Text>
            <View style={styles.roleContainer}>
                <Image style={styles.roleIc} source={{ uri: selectedAgent?.role?.displayIcon }} />
                <Text key={roleKey} style={styles.roleType}>
                  <RandomReveal
                    isPlaying
                    duration={0.3}
                    updateInterval={0.045}
                    characterSet={characterSet}
                    characters={ selectedAgent?.role?.displayName.toUpperCase() }
                  />
                </Text>
            </View>
            <Text style={styles.biographyTitle}>BIOGRAPHY</Text>
            <Animated.Text key={uniqueKey} entering={FadeInDown} exiting={FadeOut}>
              <Text style={styles.biographyText}>
                { selectedAgent?.description }
              </Text>
            </Animated.Text>
            
            {/* Full Portrait Image */}
            <Image style={styles.agentFullBodyPict} source={{ uri: selectedAgent?.fullPortrait }} />

            {/* Abilities */}
            <Text style={styles.abilitiesTitle}>ABILITIES</Text>
            <View style={styles.abilitiesThumbContainer}>
                <AbilitiesOutput onPress={selectAbilities} abilities={abilities} />
            </View>
            <Text key={abilityTitleKey} style={styles.abilitiesName}>
              <RandomReveal
                isPlaying
                duration={0.3}
                revealDuration={2}
                updateInterval={0.045}
                characterSet={characterSet}
                characters={ abilities?.find(item => { return item.isSelected === true })?.displayName.toUpperCase() }
              />
            </Text>
            <Animated.View key={uniqueKeyAbility} entering={FadeInDown} exiting={FadeOut}>
              <Text style={styles.abilitiesDesc}>
                { abilities?.find(item => { return item.isSelected === true })?.description }
              </Text>
            </Animated.View>
        </View>
        </ScrollView>

        {/* Agent Selector */}
          <AgentsOutput
            agents={agents}
            onPress={selectAgent}
            selectedUuid={selectedAgent.uuid}
          />
       
    </View>
  );
}

export default Agents;

const styles = StyleSheet.create({
  rootContainer: {
    paddingTop: 30
  },
  container: {
    backgroundColor: '#0F1923',
    paddingTop: 25,
    paddingHorizontal: 25
  },
  nameText: {
    fontSize: 28,
    color: 'white',
    fontFamily: 'kanit-bold',
    letterSpacing: 1.2
  },

  /* Info */
  roleTitle: {
    marginTop: 15,
    fontSize: 18,
    color: 'white',
    fontFamily: 'kanit',
    letterSpacing: 1.2
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  roleType: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'kanit-bold',
    letterSpacing: 0.5
  },
  roleIc: {
    width: 26,
    height: 26,
    marginRight: 8
  },

  /* Bio */
  biographyTitle: {
    marginTop: 35,
    fontSize: 18,
    color: 'white',
    fontFamily: 'kanit-bold',
    letterSpacing: 0.8
  },
  biographyText: {
    fontSize: 13,
    color: 'white',
    lineHeight: 17,
    marginTop: 8,
    fontFamily: 'kanit-exlight',
  },

  /* Portrait Picture */
  agentFullBodyPict: {
    width: 380,
    height: 380,
    alignSelf: 'center'
  },

  /* Abilities */
  abilitiesTitle: {
    fontSize: 28,
    color: 'white',
    marginTop: 25,
    textAlign: 'center',
    fontFamily: 'kanit-bold',
    letterSpacing: 1.2
  },
  abilitiesThumbContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
  abilitiesName: {
    fontSize: 24,
    color: 'white',
    marginTop: 15,
    fontFamily: 'kanit-bold',
    letterSpacing: 1.2
  },
  abilitiesDesc: {
    fontSize: 13,
    color: 'white',
    lineHeight: 17,
    marginTop: 8,
    paddingBottom: 290,
    fontFamily: 'kanit-exlight',
    letterSpacing: 1.2
  },

  /* Agent Select */
  agentSelectContainer: {
    width:'100%',
    height: 100,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 14
  },
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
});