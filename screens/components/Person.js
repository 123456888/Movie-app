import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MovieList from './MovieList';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loading from './Loading';
import { fetchPersonDetails, fetchPersonMovies, image342 } from '../../api/MovieDb';

const Person = () => {
    const { params: item } = useRoute();
    const [isFav, setIsFav] = useState(false);
    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item])

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        if (data) setPerson(data)
        setLoading(false)
    }

    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id);
        if (data && data.cast) setPersonMovies(data.cast)
        setLoading(false)
    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
            {
                loading ? (
                    <Loading />
                ) : (
                    <View className="w-full">
                        <SafeAreaView className="mt-10 w-full flex-row justify-between items-center px-4">
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="chevron-back-circle-sharp" size={40} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIsFav(!isFav)}>
                                <Ionicons name="ios-heart" size={40} color={isFav ? "red" : "white"} />
                            </TouchableOpacity>
                        </SafeAreaView>
                        <View className="flex-row justify-center">
                            <View className="items-center border-4 border-gray-400 rounded-full h-72 w-72 overflow-hidden">
                                <Image source={{ uri: image342(person?.profile_path) }} style={{ width: 300, height: 300 }}></Image>
                            </View>
                        </View>
                        <View className="items-center">
                            <Text className="text-white text-3xl font-bold mt-4">{person.name}</Text>
                            <Text className="text-neutral-500">{person.place_of_birth}</Text>
                        </View>
                        <View className="px-3">
                            <View className="flex-row justify-between mt-10 bg-neutral-600 p-4 rounded-full">
                                <View className="items-center border-r-2 px-2 border-r-neutral-400">
                                    <Text className="text-white">Gender</Text>
                                    <Text className="text-white">
                                        {
                                            person.gender == 1 ? "Femail" : "Male"
                                        }
                                    </Text>
                                </View>
                                <View className="items-center border-r-2 px-2 border-r-neutral-400">
                                    <Text className="text-white">Birthday</Text>
                                    <Text className="text-white">{person?.birthday}</Text>
                                </View>
                                <View className="items-center border-r-2 px-2 border-r-neutral-400">
                                    <Text className="text-white">Known For</Text>
                                    <Text className="text-white">{person.known_for_department}</Text>
                                </View>
                                <View className="items-center px-2">
                                    <Text className="text-white">Popularity</Text>
                                    <Text className="text-white">{person?.popularity?.toFixed(2)} %</Text>
                                </View>
                            </View>
                        </View>
                        <View className="mx-3">
                            <Text className="text-base font-bold text-white mt-8">Biography</Text>
                            <Text className="text-justify text-sm text-neutral-300 mt-3">
                                {
                                    person?.biography || "N/A"
                                }
                            </Text>
                        </View>
                        <View>
                            {
                                loading ? (
                                    <Loading />
                                ) : (
                                    <MovieList title="Movies" hideSee={true} data={personMovies} />
                                )
                            }
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default Person;