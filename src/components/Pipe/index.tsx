import React from 'react';
import {Image, View} from 'react-native';
import {GeneralProps} from '@components/types';
import {Images} from '../../assets/images';
import style from './style';
export const Pipe: React.FC<GeneralProps> = ({
  body: {
    position,
    bounds: {max, min},
  },
}) => {
  const width = max.x - min.x;
  const height = max.y - min.y;
  const x = position.x - width / 2;
  const y = position.y - height / 2;
  const pipeRatio = 160 / height;
  const pipeHeight = 33 / pipeRatio;
  const pipeIterations = Math.ceil(height / pipeHeight);
  return (
    <View
      style={[
        style.container,
        {
          width,
          height,
          top: y,
          left: x,
          overflow: 'hidden',
          flexDirection: 'column',
        },
      ]}>
      {Array.apply(null, Array(pipeIterations)).map((el, idx) => (
        <Image
          style={{width, height: pipeHeight}}
          key={idx}
          resizeMode="stretch"
          source={Images.pipeCore}
        />
      ))}
    </View>
  );
};
