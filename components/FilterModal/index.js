import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { FONTS, COLORS, SIZES, icons, constants } from '../../constants';
import IconButton from '../IconButton';
import TextButton from '../TextButton';
import TwoPointSlider from '../TwoPointSlider';

const Section = ({ containerStyle, title, children }) => {
  return (
    <View style={{ marginTop: SIZES.padding, ...containerStyle }}>
      <Text style={{ ...FONTS.h3 }}>{title}</Text>
      {children}
    </View>
  );
};

const FilterModal = ({ isVisible, onClose }) => {
  const [deliveryTime, setDeliveryTime] = useState('');
  const [ratings, setRatings] = useState('');
  const [tags, setTags] = useState('');
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilterModal] = useState(isVisible);

  useEffect(() => {
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680],
  });

  function renderDistance() {
    return (
      <Section title="Distance">
        <View style={{ alignItems: 'center' }}>
          <TwoPointSlider
            values={[3, 10]}
            min={1}
            max={20}
            postfix="km"
            onValuesChange={(value) => console.log(value)}
          />
        </View>
      </Section>
    );
  }

  function renderDeliveryTime() {
    return (
      <Section title="Delivery Time" containerStyle={{ marginTop: 40 }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: SIZES.radius,
          }}
        >
          {constants.delivery_time.map((item, index) => (
            <TextButton
              key={`delivery_time-${index}`}
              label={item.label}
              labelStyle={{
                color:
                  item.id === deliveryTime ? COLORS.white : COLORS.darkGray,
                ...FONTS.body3,
              }}
              buttonContainerStyle={{
                width: '30%',
                height: 50,
                margin: 5,
                alignItems: 'center',
                borderRadius: SIZES.base,
                backgroundColor:
                  item.id === deliveryTime ? COLORS.primary : COLORS.lightGray2,
              }}
              onPress={() => setDeliveryTime(item.id)}
            />
          ))}
        </View>
      </Section>
    );
  }

  function renderPricingRange() {
    return (
      <Section title="Pricing Range" containerStyle={{ marginTop: 40 }}>
        <View style={{ alignItems: 'center' }}>
          <TwoPointSlider
            values={[10, 50]}
            min={1}
            max={100}
            prefix="$"
            onValuesChange={(value) => console.log(value)}
          />
        </View>
      </Section>
    );
  }

  function renderRatings() {
    return (
      <Section title="Ratings" containerStyle={{ marginTop: 40 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SIZES.radius,
          }}
        >
          {constants.ratings.map((item, index) => (
            <TextButton
              key={`ratings-${index}`}
              label={item.label}
              labelStyle={{
                color: item.id === ratings ? COLORS.white : COLORS.darkGray,
                ...FONTS.body3,
              }}
              icon={icons.star}
              iconStyles={{
                tintColor:
                  item.id === ratings ? COLORS.white : COLORS.darkGray2,
              }}
              buttonContainerStyle={{
                width: '15%',
                height: 50,
                margin: 5,
                alignItems: 'center',
                borderRadius: SIZES.base,
                backgroundColor:
                  item.id === ratings ? COLORS.primary : COLORS.lightGray2,
              }}
              onPress={() => setRatings(item.id)}
            />
          ))}
        </View>
      </Section>
    );
  }

  function renderTags() {
    return (
      <Section title="Tags" containerStyle={{ marginTop: 40 }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            flexWrap: 'wrap',
          }}
        >
          {constants.tags.map((item, index) => (
            <TextButton
              key={`tags-${index}`}
              label={item.label}
              labelStyle={{
                color: item.id === tags ? COLORS.white : COLORS.darkGray,
                ...FONTS.body3,
              }}
              buttonContainerStyle={{
                width: '30%',
                height: 50,
                margin: 5,
                alignItems: 'center',
                borderRadius: SIZES.base,
                backgroundColor:
                  item.id === tags ? COLORS.primary : COLORS.lightGray2,
              }}
              onPress={() => setTags(item.id)}
            />
          ))}
        </View>
      </Section>
    );
  }

  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={{ flex: 1, backgroundColor: COLORS.transparentBlack7 }}>
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: 'absolute',
            top: modalY,
            left: 0,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ flex: 1, ...FONTS.h4, fontSize: 18 }}>
              Filter Your Search
            </Text>
            <IconButton
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: COLORS.gray2,
              }}
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray2,
              }}
              onPress={() => setShowFilterModal(false)}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 250 }}
          >
            {renderDistance()}

            {renderDeliveryTime()}

            {renderPricingRange()}

            {renderRatings()}

            {renderTags()}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
