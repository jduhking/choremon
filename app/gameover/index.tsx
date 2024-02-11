import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const GameOverScreen = () => {
    const { winner } = useLocalSearchParams();

  return (
    <View>
      <Text>The winner is { winner }</Text>
    </View>
  )
}

export default GameOverScreen

const styles = StyleSheet.create({})