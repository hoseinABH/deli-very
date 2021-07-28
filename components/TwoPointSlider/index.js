import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTS, COLORS, SIZES, icons } from '../../constants';

const TwoPointSlider = ({
  values,
  min,
  max,
  prefix,
  postfix,
  onValuesChange,
}) => {
  return (
    <MultiSlider
      values={values}
      sliderLength={SIZES.width - SIZES.padding * 2 - 20}
      min={min}
      max={max}
      step={1}
      markerOffsetY={20}
      selectedStyle={{ backgroundColor: COLORS.primary }}
      trackStyle={{
        height: 10,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray2,
      }}
      minMarkerOverlapDistance={50}
      onValuesChange={onValuesChange}
      customMarker={(e) => (
        <View
          style={{ height: 30, alignItems: 'center', justifyContent: 'center' }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              borderColor: COLORS.white,
              borderWidth: 4,
              backgroundColor: COLORS.primary,
              ...styles.shadow,
            }}
          />

          <Text
            style={{ marginTop: 5, color: COLORS.darkGray, ...FONTS.body3 }}
          >
            {prefix}
            {e.currentValue}
            {postfix}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 1,
    shadowOpacity: 0.1,
  },
});

export default TwoPointSlider;
