import axios from "axios";
import weaponDescriptions from "../data/additional-data";

const baseURL = 'https://valorant-api.com/v1';

export const fetchAgents = async () => {
  const result = await axios.get(baseURL + '/agents?isPlayableCharacter=true');
  result.data.data.forEach((item, index) => {
    if (index === 0) {
      item.isSelected = true;
    } else {
      item.isSelected = false
    }
    
    item.abilities.forEach((itemAbi, index) => {
      if (index === 0) {
        itemAbi.isSelected = true;
      } else {
        itemAbi.isSelected = false;
      };
    })
  });
  return result.data;
}

export const fetchWeapons = async () => {
  const result = await axios.get(baseURL + '/weapons');
  const weapons = result.data.data.map((weapon) => ({
    uuid: weapon.uuid,
    displayName: weapon.displayName,
    displayIcon: weapon.displayIcon,
    category: weapon.shopData === null ? 'Melee' :
    weapon.shopData.category,
  }));

  const merged = [];
  for (let i=0; i<weapons.length; i++) {
    merged.push({
      ...weapons[i],
      ...(weaponDescriptions
          .find((item)=>item.uuid === weapons[i].uuid)),
    });
  }
  merged.forEach((item, index) => {
    item.isShow = false;
  });
  return merged;
}

export const fetchWeapon = async (uuid) => {
  const result = await axios.get(baseURL + '/weapons/' + uuid);
  const weapon = {
    displayName: result.data.data.displayName,
    displayIcon: result.data.data.displayIcon,
    weaponStats: {
      fireRate: result.data.data.weaponStats.fireRate,
      equipTimeSeconds: result.data.data.weaponStats.equipTimeSeconds,
      reloadTimeSeconds: result.data.data.weaponStats.reloadTimeSeconds,
      magazineSize: result.data.data.weaponStats.magazineSize,
      headDamage: result.data.data.weaponStats.damageRanges[0].headDamage,
      bodyDamage: result.data.data.weaponStats.damageRanges[0].bodyDamage,
      legDamage: result.data.data.weaponStats.damageRanges[0].legDamage,
    },
  }
  return weapon;
}

export const getHighestStatsWeapons = async () => {
  const result = await axios.get(baseURL + '/weapons/');
  const highestStatsWeapons = result.data.data
    .filter((item)=>item.weaponStats !== null)
    .map((item)=>({
      fireRate: item.weaponStats.fireRate,
      equipTimeSeconds: item.weaponStats.equipTimeSeconds,
      reloadTimeSeconds: item.weaponStats.reloadTimeSeconds,
      magazineSize: item.weaponStats.magazineSize,
      headDamage: item.weaponStats.damageRanges[0].headDamage,
      bodyDamage: item.weaponStats.damageRanges[0].bodyDamage,
      legDamage: item.weaponStats.damageRanges[0].legDamage,
    }))
    .reduce((totalValue, currValue)=>{
      return {
        fireRate: totalValue.fireRate >= currValue.fireRate ? totalValue.fireRate : currValue.fireRate,
        equipTimeSeconds: totalValue.equipTimeSeconds >= currValue.equipTimeSeconds ? totalValue.equipTimeSeconds : currValue.equipTimeSeconds,
        reloadTimeSeconds: totalValue.reloadTimeSeconds >= currValue.reloadTimeSeconds ? totalValue.reloadTimeSeconds : currValue.reloadTimeSeconds,
        magazineSize: totalValue.magazineSize >= currValue.magazineSize ? totalValue.magazineSize : currValue.magazineSize,
        headDamage: totalValue.headDamage >= currValue.headDamage ? totalValue.headDamage : currValue.headDamage,
        bodyDamage: totalValue.bodyDamage >= currValue.bodyDamage ? totalValue.bodyDamage : currValue.bodyDamage,
        legDamage: totalValue.legDamage >= currValue.legDamage ? totalValue.legDamage : currValue.legDamage,
      };
    });
  
  let weaponsCompare = result.data.data
    .filter((item)=>item.displayName !== 'Melee')
    .map((weapon)=>({
      label: weapon.displayName,
      value: weapon.uuid,
      parent: weapon.shopData.category,
      
    }));

  const category = [...new Set(weaponsCompare.map(obj => obj.parent))]
    .map((category, index) => ({ label: category, value: category, disabled: true }));

  
  weaponsCompare = [...category, ...weaponsCompare];
  return { highestStatsWeapons, weaponsCompare };


}