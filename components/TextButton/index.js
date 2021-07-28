import React from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import { FONTS, COLORS } from '../../constants';

const TextButton = ({
  icon,
  label,
  labelStyle,
  buttonContainerStyle,
  iconStyles,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        ...buttonContainerStyle,
      }}
    >
      <Text style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle }}>
        {label}
      </Text>
      {icon && (
        <Image
          source={icon}
          style={{
            width: 20,
            height: 20,
            marginLeft: 5,
            ...iconStyles,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default TextButton;
