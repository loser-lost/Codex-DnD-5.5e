import { useMemo } from "react";

    const SCHOOLS = ['Abjuração', 'Evocação', 'Ilusão', 'Transmutação', 'Necromancia', 'Encantamento', 'Adivinhação'];
    const CLASSES = ['Mago', 'Feiticeiro', 'Clérigo', 'Guardião', 'Bardo', 'Druida', 'Bruxo','Paladino'];
    const RANGES = ['Pessoal', 'Toque', '3 metros', '4,5 metros', '9 metros', '18 metros', '27 metros', '36 metros', '45 metros', '90 metros', "1,5 km", "800 quilômetros", "Ilimitado", "Especial"];
    const TIMES = ['Ação', 'Ação ou Ritual', 'Ação Bônus', '1 minuto ou Ritual', '10 minutos', '1 minuto', '1 hora', '8 horas', '24 horas', 'Ação Bônus, que você realiza imediatamente após acertar um alvo com uma arma Corpo a Corpo ou um Ataque Desarmado', 'Ação Bônus, que você realiza imediatamente após atingir uma criatura com uma arma'];
    const CIRCLES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const races = ['Humano', 'Elfo', 'Anão', 'Orc', 'Assimar', 'Gnomo', 'Halfling', 'Golias', 'Tiferino', 'Draconato'];
    const classees = ['Mago', 'Feiticeiro', 'Clérigo', 'Ladino', 'Guardião', 'Bardo', 'Druida', 'Bruxo','Paladino'];
    const levels =  [1, 2, 3, 4 ,5 , 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    export{ races, classees, levels, SCHOOLS, CLASSES, RANGES, TIMES, CIRCLES};