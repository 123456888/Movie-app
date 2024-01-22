import { View, Text } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

const Loading = () => {
    return (
            <View className="mt-32 items-center">
                <Progress.CircleSnail thickness={2} size={60} color={"yellow"} />
            </View>
    )
}

export default Loading;