import React from 'react';
import {Animated} from 'react-native';
import {GeneralProps} from '@components/types';
import {Images} from '../../assets/images';
import style from './style';
export const Bird: React.FC<GeneralProps> = ({
  body: {
    position,
    bounds: {max, min},
    velocity,
  },
  pose,
}) => {
  const AnimatedValue = new Animated.Value(velocity.y);
  const width = max.x - min.x;
  const height = max.y - min.y;
  const x = position.x - width / 2;
  const y = position.y - height / 2;
  let image = Images['bird' + pose];
  AnimatedValue.setValue(velocity.y);
  let rotetion = AnimatedValue.interpolate({
    inputRange: [-10, 0, 10, 20],
    outputRange: ['-20deg', '0deg', '15deg', '45deg'],
    extrapolate: 'clamp',
  });
  return (
    <Animated.Image
      style={[
        style.container,
        {
          position: 'absolute',
          width,
          height,
          top: y,
          left: x,
          transform: [{rotate: rotetion}],
        },
      ]}
      resizeMode="stretch"
      source={image}
    />
  );
};
