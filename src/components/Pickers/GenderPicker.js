import React, { Component, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { GenderItem } from '../Radios';

export default function GenderPicker({ type, onSelectGenderItem }) {

  const { selectedUserGender, selectedLookingGender } = useSelector((state) => state.userState);
  const { appLabels, passionList, genderList } = useSelector((state) => state.appState);


  const onGenderItemPress = (item) => {
    onSelectGenderItem(item);
  };

  const isSelected = (genderItem) => {
    if (selectedUserGender.id === genderItem.id) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingVertical: 5 }}>
      {genderList.map((item, index) => (
        <View style={{ marginEnd: 10 }} key={String(index)}>
          <GenderItem
            isSelected={isSelected(item)}
            onPress={() => onGenderItemPress(item)}
            gender={item.name}
          />
        </View>
      ))}
    </View>
  );
}
