
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { IconElement, useTheme } from "@ui-kitten/components";
import { router, useRouter } from "expo-router";
import { useMemo } from "react";
import { ImageProps, TextStyle } from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";


const debounce = (func: (...args: string[]) => void, wait: number) => {
      let timeout: number;
      return (...args: string[]) => {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => func(...args), wait);
      };
};
  
    export const ClassIcon = (props?: Partial<ImageProps>): React.ReactElement => {
        const theme = useTheme(); 
        
        return (
                <FontAwesome5
                {...props}
                name="magic"
                size={18}
                color={theme['color-primary-500']}
                />
        );
    };
    
    export const SchoolIcon = (props?: Partial<ImageProps>): IconElement => {
        const theme = useTheme(); 
        return (
        <FontAwesome5
            {...props}
            name='school'
            size={18}
            color={theme['color-primary-500']}
        />
        );
    };

    export const RangeIcon = (props?: Partial<ImageProps>): IconElement => {
        const theme = useTheme(); 
        return (
        <FontAwesome5
            {...props}
            name='ruler'
            size={18}
            color={theme['color-primary-500']}
        />
        );
    };
    

    export const TempoIcon = (props?: Partial<ImageProps>): IconElement =>{
        const theme = useTheme(); 
        return(
        <FontAwesome5
            {...props}
            name="clock"
            size={18}
            color={theme['color-primary-500']}
        />
    );
    };
    export  const CirculoIcon = (props?: Partial<ImageProps>): IconElement =>{ 
        const theme = useTheme(); 
        return (
        <FontAwesome5
            {...props}
            name="sith"
            size={18}
            color={theme['color-primary-500']}
        />
    );
    };

    export const BackIcon = (props?: Partial<TextStyle>): IconElement => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <AntDesign
            name="back"
            size={24}
            color={theme['color-basic-500']}
            onPress={() => debounce(() => router.back(), 300)}
            style={props}
        />
    );
};
