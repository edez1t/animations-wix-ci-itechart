import React from 'react'
import { Button as RNButoon } from 'react-native'

type ButtonProps = {
  children: string
  onPress: () => void
}

export const Button: React.FC<ButtonProps> = ({ children, onPress }) => {
  return <RNButoon title={children} color='#424242' onPress={onPress} />
}
