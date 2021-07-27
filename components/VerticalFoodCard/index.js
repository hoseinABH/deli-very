import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FONTS, COLORS, SIZES, icons } from '../../constants';

const VerticalFoodCard = ({
  containerStyle,
  name,
  image,
  onPress,
  description,
  price,
  calories,
  isFavourite,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 200,
        padding: SIZES.radius,
        alignItems: 'center',
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icons.calories} style={{ width: 30, height: 30 }} />
          <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>
            {calories} Calories
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={icons.love}
            style={{
              width: 25,
              height: 25,
              tintColor: isFavourite ? COLORS.primary : COLORS.gray,
            }}
          />
        </View>
      </View>
      <Image source={image} style={{ width: 160, height: 160 }} />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: 17, ...FONTS.h3 }}>{name}</Text>
        <Text
          style={{
            color: COLORS.darkGray2,
            ...FONTS.body5,
          }}
        >
          {description}
        </Text>
        <Text style={{ ...FONTS.h3 }}>${price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;
