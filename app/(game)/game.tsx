import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Action, GameState } from '@/types'

const Game = () => {

    const ws = new WebSocket('ws://host.com/path');

    ws.onopen = () => {
    // connection opened
    ws.send('something'); // send a message
    };

    ws.onmessage = e => {
    // once the message is received, update the game state

    console.log(e.data);
    };

    ws.onerror = e => {
    // an error occurred
    console.log(e);
    };

    ws.onclose = e => {
    // connection closed
    console.log(e.code, e.reason);
    };

  return (
    <View>
      <Text>Game</Text>
    </View>
  )
}

export default Game;

const styles = StyleSheet.create({})