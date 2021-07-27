import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FONTS, COLORS, SIZES, icons } from '../../constants';

const HorizontalFoodCard = ({
  containerStyle,
  imageStyle,
  name,
  image,
  onPress,
  description,
  price,
  calories,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}
    >
      <Image source={image} style={imageStyle} />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 17, ...FONTS.h3 }}>{name}</Text>
        <Text style={{ color: COLORS.darkGray2, ...FONTS.body4 }}>
          {description}
        </Text>
        <Text style={{ marginTop: SIZES.base, ...FONTS.h3 }}>${price}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          flexDirection: 'row',
          top: 5,
          right: SIZES.radius,
        }}
      >
        <Image source={icons.calories} style={{ width: 30, height: 30 }} />
        <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>
          {calories} Calories
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalFoodCard;
