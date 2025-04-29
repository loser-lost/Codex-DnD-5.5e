import { Text as DefaultText, TextProps, useTheme } from "@ui-kitten/components";

interface TitleTextProps extends TextProps {
  type: "h1" | "h2" | "h3";
}

export function TitleText(props: TitleTextProps) {
  const { type } = props;
  const fontSize = type === "h1" ? 32 : type === "h2" ? 24 : type === "h3" ? 20 : 16;
  const theme = useTheme();
  return <DefaultText {...props} style={[props.style, { fontFamily: 'AveriaSerifLibreBold', fontSize, color: theme['color-primary-500'] }]} />;
}

export function Text(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'Inter', fontSize: 16 }]} />;
}