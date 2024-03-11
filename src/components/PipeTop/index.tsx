import React from 'react';
import {Image} from 'react-native';
import {GeneralProps} from '@components/types';
import {Images} from '../../assets/images';
import style from './style';
export const PipeTop: React.FC<GeneralProps> = ({
  body: {
    position,
    bounds: {max, min},
  },
}) => {
  const width = max.x - min.x;
  const height = max.y - min.y;
  const x = position.x - width / 2;
  const y = position.y - height / 2;
  return (
    <Image
      style={[
        style.container,
        {
          position: 'absolute',
          width,
          height,
          top: y,
          left: x,
        },
      ]}
      resizeMode="stretch"
      source={Images.pipeTop}
    />
  );
};
