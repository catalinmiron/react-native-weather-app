import KeyboardEvents from 'react-native-keyboardevents';
import {
  Emitter as KeyboardEventEmitter
} from 'react-native-keyboardevents';

import { LayoutAnimation } from "react-native"

let animations = {
  layout: {
    spring: {
      duration: 700,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.8,
      }
    }
  }
};

export default {

  getInitialState() {
    return {
      keyboardSpace: 0,
      isKeyboardOpened: false
    };
  },

  updateKeyboardSpace(frames) {
    this.setState({
      keyboardSpace: frames.end.height,
      isKeyboardOpened: true
    });
  },

  resetKeyboardSpace() {
    this.setState({
      keyboardSpace: 0,
      isKeyboardOpened: false
    });
  },

  componentDidMount() {
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
    KeyboardEventEmitter.on(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
  },

  componentWillUnmount() {
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardDidShowEvent, this.updateKeyboardSpace);
    KeyboardEventEmitter.off(KeyboardEvents.KeyboardWillHideEvent, this.resetKeyboardSpace);
  },

  componentWillUpdate(props, state) {
    if (state.isKeyboardOpened !== this.state.isKeyboardOpened) {
      LayoutAnimation.configureNext(animations.layout.spring);
    }
  }
};
