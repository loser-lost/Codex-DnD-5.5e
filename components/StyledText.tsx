import { Text as DefaultText, TextProps, useTheme } from "@ui-kitten/components";

export function TitleText(props: TextProps) {
  const theme = useTheme();
  return <DefaultText {...props} style={[props.style, { fontFamily: 'AveriaSerifLibreBold', color: theme['color-primary-500'] }]} />;
}

export function Text(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'Inter', fontSize: 16 }]} />;
}
export function TextCategory1(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'Inter', fontSize: 12, /* color: '#808080' */}]} />;
}
export function TextCategory2(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'Inter', fontSize: 10,/* color: '#808080' */}]} />;
}
export function TextCategory3(props: TextProps) {
  return <DefaultText {...props} style={[props.style, { fontFamily: 'Inter', fontSize: 12 }]} />;
}
//Tenho que retirar as colors das fontes