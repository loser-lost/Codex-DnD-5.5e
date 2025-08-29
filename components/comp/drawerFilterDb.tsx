import { ReactElement, memo } from 'react';
import { Drawer, DrawerGroup, DrawerItem, CheckBox, IconProps } from '@ui-kitten/components';
import { CIRCLES, CLASSES } from './sectionComponents';


interface DrawerFilterProps {
  selectCircle: string[];
  selectedClasses: string[];

  toggleCircle: (circle: string) => void;
  toggleClass: (cls: string) => void;
  
  CirculoIcon: (props: IconProps) => ReactElement;
  ClassIcon: (props: IconProps) => ReactElement;
}

const FilterGroup = ({title, items, selectedItems, toggleItem, Icon}: {
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

function DrawerFilter({selectCircle, selectedClasses, toggleCircle, toggleClass, CirculoIcon, ClassIcon,}: DrawerFilterProps) {
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
    </Drawer>
  );
}
export default memo(DrawerFilter);
