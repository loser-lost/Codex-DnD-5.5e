
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { IconElement, useTheme } from "@ui-kitten/components";
import { ImageProps, TextStyle } from 'react-native';
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';
import { JSX } from "react";
import Entypo from "@expo/vector-icons/build/Entypo";


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

  
    type DeleteIconXProps = {
        deleteIconX: () => void;
        style?: Partial<TextStyle>;
    }

    type editIconProps = {
        editIcon: () => void;
        style?: Partial<TextStyle>;
    }

    type FilterIconProps = {
        filterIcon: () => void;
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
            name="backward"
            size={26}
            color={theme['color-basic-500']}
            onPress={onBackPress}
        />
    );
    };//<AntDesign name="backward" size={24} color="black" />

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
                name="plus-circle"
                size={26}
                color={theme['color-basic-500']}
                onPress={addOnCharacter}
            />
        );
    };//<AntDesign name="plus-circle" size={24} color="black" />
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

    export const PlusIcon = (): IconElement=> {
        const theme = useTheme();
        return (
            <Entypo 
            name="plus" 
            size={28} 
            color={theme['background-basic-color-1']}
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

    export const DeleteIconXNoProps = (): IconElement => {
        const theme = useTheme();
        return (
            <FontAwesome6  
            name="xmark" 
            size={24} 
            color={theme['color-basic-500']}
            />
        )
    }
    export const IconX = (): IconElement => {
        const theme = useTheme();
        return (
            <FontAwesome6  
            name="xmark" 
            size={10} 
            color={theme['color-basic-500']}
           
            />
        )
    }
    export const EditIcon = ({ editIcon, style }: editIconProps): IconElement => {
        const theme = useTheme();
        return (
            <FontAwesome6 
            name="edit" 
            size={24} 
            color={theme['color-basic-500']}
            onPress={editIcon}
            />
        )
    }

    export const FilterIcon = ({ filterIcon, style }: FilterIconProps): IconElement => {
        const theme = useTheme();
        return(
            <FontAwesome6 
            name="filter" 
            size={24} 
            color={theme['color-basic-500']}
            onPress={filterIcon}
            />
        )
    }

    export const AddSpellIcon = (): IconElement => {
        const theme = useTheme();
        return (
        <FontAwesome6 name="plus" size={24} color={theme['color-primary-500']} />
        );
    }

    export const AdedSpellIcon = (): IconElement => {
        const theme = useTheme();
        return (
        <FontAwesome5 name="angle-down" size={24} color={theme['background-basic-color-1']} />
        );
        //<FontAwesome6 name="check" size={15} color={theme['background-basic-color-1']} />
    }

    

//color="black" />