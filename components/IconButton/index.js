import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const IconButton = ({ onPress, containerStyle, icon, iconStyle }) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image source={icon} style={{ width: 30, height: 30, ...iconStyle }} />
    </TouchableOpacity>
  );
};

export default IconButton;
