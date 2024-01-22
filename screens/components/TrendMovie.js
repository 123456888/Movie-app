import { View, Text, Dimensions, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-snap-carousel';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../../api/MovieDb';

var { width, height } = Dimensions.get("window"); // This will get the current height and width of the current window

const TrendMovie = ({ data }) => {

    const navigation = useNavigation();

    const handleClick = (item) => {
        navigation.navigate("Movie", item);
    }

    return (
        <View>
            <View className="mt-5 mb-4">
                <Text className="text-white text-lg font-bold px-5 mb-5">Trending</Text>
                <View>
                    <Carousel
                        data={data}
                        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
                        firstItem={1}
                        inactiveSlideOpacity={0.60}
                        sliderWidth={width}
                        itemWidth={width * 0.62}
                        slideStyle={{ display: "flex", alignItems: "center" }}
                    ></Carousel>
                </View>
            </View>
        </View>
    )
}

const MovieCard = ({ item, handleClick }) => {
    return (
        <Pressable onPress={() => handleClick(item)}>
            <Image source={{ uri: image500(item.poster_path) }} style={{ width: width * 0.6, height: height * 0.4 }} className="rounded-3xl"></Image>
        </Pressable>
    )
}

export default TrendMovie;