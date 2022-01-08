import { StyleSheet } from 'react-native';

export const colors = {
  black: '#000000',
  black54: '#00000054',
  white: '#FFFFFF',

  background: '#f5f9f8',
  primary: 'tomato',
  secondary: 'mediumseagreen',
  placeholder: '#8A8A8A',
  textHint: '#AEAEAE',
  rippleOverlay: '#00000045',
};


export const baseStyles = StyleSheet.create({
  baseScreenComponent: {
    flex: 1,
    backgroundColor: colors.background,
  },
  defaultbackground: {
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  column: {
    flexDirection: "column",
    alignItems: "center",
  },
  primaryAction: {
    color: colors.primary,
  },
  baseTextStyles: {
    color: colors.black,
    fontWeight: "400",
  }
});