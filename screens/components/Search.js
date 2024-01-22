import { View, Text, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';
import { image185, searchMovies } from '../../api/MovieDb';

const Search = () => {

    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const movieName = "Spider Man (Far form Home)";
    const handleSearch = (value) => {
        if(value && value.length>2){
            setLoading(true);
            searchMovies({
                query: value,
                include_adults: "false",
                language:"en-us",
                page:"1"
            }).then(data=>{
                setLoading(false);
                if(data && data.results) setResults(data.results);
            })
        }else{
            setLoading(false);
            setResults([]);
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 800), []);

    return (
        <View className="bg-neutral-800">
            <View className="mt-10 px-5">
                <View className="mt-8 px-2 rounded-full border border-neutral-400 flex-row justify-between items-center">
                    <TextInput onChangeText={handleTextDebounce} className="h-10 justify-end flex-row text-white" placeholder="Search Movie" placeholderTextColor={"lightgray"}></TextInput>
                    <TouchableOpacity onPress={() => navigation.navigate("home")}>
                        <Entypo name="circle-with-cross" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            {
                results.length > 0 ? (
                    <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }} className="mt-8 mx-1">
                        <Text className="text-neutral-300 font-bold">Results ({results.length})</Text>
                        <View className="mt-5 flex-row justify-between flex-wrap">
                            {
                                results.map((item, index) => {
                                    return (
                                        <TouchableOpacity key={index} onPress={() => navigation.navigate("Movie", item)}>
                                            <View className="space-y-2 mb-5 items-center">
                                                <Image source={{uri:image185(item?.poster_path)}} style={{ height: 200, width: 150 }} className="rounded-3xl"></Image>
                                                <Text className="text-sm text-neutral-400">
                                                    {
                                                        item.title.length > 21 ? item.title.slice(0, 21) + "..." : item.title
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                ) : (
                    <View className="h-screen">
                        <View className="flex-1 justify-center items-center">
                            <Image source={require("../../assets/image/searchPic.png")} style={{height:200, width:200}}></Image>
                            <Text className="text-white text-3xl font-bold mt-3">Always Be Happy</Text>
                        </View>
                    </View>
                )
            }
        </View>
    )
}

export default Search;