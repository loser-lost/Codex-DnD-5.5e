
import { useTheme, Text} from "@ui-kitten/components";
import { Spell } from "../utils/groupMagic";

interface descriptionProps {
    item: Spell;
}

export default function DescriptionDescription({item}: descriptionProps) {
    const theme = useTheme();
        return(
            <>
                <Text category="h4">
                    {item.nome}
                </Text>
                <Text>Circulo de magia: </Text>
                <Text style={{ fontSize: 14, color: theme['color-basic-500'], marginTop: 2}}>
                    {item.circulo}
                </Text>
                <Text>Classe Da magia </Text>
                <Text style={{ fontSize: 14, color: theme['color-basic-500'] }}>
                    {item.classes}
                </Text>
                <Text>Escola da magia: </Text>
                <Text style={{ fontSize: 14, color: theme['color-basic-500'] }}>
                    {item.escola}
                </Text>
                <Text>Duração da magia: </Text>
                <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>
                    {item.duracao}
                </Text>
                <Text>Tempo de Conutração da magia </Text>
                <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>
                    {item.tempo_de_conjuracao}
                </Text>
                <Text>Componentes da magia: </Text>
                <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>
                    {item.componentes}
                </Text>
                <Text>Alcance da magia: </Text>
                <Text style={{ fontSize: 13, color: theme['color-basic-500'] }}>
                    {item.alcance}
                </Text>
                <Text>Efeito: </Text>
                <Text style={{ fontSize: 14, color: theme['color-basic-500'], textAlign: 'justify' }}>
                    {item.efeito}
                </Text>
            </>
        );
};