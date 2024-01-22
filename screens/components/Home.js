import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import TrendMovie from './TrendMovie';
import MovieList from './MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../../api/MovieDb';

const Home = () => {

    const [trend, setTrend] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getTrandingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, [])

    const getTrandingMovies = async () => {
        const data = await fetchTrendingMovies();
        if (data && data.results) {
            setTrend(data.results);
            setLoading(false);
        }
    }
    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        if (data && data.results) {
            setUpComing(data.results);
            setLoading(false);
        }
    }
    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        if (data && data.results) {
            setTopRated(data.results);
            setLoading(false);
        }
    }

    return (
        <View className="flex-1 bg-neutral-800">
            <View>
                <StatusBar style="light" />
                <View className="flex-row justify-between items-center px-5 mt-10">
                    <Entypo name="menu" size={24} color="white" />
                    <View className="flex-row">
                        <Text className="text-yellow-400 text-2xl">M</Text>
                        <Text className="text-white text-2xl">ovies</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <FontAwesome name="search" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            {
                loading ? (
                    <Loading />
                ) : (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                        {trend.length > 0 && <TrendMovie data={trend} />}
                        {upComing.length > 0 && <MovieList title="Upcoming" data={upComing} />}
                        {topRated.length > 0 && <MovieList title="Top Rated" data={topRated} />}
                    </ScrollView>
                )
            }
        </View>
    )
}

export default Home;