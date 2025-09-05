import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Card, Layout } from "@ui-kitten/components";
import DrawerFilter from "@/components/comp/drawerFilterDb";
import { AppliFilterButton, ClearFiltersButton } from "./buttons";
import { CirculoIcon, ClassIcon } from "@/utils/useIcons";

interface Props {
  showFilter: boolean;
  onBackDrop: () => void;
  selectedCircle: string[];
  selectedClasses: string[];
  toggleCircle: (circle: string) => void;
  toggleClass: (classe: string) => void;
  allFilters: number;
  clearFilters: () => void;
  AppliFilter: () => void;
}

export function ModalFilter({
  showFilter,
  onBackDrop,
  selectedCircle,
  selectedClasses,
  toggleCircle,
  toggleClass,
  allFilters,
  clearFilters,
  AppliFilter
}: Props) {
  return (
    <Layout>
      <Modal
        visible={showFilter}
        backdropStyle={styles.backdrop}
        style={styles.filterModal}
        onBackdropPress={onBackDrop}
      >
        <Card disabled={true}>
          <DrawerFilter
            selectCircle={selectedCircle}
            selectedClasses={selectedClasses}
            toggleCircle={toggleCircle}
            toggleClass={toggleClass}
            CirculoIcon={CirculoIcon}
            ClassIcon={ClassIcon}
          />
          <Layout style={styles.buttons}>
            <AppliFilterButton applyFilter={AppliFilter} allFilters={allFilters} />
            <ClearFiltersButton clearFilters={clearFilters} />
          </Layout>
        </Card>
      </Modal>
    </Layout>
  );
}

const styles = StyleSheet.create({
  filterModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});