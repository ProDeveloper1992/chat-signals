import React, { useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../../constants';
import { AppText } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { changeAppLanguage } from '../../redux/actions/app-actions';

export function LaguageItem({
  country,
  isSelected,
  imageUrl,
  countryName,
  size,
  style,
  onChangeCountry,
}) {
  const dispatch = useDispatch();

  const { selectedLanguage } = useSelector((state) => state.appState);

  const [loading, setLoading] = useState(false);

  const onPress = async () => {
    if (selectedLanguage != country.key) {
      setLoading(true);
      await dispatch(changeAppLanguage(country.key));
      setLoading(false);
      onChangeCountry();
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        style,
        {
          backgroundColor: isSelected ? Colors.ui_primary : Colors.white,
          borderColor: isSelected ? Colors.white : Colors.greydark,
        },
      ]}
      onPress={onPress}>
      <Image
        source={{ uri: imageUrl }}
        style={{
          width: size,
          height: size,
          resizeMode: 'cover',
          borderRadius: size / 2,
        }}
      />
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={isSelected ? Colors.white : Colors.black}
          style={{ width: 20, height: 20, marginTop: 13 }}
        />
      ) : (
        <AppText
          type={'bold'}
          size={16}
          color={isSelected ? Colors.white : Colors.black}
          style={styles.title}>
          {countryName}
        </AppText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    marginTop: 5,
    textTransform: 'uppercase',
  },
});

LaguageItem.propTypes = {
  imageUrl: PropTypes.string,
  countryName: PropTypes.string,
  size: PropTypes.any,
  onChangeCountry: PropTypes.func,
};

LaguageItem.defaultProps = {
  imageUrl: 'https://cdn.countryflags.com/thumbs/india/flag-400.png',
  countryName: 'IN',
  size: 24,

  onChangeCountry: () => { },
};
