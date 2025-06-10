
import { useTheme, Text, Layout } from "@ui-kitten/components";
import { Spell } from "../../utils/groupMagic";
import { TitleText } from "@/components/StyledText";
import { Fragment } from "react";

interface descriptionProps {
    item: Spell;
    fontSize: number;
}

export default function Description({ item, fontSize }: descriptionProps) {
    const theme = useTheme();

    const pontuationClass = (item: Spell) => {
        return(
            <>
            {item.classes.length > 1
                        ? item.classes.join(', ')
                        : item.classes.length === 1
                            ? item.classes[0]
                            : ''
            }.
            </>
        )
    };

    const pontuationComponent = (item: Spell) => {
        return(
            <>
            {item.componentes.length > 1
                    ? item.componentes.join(', ')
                    : item.componentes.length === 1
                        ? item.componentes[0]
                        : ''
            }.
            </>
        )
    };
    return (
        <Fragment>
            <TitleText type='h2' color="primary">
                {item.nome}
            </TitleText>
            <Layout style={{ marginTop: 20, flexDirection: 'row' }}>
                <Text style={{ fontSize: fontSize + 1 }}>Circulo de magia: </Text>
                <Text style={{ fontSize, color: theme['color-basic-400'], marginTop: 2 }}>
                    {item.circulo}
                </Text>
            </Layout>
            <Layout style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: fontSize + 1 }}>Classes: </Text>
                <Text style={{ fontSize, color: theme['color-basic-400'] }}>
                    {pontuationClass(item)}
                </Text>
            </Layout>
            <Layout style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: fontSize + 1 }}>Escola: </Text>
                <Text style={{ fontSize, color: theme['color-basic-400'] }}>
                    {item.escola}.
                </Text>
            </Layout>
            <Layout style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: fontSize + 1 }}>Duração: </Text>
                <Text style={{ fontSize, color: theme['color-basic-400'] }}>
                    {item.duracao}.
                </Text>
            </Layout>
            <Layout style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: fontSize + 1 }}>Tempo de Conjuração: </Text>
                <Text style={{ fontSize, color: theme['color-basic-400'] }}>
                    {item.tempo_de_conjuracao}.
                </Text>
            </Layout>
            <Layout style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: fontSize + 1 }}>Componentes: </Text>
                <Text style={{ fontSize, color: theme['color-basic-400'] }}>
                    {pontuationComponent(item)}
                </Text>
            </Layout>
            <Layout style={{ flexDirection: 'row' }}>
                <Text style={{ fontSize: fontSize + 1 }}>Alcance: </Text>
                <Text style={{ fontSize, color: theme['color-basic-400'] }}>
                    {item.alcance}.
                </Text>

            </Layout>
            <Text style={{ fontSize: fontSize + 1 }}>Efeito: </Text>
            <Text style={{ fontSize, color: theme['color-basic-400'], textAlign: 'justify' }}>
                {item.efeito.split("O dano aumenta")[0]}
            </Text>
            {item.efeito.split("O dano aumenta")[1]?.length > 0 && (
                <Text style={{ fontSize, color: theme['color-basic-400'], textAlign: 'justify' }}>
                    O dano aumenta {item.efeito.split("O dano aumenta")[1]}
                </Text>
            )}
        </Fragment>
    );
};