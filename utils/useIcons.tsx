
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { IconElement, useTheme } from "@ui-kitten/components";
import { ImageProps, TextStyle } from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { JSX } from "react";


    type BackIconProps = {
        onBackPress: () => void;
        style?: Partial<TextStyle>;
    };

    type addIconProps = {
        addOnCharacter: () => void;
        style?: Partial<TextStyle>;
    };

    type fontIconProps = {
        fontModify: () => void;
        style?: Partial<TextStyle>;
    };
    type deleteIconProps = {
        deleteIcon: () => void;
        style?: Partial<TextStyle>;
    };

    type PlusIconProps = {
        plusIcon: () => void;
        style?: Partial<TextStyle>;
    };
  
    type DeleteIconXProps = {
        deleteIconX: () => void;
        style?: Partial<TextStyle>;
    }
    
  
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

    export const BackIcon = ({ onBackPress, style }: BackIconProps): JSX.Element => {
    const theme = useTheme();
   
    return (
        <AntDesign
            name="back"
            size={26}
            color={theme['color-basic-500']}
            onPress={onBackPress}
        />
    );
    };

    export const StarIcon = (props?: Partial<ImageProps> ): IconElement =>{
         const theme = useTheme();
         
        return(
            <MaterialCommunityIcons 
            name="star-four-points" 
            size={26}
            color={theme['color-primary-500']}
            />
        );
        
    };
    
    export const AddIcon = ({ addOnCharacter, style }: addIconProps): JSX.Element => {
        const theme = useTheme();
    
        return (
            <AntDesign
                name="pluscircleo"
                size={26}
                color={theme['color-basic-500']}
                onPress={addOnCharacter}
            />
        );
    };
      export const AlterFont = ({ fontModify, style }: fontIconProps): JSX.Element => {
        const theme = useTheme();
    
        return (
            <FontAwesome 
                name="font"
                size={26}
                color={theme['color-basic-500']}
                onPress={fontModify}
            />
        );
    };

     export const DeleteIcon = ({ deleteIcon, style }: deleteIconProps): IconElement=> {
        const theme = useTheme();
        return (
            <Feather 
            name="x" 
            size={16} 
            color={theme['color-basic-500']}
            onPress={deleteIcon}
            />
        );
    };

    export const PlusIcon = ({plusIcon, style }: PlusIconProps): IconElement=> {
        const theme = useTheme();
        return (
            <AntDesign 
            name="pluscircle" 
            size={24} 
            color={theme['color-basic-500']}
            onPress={plusIcon}
            />
        );
    }
    export const DeleteIconX = ({ deleteIconX, style }: DeleteIconXProps): IconElement => {
        const theme = useTheme();
        return (
            <FontAwesome6 
            name="xmark" 
            size={24} 
            color={theme['color-basic-500']}
            onPress={deleteIconX}
            />
        )
    }
//<FontAwesome6 name="xmark" size={24} color="black" />