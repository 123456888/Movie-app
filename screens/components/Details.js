import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Cast from './Cast';
import MovieList from './MovieList';
import Loading from './Loading';
import { fetchMovieCredits, fetchMovieDetails, fetchSimilarMovie, image500 } from '../../api/MovieDb';

const Details = () => {

    const { params: item } = useRoute();

    const navigation = useNavigation();
    const [isFav, setIsFav] = useState(false);
    const [cast, setCast] = useState([]);
    const [similar, setSimilar] = useState([]);
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
        setLoading(true);
    }, [item])

    const getMovieDetails = async id => {
        const data = await fetchMovieDetails(id);
        setMovie(data)
    }
    const getMovieCredits = async id => {
        const data = await fetchMovieCredits(id);
        if (data && data.cast) setCast(data.cast)
        setLoading(false)
    }
    const getSimilarMovies = async id => {
        const data = await fetchSimilarMovie(id);
        if (data && data.results) setSimilar(data.results)
        setLoading(false)
    }

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View className="w-full">
                            <SafeAreaView className="absolute mt-10 z-20 w-full flex-row justify-between items-center px-4">
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Ionicons name="chevron-back-circle-sharp" size={40} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setIsFav(!isFav)}>
                                    <Ionicons name="ios-heart" size={40} color={isFav ? "red" : "white"} />
                                </TouchableOpacity>
                            </SafeAreaView>
                            <View className="">
                                <Image source={{ uri: image500(item?.poster_path) }} style={{ width: 350, height: 470 }}></Image>
                            </View>
                            <View className="px-3">
                                <View className="items-center mt-2">
                                    <Text className="text-white text-2xl font-bold">{movie.original_title}</Text>
                                    <Text className="text-white mt-4 text-sm font-bold">Title - {movie.title}</Text>
                                    <Text className="text-neutral-300 mt-1">Released  {movie.release_date}</Text>
                                </View>
                                <View className="flex-row justify-center items-center mt-1">
                                    {
                                        movie?.genres?.map((genre, index) => {
                                            return (
                                                <Text key={index} className="text-neutral-300 text-sm mr-2">
                                                    {
                                                        genre.name
                                                    } .
                                                </Text>
                                            )
                                        })
                                    }
                                </View>
                                <View className="items-center mt-4">
                                    <Text className="text-sm text-justify text-neutral-300">{item.overview}</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Cast cast={cast} />
                            <MovieList title="Similar Movies" hideSee={true} data={similar} />
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default Details