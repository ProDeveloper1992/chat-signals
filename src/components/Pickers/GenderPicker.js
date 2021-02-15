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
    if (selectedUserGender.gender_id === genderItem.gender_id) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
      {genderList.map((item, index) => (
        <View style={{ flex: 1, marginHorizontal: index === 1 ? 10 : 0 }} key={String(index)}>
          <GenderItem
            isSelected={isSelected(item)}
            imageUrl={item.gender_icon}
            onPress={() => onGenderItemPress(item)}
            gender={item.gender}
          />
        </View>
      ))}
    </View>
  );
}
