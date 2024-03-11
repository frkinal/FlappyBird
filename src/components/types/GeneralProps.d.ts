export interface GeneralProps {
  size: Array<number>;
  pose: number;
  body: {
    position: {
      x: number;
      y: number;
    };
    bounds: {
      max: {
        x: number;
        y: number;
      };
      min: {
        x: number;
        y: number;
      };
    };
    velocity: {
      x: number;
      y: number;
    };
  };
  color: string;
}
