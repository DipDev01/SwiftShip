import * as React from 'react';

declare module 'react-native' {
  interface View extends React.Component<any> {}
  interface Text extends React.Component<any> {}
  interface TextInput extends React.Component<any> {
    focus(): void;
  }
  interface ScrollView extends React.Component<any> {}
  interface KeyboardAvoidingView extends React.Component<any> {}
  interface ActivityIndicator extends React.Component<any> {}
  interface TouchableOpacity extends React.Component<any> {}
}
