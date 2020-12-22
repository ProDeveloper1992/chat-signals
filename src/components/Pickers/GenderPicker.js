import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { GenderItem } from '../Radios';

export default function GenderPicker({ type, onSelectGenderItem }) {

  const { genderList, selectedUserGender, selectedLookingGender } = useSelector((state) => state.userState);

  const onGenderItemPress = (item) => {
    onSelectGenderItem(item);
  };

  const isSelected = (genderItem) => {
    if (type === 'user') {
      if (selectedUserGender.gender_id === genderItem.gender_id) {
        return true;
      } else {
        return false;
      }
    } else if (type === 'opponent') {
      if (selectedLookingGender.gender_id === genderItem.gender_id) {
        return true;
      } else {
        return false;
      }
    }
  }

  return (
    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
      {genderList.map((item, index) => (
        <View style={{ flex: 1 }} key={String(index)}>
          <GenderItem
            isSelected={isSelected(item)}
            imageUrl={item.gender_icon}
            onPress={() => onGenderItemPress(item)}
          />
        </View>
      ))}
    </View>
  );
}
