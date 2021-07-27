import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  FlatList,
} from 'react-native';
import HorizontalFoodCard from '../../components/HorizontalFoodCard';
import VerticalFoodCard from '../../components/VerticalFoodCard';
import { FONTS, icons, COLORS, SIZES, dummyData } from '../../constants';

const renderSearch = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        alignItems: 'center',
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.base,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
      }}
    >
      <Image
        source={icons.search}
        style={{ height: 20, width: 20, tintColor: COLORS.black }}
      />

      <TextInput
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
          ...FONTS.body3,
          alignItems: 'center',
        }}
        placeholder="search something..."
      />

      <TouchableOpacity>
        <Image
          source={icons.filter}
          style={{ height: 20, width: 20, tintColor: COLORS.black }}
        />
      </TouchableOpacity>
    </View>
  );
};

const Section = ({ title, onPress, children }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: SIZES.padding,
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        <Text style={{ ...FONTS.h3 }}>{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
            Show All
          </Text>
        </TouchableOpacity>
      </View>

      {children}
    </View>
  );
};

const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedMenuType, setSelectedMenuType] = useState(1);
  const [menuList, setMenuList] = useState([]);
  const [recommends, setRecommends] = useState([]);
  const [populars, setPopulars] = useState([]);

  useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  function handleChangeCategory(categoryId, menuTypeId) {
    let selectedPopular = dummyData.menu.find((a) => a.name === 'Popular');

    let selectedRecommend = dummyData.menu.find(
      (a) => a.name === 'Recommended'
    );

    let selectedMenu = dummyData.menu?.find((a) => a.id === menuTypeId);

    setPopulars(
      selectedPopular?.list?.filter((a) => a.categories?.includes(categoryId))
    );

    setRecommends(
      selectedRecommend?.list?.filter((a) => a.categories?.includes(categoryId))
    );

    setMenuList(
      selectedMenu?.list?.filter((a) => a.categories?.includes(categoryId))
    );
  }

  const renderMenuTypes = () => {
    return (
      <FlatList
        horizontal
        data={dummyData.menu}
        keyExtractor={(item) => `${item.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 30, marginBottom: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedMenuType(item.id);
              handleChangeCategory(selectedCategoryId, item.id);
            }}
            style={{
              marginLeft: SIZES.padding,
              marginRight:
                index === dummyData.menu.length - 1 ? SIZES.padding : 0,
            }}
          >
            <Text
              style={{
                color:
                  selectedMenuType === item.id ? COLORS.primary : COLORS.black,
                ...FONTS.h4,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    );
  };

  const renderRecommendedSection = () => {
    return (
      <Section
        title="Recommended"
        onPress={() => console.log('Show All Recommended')}
      >
        <FlatList
          data={recommends}
          renderItem={({ item, index }) => (
            <HorizontalFoodCard
              containerStyle={{
                height: 180,
                width: SIZES.width * 0.85,
                marginLeft: index === 0 ? SIZES.padding : 18,
                marginRight:
                  index === recommends.length - 1 ? SIZES.padding : 0,
                paddingHorizontal: SIZES.radius,
                alignItems: 'center',
              }}
              imageStyle={{
                marginTop: 35,
                height: 150,
                width: 150,
              }}
              {...item}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Section>
    );
  };

  const renderPopularSection = () => {
    return (
      <Section
        title="Popular Near You"
        onPress={() => console.log('Show All Popular')}
      >
        <FlatList
          data={populars}
          renderItem={({ item, index }) => (
            <VerticalFoodCard
              containerStyle={{
                padding: 18,
                marginLeft: index === 0 ? SIZES.padding : 18,
                marginRight: index === populars.length - 1 ? SIZES.padding : 0,
                paddingHorizontal: SIZES.radius,
              }}
              onPress={() => console.log('Vertical Food Card')}
              {...item}
            />
          )}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Section>
    );
  };

  const renderFoodCategories = () => {
    return (
      <Section
        title="Popular Near You"
        onPress={() => console.log('Show All Popular')}
      >
        <FlatList
          data={dummyData.categories}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedCategoryId(item.id);
                handleChangeCategory(item.id, selectedMenuType);
              }}
              style={{
                flexDirection: 'row',
                height: 65,
                alignItems: 'center',
                marginTop: SIZES.padding,
                marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
                marginRight:
                  index === dummyData.categories.length - 1 ? SIZES.padding : 0,
                paddingHorizontal: 8,
                borderRadius: SIZES.radius,
                backgroundColor:
                  selectedCategoryId === item.id
                    ? COLORS.primary
                    : COLORS.lightGray1,
              }}
            >
              <Image
                source={item.icon}
                style={{ height: 50, width: 50, marginTop: 5 }}
              />
              <Text
                style={{
                  marginRight: SIZES.base,
                  color:
                    selectedCategoryId === item.id
                      ? COLORS.white
                      : COLORS.darkGray,

                  ...FONTS.h3,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => `${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Section>
    );
  };
  const renderDeliveryAddress = () => {
    return (
      <View
        style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding }}
      >
        <Text style={{ color: COLORS.primary, ...FONTS.body3 }}>
          Delivery TO
        </Text>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
            alignItems: 'center',
          }}
        >
          <Text style={{ ...FONTS.h4 }}>{dummyData.myProfile.address}</Text>
          <Image
            source={icons.down_arrow}
            style={{ marginLeft: SIZES.base, height: 20, width: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {renderSearch()}

      <FlatList
        data={menuList}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderDeliveryAddress()}

            {renderFoodCategories()}

            {renderPopularSection()}

            {renderRecommendedSection()}

            {renderMenuTypes()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <HorizontalFoodCard
              containerStyle={{
                height: 130,
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
                marginBottom: SIZES.radius,
              }}
              imageStyle={{
                marginTop: 20,
                height: 110,
                width: 110,
              }}
              {...item}
              onPress={() => console.log('FoodCard')}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 200 }}></View>}
      />
    </View>
  );
};

export default Home;
