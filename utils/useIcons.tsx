import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { IconElement, useTheme } from "@ui-kitten/components";
import { ImageProps } from 'react-native';
    

  
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