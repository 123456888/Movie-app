import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { image185 } from '../../api/MovieDb'

const Cast = ({ cast }) => {
    let personName = "Keanu Reevs";
    let characterName = "John Wick";

    const navigation = useNavigation();
    return (
        <View>
            <View className="mx-4">
                <Text className="text-neutral-300 text-lg mt-6 font-bold">Top Cast</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
                {
                    cast && cast.map((person, index) => { // ? why two cast is there
                        return (
                            <TouchableOpacity
                                key={index}
                                className="mt-4 items-center"
                                onPress={() => navigation.navigate("Person", person)}
                            >
                                <View className="mr-4 items-center">
                                    <View className="border border-neutral-300 rounded-full">
                                        <Image source={{uri:image185(person.profile_path)}} style={{ height: 75, width: 75 }} className="rounded-full"></Image>
                                    </View>
                                    <Text className="text-neutral-300 text-sm">
                                        {
                                            person.character.length > 10 ? person.character.slice(0, 10) + "..." : person.character
                                        }
                                    </Text>
                                    <Text className="text-neutral-300 text-sm mb-5">
                                        {
                                            person.original_name.length > 10 ? person.original_name.slice(0, 10) + "..." : person.original_name
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

export default Cast