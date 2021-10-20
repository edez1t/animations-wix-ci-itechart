import React, { useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  RotationGestureHandler,
  RotationGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler'
import { NavigationFunctionComponent } from 'react-native-navigation'

export const RotateScaleTilt: NavigationFunctionComponent = () => {
  const rotationRef = useRef()
  const pinchRef = useRef()

  /* Pinch */
  const baseScale = useRef(new Animated.Value(1)).current
  const pinchScale = useRef(new Animated.Value(1)).current
  const scale = useRef(Animated.multiply(baseScale, pinchScale)).current
  const lastScale = useRef(1)
  const onPinchGestureEvent = useRef(
    Animated.event([{ nativeEvent: { scale: pinchScale } }], { useNativeDriver: true })
  ).current

  /* Rotate */
  const rotate = useRef(new Animated.Value(0)).current
  const rotateStr = rotate.interpolate({
    inputRange: [-100, 100],
    outputRange: ['-100rad', '100rad'],
  })
  const lastRotate = useRef(0)
  const onRotateGestureEvent = useRef(
    Animated.event([{ nativeEvent: { rotation: rotate } }], { useNativeDriver: true })
  ).current

  /* Tilt */
  const tilt = useRef(new Animated.Value(0)).current
  const tiltStr = tilt.interpolate({
    inputRange: [-501, -500, 0, 1],
    outputRange: ['1rad', '1rad', '0rad', '0rad'],
  })
  const lastTilt = useRef(0)
  const onTiltGestureEvent = useRef(
    Animated.event([{ nativeEvent: { translationY: tilt } }], { useNativeDriver: true })
  ).current

  const onRotateHandlerStateChange = (event: HandlerStateChangeEvent<RotationGestureHandlerEventPayload>) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastRotate.current += event.nativeEvent.rotation
      rotate.setOffset(lastRotate.current)
      rotate.setValue(0)
    }
  }
  const onPinchHandlerStateChange = (event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale.current *= event.nativeEvent.scale
      baseScale.setValue(lastScale.current)
      pinchScale.setValue(1)
    }
  }
  const onTiltGestureStateChange = (event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastTilt.current += event.nativeEvent.translationY
      tilt.setOffset(lastTilt.current)
      tilt.setValue(0)
    }
  }

  return (
    <PanGestureHandler
      onGestureEvent={onTiltGestureEvent}
      onHandlerStateChange={onTiltGestureStateChange}
      minDist={10}
      minPointers={2}
      maxPointers={2}
      avgTouches
    >
      <Animated.View style={{ flex: 1 }}>
        <RotationGestureHandler
          ref={rotationRef}
          simultaneousHandlers={pinchRef}
          onGestureEvent={onRotateGestureEvent}
          onHandlerStateChange={onRotateHandlerStateChange}
        >
          <Animated.View style={{ flex: 1 }}>
            <PinchGestureHandler
              ref={pinchRef}
              simultaneousHandlers={rotationRef}
              onGestureEvent={onPinchGestureEvent}
              onHandlerStateChange={onPinchHandlerStateChange}
            >
              <Animated.View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  overflow: 'hidden',
                  alignItems: 'center',
                  flex: 1,
                  justifyContent: 'center',
                }}
                collapsable={false}
              >
                <Animated.Image
                  style={{
                    width: 250,
                    height: 250,
                    transform: [{ perspective: 200 }, { scale: scale }, { rotate: rotateStr }, { rotateX: tiltStr }],
                  }}
                  source={require('../../assets/profile-picture.jpg')}
                />
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </RotationGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  )
}

RotateScaleTilt.options = {
  topBar: { title: { text: 'Rotate, Scale and Tilt' } },
}
