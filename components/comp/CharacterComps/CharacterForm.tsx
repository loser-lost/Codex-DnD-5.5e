import React, { useEffect, useState } from "react";
import { IndexPath, Input, Layout, Select, SelectItem, Button } from "@ui-kitten/components";
import { CharacterDatabase } from "@/assets/_database/useCharacterDatabase";
import { StyleSheet } from "react-native";
import { classees, levels, races } from "../arrays";

interface Props {
  character: CharacterDatabase;
  onClose: () => void;
  onSave: (updated: CharacterDatabase) => void;
}

export function CharacterForm({ character, onClose, onSave }: Props) {
  const [form, setForm] = useState<CharacterDatabase>(character);

  const [selectedRaceIndex, setSelectedRaceIndex] = useState<IndexPath | undefined>(undefined);
  const [selectedClassIndex, setSelectedClassIndex] = useState<IndexPath | undefined>(undefined);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState<IndexPath | undefined>(undefined);

  // 🔹 Inicializa selects com valores do personagem
  useEffect(() => {
    if (character.race) {
      const idx = races.indexOf(character.race);
      if (idx >= 0) setSelectedRaceIndex(new IndexPath(idx));
    }
    if (character.classe) {
      const idx = classees.indexOf(character.classe);
      if (idx >= 0) setSelectedClassIndex(new IndexPath(idx));
    }
    if (character.level) {
      const idx = levels.indexOf(character.level);
      if (idx >= 0) setSelectedLevelIndex(new IndexPath(idx));
    }
  }, [character]);

  const handleChange = (field: keyof CharacterDatabase, value: string | number) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    onSave(form);   
    onClose();
  };
 
  return (
    <Layout style={styles.container}>
      <Input
        style={styles.input}
        value={form.name}
        placeholder="Nome"
        onChangeText={text => handleChange("name", text)}
      />
      <Input
        style={styles.input}
        value={form.playerName}
        placeholder="Nome do Jogador"
        onChangeText={text => handleChange("playerName", text)}
      />
      <Select
        style={styles.input}
        value={selectedRaceIndex ? races[selectedRaceIndex.row] : ""}
        selectedIndex={selectedRaceIndex}
        onSelect={index => {
          const idx = index as IndexPath;
          setSelectedRaceIndex(idx);
          handleChange("race", races[idx.row]);
        }}
        placeholder="Raça"
      >
        {races.map((r, i) => (
          <SelectItem key={i} title={r} />
        ))}
      </Select>
      <Select
        style={styles.input}
        value={selectedClassIndex ? classees[selectedClassIndex.row] : ""}
        selectedIndex={selectedClassIndex}
        onSelect={index => {
          const idx = index as IndexPath;
          setSelectedClassIndex(idx);
          handleChange("classe", classees[idx.row]);
        }}
        placeholder="Classe"
      >
        {classees.map((c, i) => (
          <SelectItem key={i} title={c} />
        ))}
      </Select>
      <Select
        style={styles.input}
        value={selectedLevelIndex ? levels[selectedLevelIndex.row].toString() : ""}
        selectedIndex={selectedLevelIndex}
        onSelect={index => {
          const idx = index as IndexPath;
          setSelectedLevelIndex(idx);
          handleChange("level", levels[idx.row]);
        }}
        placeholder="Nível"
      >
        {levels.map((lvl, i) => (
          <SelectItem key={i} title={lvl.toString()} />
        ))}
      </Select>
       <Layout style={styles.actions}>
        <Button style={styles.botton} onPress={handleSubmit}>
          Salvar
        </Button>
        <Button style={styles.botton} onPress={onClose}>
          Cancelar
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    margin: 2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  botton: {
    flex: 1,
    margin: 5,
  },
});