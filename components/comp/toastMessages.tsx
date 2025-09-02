import {ToastAndroid} from 'react-native';

// somente um tapa buraco depois deve ser substituido!
const toastMessages = () => {

    const errorM = () => {
        ToastAndroid.showWithGravity(
        'Falha!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        );
    };
    const sucessM = () => {
        ToastAndroid.showWithGravity(
        'Sucesso!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        );
    };
    const showSucessSpell = () => {
        ToastAndroid.showWithGravity(
        'Magia adicionada com sucesso!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        );
    };
    const showFailSpell = () => {
        ToastAndroid.showWithGravity(
        'Magia não adicionada!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        );
    };

    const knowedSpell = () => {
        ToastAndroid.showWithGravity(
        'Ja conhece essa magia!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        );
    };
    const removeSpSucess = () => {
        ToastAndroid.showWithGravity(
        'Sucesso ao remover Magia',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        );
    };
    const removeSpFail = () => {
        ToastAndroid.showWithGravity(
        'Erro ao remover magia!',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        );
    };

    const EditCharacterSucess = () =>{
        ToastAndroid.showWithGravity(
            'Personagem editado com sucesso!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        )
    }
     const EditCharacterFail = () =>{
        ToastAndroid.showWithGravity(
            'Erro ao editar personagem!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        )
    }
   
   
  return{
        errorM,
        sucessM,
        showSucessSpell,
        showFailSpell,
        knowedSpell,
        EditCharacterSucess,
        EditCharacterFail,
        removeSpSucess,
        removeSpFail
    }
}
 export { toastMessages };