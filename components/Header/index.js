import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FONTS } from '../../constants';

const Header = ({ containerStyle, title, leftComponent, rightComponent }) => {
  return (
    <View style={{ flexDirection: 'row', ...containerStyle }}>
      {leftComponent}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...FONTS.h3 }}>{title}</Text>
      </View>
      {rightComponent}
    </View>
  );
};

export default Header;
