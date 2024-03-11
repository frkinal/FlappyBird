import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import Matter from 'matter-js';
import {Bird, Floor} from '@components';
import {Constants, Physics, resetPipes} from '@utils';
import {Images} from './assets/images';
function App() {
  const ref = React.useRef<GameEngine>(null);
  const [running, setRunning] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const setUpWorld = () => {
    let engine = Matter.Engine.create({enableSleeping: false});
    let world = engine.world;
    world.gravity.y = 0.0;
    let bird = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT / 2,
      Constants.BIRD_WIDTH,
      Constants.BIRD_HEIGHT,
    );
    let floor1 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH + 4,
      50,
      {isStatic: true},
    );
    let floor2 = Matter.Bodies.rectangle(
      Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
      Constants.MAX_HEIGHT - 25,
      Constants.MAX_WIDTH,
      50,
      {isStatic: true},
    );
    Matter.World.add(world, [bird, floor1, floor2]);
    Matter.Events.on(engine, 'collisionStart', (event: any) => {
      let pairs = event.pairs;
      (ref?.current as any)?.dispatch({type: 'game-over'});
    });
    return {
      physics: {engine, world},
      bird: {body: bird, pose: 1, renderer: Bird},
      floor1: {
        body: floor1,
        renderer: Floor,
      },
      floor2: {
        body: floor2,
        renderer: Floor,
      },
    };
  };
  const entities = setUpWorld();
  const onEvent = (e: any) => {
    if (e.type === 'game-over') {
      setRunning(false);
    } else if (e.type === 'score') {
      setScore(score + 1);
    }
  };
  const reset = () => {
    resetPipes();
    (ref?.current as any)?.swap(setUpWorld());
    setRunning(true);
    setScore(0);
  };
  return (
    <View style={styles.container}>
      <Image
        source={Images.background}
        style={styles.backgroundImage}
        resizeMode="stretch"
      />
      <GameEngine
        ref={ref}
        entities={entities}
        systems={[Physics]}
        style={styles.gameContainer}
        onEvent={onEvent}
        running={running}>
        <StatusBar hidden={true} />
        <Text style={styles.score}>{score}</Text>
        {!running && (
          <TouchableOpacity onPress={reset} style={styles.fullScreenButton}>
            <View style={styles.fullScreen}>
              <Text style={styles.gameOver}>Game Over</Text>
              <Text style={styles.gameOverSub}>Tray Again</Text>
            </View>
          </TouchableOpacity>
        )}
      </GameEngine>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  fullScreenButton: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOver: {
    color: 'white',
    fontSize: 48,
    fontFamily: '04b_19',
  },
  gameOverSub: {
    color: 'white',
    fontSize: 24,
    fontFamily: '04b_19',
  },
  score: {
    position: 'absolute',
    color: 'white',
    fontSize: 72,
    top: 50,
    left: Constants.MAX_WIDTH / 2 - 30,
    textShadowColor: '#444',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
    fontFamily: '04b_19',
  },
});

export default App;
