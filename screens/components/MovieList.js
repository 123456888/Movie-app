import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { image185 } from '../../api/MovieDb';

var { width, height } = Dimensions.get("window"); // This will get the current height and width of the current window

const MovieList = ( {title, data, hideSee} ) => {
    const navigation = useNavigation();

    return (
        <View>
            <View className="px-5 mt-5 flex-row justify-between items-center">
                <Text className="text-white text-base font-bold">{title}</Text>
                {
                    !hideSee && (
                        <TouchableOpacity>
                            <Text className="text-yellow-400 font-bold text-base">See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} className="mt-5">
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate("Movie", item)} className="mb-4">
                                <View className="items-center mr-4">
                                    <Image source={{ uri: image185(item.poster_path) }} className="rounded-3xl" style={{ height: height * 0.22, width: width * 0.33 }}></Image>
                                    <Text className="text-white mt-1">
                                        {
                                            item.title.length > 14 ? item.title.slice(0, 14) + "..." : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

export default MovieList;