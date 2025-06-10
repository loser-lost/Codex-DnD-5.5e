import { ReactElement, memo } from 'react';
import { Drawer, DrawerGroup, DrawerItem, CheckBox, IconProps } from '@ui-kitten/components';

const SCHOOLS = ['Abjuração', 'Evocação', 'Ilusão', 'Transmutação', 'Necromancia', 'Encantamento', 'Adivinhação'];
const CLASSES = ['Mago', 'Feiticeiro', 'Clérigo', 'Guardião', 'Bardo', 'Druida', 'Bruxo',];
const RANGES = ['Pessoal', 'Toque', '3 metros', '4,5 metros', '9 metros', '18 metros', '27 metros', '36 metros', '45 metros', '90 metros', "1,5 km", "800 quilômetros", "Ilimitado", "Especial"];
const TIMES = ['Ação', 'Ação ou Ritual', 'Ação Bônus', '1 minuto ou Ritual', '10 minutos', '1 minuto', '1 hora', '8 horas', '24 horas', 'Ação Bônus, que você realiza imediatamente após acertar um alvo com uma arma Corpo a Corpo ou um Ataque Desarmado', 'Ação Bônus, que você realiza imediatamente após atingir uma criatura com uma arma'];
const CIRCLES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//'Concentração, até 1 minuto','Concentração, até 10 minutos','Concentração, até 1 hora','Concentração, até 2 horas','Concentração, até 6 rodadas','Concentração, até 8 horas'

interface DrawerFilterProps {
  selectCircle: string[];
  selectedClasses: string[];
  schoolsSelected: string[];
  selectedRange: string[];
  selectedTempo: string[];

  toggleCircle: (circle: string) => void;
  toggleClass: (cls: string) => void;
  toggleSchool: (school: string) => void;
  toggleRange: (range: string) => void;
  toggleTime: (time: string) => void;

  CirculoIcon: (props: IconProps) => ReactElement;
  ClassIcon: (props: IconProps) => ReactElement;
  SchoolIcon: (props: IconProps) => ReactElement;
  RangeIcon: (props: IconProps) => ReactElement;
  TempoIcon: (props: IconProps) => ReactElement;
}

const FilterGroup = ({
  title,
  items,
  selectedItems,
  toggleItem,
  Icon,
}: {
  title: string;
  items: string[];
  selectedItems: string[];
  toggleItem: (value: string) => void;
  Icon: (props: IconProps) => ReactElement;
}) => (
  <DrawerGroup
    title={`${title} (${selectedItems.length})`}
    accessoryLeft={Icon}
  >
    {items.map((item, idx) => (
      <DrawerItem
        key={idx}
        title={() => (
          <CheckBox checked={selectedItems.includes(item)} onChange={() => toggleItem(item)}>
            {item}
          </CheckBox>
        )}
      />
    ))}
  </DrawerGroup>
);

function DrawerFilter({
    selectCircle,
  selectedClasses,
  schoolsSelected,
  selectedRange,
  selectedTempo,
  toggleCircle,
  toggleClass,
  toggleSchool,
  toggleRange,
  toggleTime,
  CirculoIcon,
  ClassIcon,
  SchoolIcon,
  RangeIcon,
  TempoIcon,
}: DrawerFilterProps) {
  return (
    <Drawer>
      <FilterGroup
        title="Círculo"
        items={CIRCLES}
        selectedItems={selectCircle}
        toggleItem={toggleCircle}
        Icon={CirculoIcon}
      />
      <FilterGroup
        title="Classe"
        items={CLASSES}
        selectedItems={selectedClasses}
        toggleItem={toggleClass}
        Icon={ClassIcon}
      />
      <FilterGroup
        title="Escola"
        items={SCHOOLS}
        selectedItems={schoolsSelected}
        toggleItem={toggleSchool}
        Icon={SchoolIcon}
      />
      <FilterGroup
        title="Alcance"
        items={RANGES}
        selectedItems={selectedRange}
        toggleItem={toggleRange}
        Icon={RangeIcon}
      />
      <FilterGroup
        title="Tempo de Conjuração"
        items={TIMES}
        selectedItems={selectedTempo}
        toggleItem={toggleTime}
        Icon={TempoIcon}
      />
    </Drawer>
  );
}
export default memo(DrawerFilter);
