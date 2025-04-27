import { Text as DefaultText, TextProps, useTheme } from "@ui-kitten/components";

export function TitleText(props: TextProps) {
  const theme = useTheme();
  return <DefaultText {...props} style={[props.style, { fontFamily: 'AveriaSerifLibreBold', color: theme['color-primary-500'] }]} />;
}

export function Text(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'Inter', fontSize: 16 }]} />;
}