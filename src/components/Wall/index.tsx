import React from 'react';
import {View} from 'react-native';
import {GeneralProps} from '@components/types';
import style from './style';
export const Wall: React.FC<GeneralProps> = ({
  size,
  body: {position},
  color,
}) => {
  const width = size[0];
  const height = size[1];
  const x = position.x - width / 2;
  const y = position.y - height / 2;
  return (
    <View
      style={[
        style.container,
        {
          width,
          height,
          top: y,
          left: x,
          backgroundColor: color,
        },
      ]}
    />
  );
};
