
import { useTheme, Text} from "@ui-kitten/components";
import { Spell } from "../utils/groupMagic";

interface descriptionProps {
    item: Spell;
    fontSize: number;
}

export default function Description({item,fontSize}: descriptionProps) {
    const theme = useTheme();
        return(
            <>
                <Text category="h4">
                    {item.nome}
                </Text>
                <Text style={{ fontSize: fontSize + 1 }}>Circulo de magia: </Text>
                <Text style={{ fontSize, color: theme['color-basic-500'], marginTop: 2}}>
                    {item.circulo}
                </Text>
                <Text style={{ fontSize: fontSize + 1 }}>Classe Da magia </Text>
                <Text style={{ fontSize, color: theme['color-basic-500'] }}>
                    {item.classes.length > 1
                        ? item.classes.join(', ')
                        : item.classes.length === 1
                            ? item.classes[0]
                            : ''
                    }
                </Text>
                <Text style={{ fontSize: fontSize + 1 }}>Escola da magia: </Text>
                <Text style={{ fontSize, color: theme['color-basic-500'] }}>
                    {item.escola}
                </Text>
                <Text style={{ fontSize: fontSize + 1 }}>Duração da magia: </Text>
                <Text style={{ fontSize, color: theme['color-basic-500'] }}>
                    {item.duracao}
                </Text>
                <Text style={{ fontSize: fontSize + 1 }}>Tempo de Conutração da magia </Text>
                <Text style={{ fontSize, color: theme['color-basic-500'] }}>
                    {item.tempo_de_conjuracao}
                </Text>
                <Text style={{ fontSize: fontSize + 1 }}>Componentes da magia: </Text>
                <Text style={{ fontSize, color: theme['color-basic-500'] }}>
                    {item.componentes.length > 1
                        ? item.componentes.join(', ')
                        : item.componentes.length === 1
                            ? item.componentes[0]
                            : ''
                    }
                </Text>
                <Text style={{ fontSize: fontSize + 1 }}>Alcance da magia: </Text>
                <Text style={{ fontSize, color: theme['color-basic-500'] }}>
                    {item.alcance}
                </Text>
                <Text style={{ fontSize: fontSize + 1 }}>Efeito: </Text>
                <Text style={{ fontSize, color: theme['color-basic-500'], textAlign: 'justify' }}>
                    {item.efeito}
                </Text>
            </>
        );
};