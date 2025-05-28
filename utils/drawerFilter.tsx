import react from 'react';
import { ReactElement } from 'react';
import {Drawer, DrawerGroup, DrawerItem, CheckBox, IconProps,  Layout, useTheme  } from '@ui-kitten/components';
import { RenderProp } from '@ui-kitten/components/devsupport';

const SCHOOLS = ['Abjuração', 'Evocação', 'Ilusão', 'Transmutação', 'Conjuração', 'Necromancia', 'Encantamento', 'Adivinhação'];
const CLASS = ['Mago', 'Feiticeiro', 'Clérigo', 'Guardião', 'Bardo', 'Druida', 'Bruxo'];
const RANGE = ['Pessoal', 'Toque', '3 metros', '4,5 metros', '9 metros', '18 metros', '27 metros', '36 metros', '45 metros', '90 metros', "1,5 km", "800 quilômetros", "Ilimitado", "Especial"];
const TEMPO = ['Ação', 'Ação ou Ritual', 'Ação Bônus', '1 minuto ou Ritual', '10 minutos', '1 minuto', '1 hora', '8 horas', '24 horas', 'Ação Bônus, que você realiza imediatamente após acertar um alvo com uma arma Corpo a Corpo ou um Ataque Desarmado', 'Ação Bônus, que você realiza imediatamente após atingir uma criatura com uma arma'];
const CIRCLES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

interface CircleDrawerGroupProps {
    selectCircle: string[];
    selectedClasses: string[];
    schoolsSelected: string[];
    selectedRange: string[];
    selectedTempo: string[];

    toggleCircle: (circle: string) => void;
    toggleClass: (classs: string) => void;
    toggleSchool: (scholl: string) => void;
    toggleRange: (range: string) => void;
    toggleTime: (time: string) => void;

    CirculoIcon: (props: IconProps) => ReactElement;
    ClassIcon: (props: IconProps) => ReactElement;
    SchoolIcon: (props: IconProps) => ReactElement;
    RangeIcon: (props: IconProps) => ReactElement;
    TempoIcon: (props: IconProps) => ReactElement;
  }

export default function DrawerFilter({ CirculoIcon, ClassIcon, SchoolIcon, RangeIcon, TempoIcon, toggleCircle, toggleClass, toggleSchool, toggleRange,toggleTime ,selectCircle, selectedClasses, schoolsSelected, selectedRange,selectedTempo}: CircleDrawerGroupProps){
    const theme =  useTheme();
    return (
        <Drawer>
            <DrawerGroup 
                title={`Círculo (${selectCircle.length})`}
                accessoryLeft={CirculoIcon}
                >
                    {CIRCLES.map((e, index) => (
                        <DrawerItem
                            key={index}
                            title={() => (
                                <CheckBox
                                checked={Array.isArray(selectCircle) && selectCircle.includes(e)}

                                    onChange={() => toggleCircle(e)}
                                >
                                    {e}
                                </CheckBox>
                            )}
                        />
                    ))}
            </DrawerGroup>
            <DrawerGroup 
                title={`Classe (${selectedClasses.length})`}
                accessoryLeft={ClassIcon}
                >
                    {CLASS.map((c, index) => (
                        <DrawerItem
                            key={index}
                            title={() => (
                                <CheckBox
                                    checked={Array.isArray(selectedClasses) && selectedClasses.includes(c)}
                                    onChange={() => toggleClass(c)}
                                >
                                    {c}
                                </CheckBox>
                            )}
                        />
                    ))}
            </DrawerGroup>
                <DrawerGroup 
                title={`Escola (${schoolsSelected.length})`}
                accessoryLeft={SchoolIcon}
                >
                    {SCHOOLS.map((e, index) => (
                        <DrawerItem
                            key={index}
                            title={() => (
                                <CheckBox
                                    checked={Array.isArray(schoolsSelected) && schoolsSelected.includes(e)}
                                    onChange={() => toggleSchool(e)}
                                >
                                    {e}
                                </CheckBox>
                            )}
                        />
                    ))}
            </DrawerGroup>
                <DrawerGroup 
                title={`Alcance (${selectedRange.length})`}
                accessoryLeft={RangeIcon}
                >
                    {RANGE.map((e, index) => (
                        <DrawerItem
                            key={index}
                            title={() => (
                                <CheckBox
                                    checked={Array.isArray(selectedRange) && selectedRange.includes(e)}
                                    onChange={() => toggleRange(e)}
                                >
                                    {e}
                                </CheckBox>
                            )}
                        />
                    ))}
            </DrawerGroup>
                <DrawerGroup 
                title={`Tempo de Conjuração (${selectedTempo.length})`}
                accessoryLeft={TempoIcon}
                >
                    {TEMPO.map((e, index) => (
                        <DrawerItem
                            key={index}
                            title={() => (
                                <CheckBox
                                    checked={Array.isArray(selectedTempo) && selectedTempo.includes(e)}
                                    onChange={() => toggleTime(e)}
                                >
                                    {e}
                                </CheckBox>
                            )}
                        />
                    ))}
            </DrawerGroup>
        </Drawer>
    );
}