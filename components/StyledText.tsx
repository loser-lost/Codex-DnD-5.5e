import React from 'react';

import { Text as DefaultText, TextProps, useTheme } from "@ui-kitten/components";

interface TitleTextProps extends TextProps {
  type: "h1" | "h2" | "h3" | "h4";
  color?: string;
}

export function TitleText(props: TitleTextProps) {
  const { type, color } = props;
  const fontSize = type === "h1" ? 32 : type === "h2" ? 24 : type === "h3" ? 20 : 16;
  const theme = useTheme();
  return <DefaultText {...props} style={[props.style, { fontFamily: 'AveriaSerifLibreBold', fontSize, color: color === "primary" ? theme['color-primary-500'] : theme['color-basic-100'] }]} />;
}

export function Text(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'Inter' }]} />;
}
//Tenho que retirar as colors das fontes