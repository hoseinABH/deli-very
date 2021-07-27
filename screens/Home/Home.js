import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import HorizontalFoodCard from '../../components/HorizontalFoodCard';
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
const Home = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(1);
  const [selectedMenuType, setSelectedMenuType] = useState(1);
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    handleChangeCategory(selectedCategoryId, selectedMenuType);
  }, []);

  function handleChangeCategory(categoryId, menuTypeId) {
    let selectedMenu = dummyData.menu?.find((a) => a.id === menuTypeId);

    setMenuList(
      selectedMenu?.list.filter((a) => a.categories?.includes(categoryId))
    );
  }

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
      />
    </View>
  );
};

export default Home;
