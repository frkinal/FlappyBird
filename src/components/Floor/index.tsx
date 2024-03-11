import React from 'react';
import {Image, View} from 'react-native';
import {GeneralProps} from '@components/types';
import {Images} from '../../assets/images';
import style from './style';
export const Floor: React.FC<GeneralProps> = ({
  body: {
    position,
    bounds: {max, min},
  },
}) => {
  const width = max.x - min.x;
  const height = max.y - min.y;
  const x = position.x - width / 2;
  const y = position.y - height / 2;
  const imageIterations = Math.ceil(width / height);
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
          flexDirection: 'row',
        },
      ]}>
      {Array.apply(null, Array(imageIterations)).map((el, idx) => (
        <Image
          style={{width: height, height}}
          key={idx}
          resizeMode="stretch"
          source={Images.floor}
        />
      ))}
    </View>
  );
};
