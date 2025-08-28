import { type SQLiteDatabase } from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

// nome da database
const DB_NAME = "codexDnd.db";
// Modo dev?
const RESET_DATABASE_ON_START = true;

// entrada do seed para spells
const spellsData = [
    {
        "magia_id": "1",
        "nome": "Acalmar Emoções",
        "circulo": "2",
        "escola": "Encantamento",
        "classes": ["Bardo", "Clérigo"],
        "tempo_de_conjuracao": "Ação",
        "alcance": "18 metros",
        "componentes": ["V", "S"],
        "duracao": "Concentração, até 1 minuto",
        "efeito": "Cada Humanoide em uma Esfera de 6 metros de raio centrada em um ponto à sua escolha no alcance da magia deve ser bem-sucedido em uma salvaguarda de Carisma ou é afetado por um dos seguintes efeitos (escolha um para cada criatura): A criatura tem Imunidade às condições Amedrontado e Enfeitiçado até que a magia termine. Se a criatura já estiver Amedrontada ou Enfeitiçada, essas condições são suprimidas pela duração da magia. A criatura se torna Indiferente às criaturas à sua escolha em relação às quais é Hostil. Essa indiferença encerra se o alvo sofrer dano ou testemunhar os aliados dela sofrendo dano. Quando a magia termina, a atitude da criatura volta ao normal."
    },
    {
        "magia_id": "2",
        "nome": "Acudir os Moribundos",
        "circulo": "0",
        "escola": "Necromancia",
        "classes": ["Clérigo", "Druida"],
        "tempo_de_conjuracao": "Ação",
        "alcance": "4,5 metros",
        "componentes": ["V", "S"],
        "duracao": "Instantânea",
        "efeito": "Escolha uma criatura no alcance da magia que tenha 0 Pontos de Vida e não esteja morta. A criatura fica Estável. Aprimoramento de Truque: O alcance da magia dobra quando você atinge os níveis 5 (9 metros), 11 (18 metros) e 17 (36 metros)."
    },
     {
    "magia_id": "3",
    "nome": "Alarme",
    "circulo": "1",
    "escola": "Abjuração",
    "classes": ["Guardião", "Mago"],
    "tempo_de_conjuracao": "1 minuto ou Ritual",
    "alcance": "9 metros",
    "componentes": ["V", "S", "M","(um sino e um fio de prata)"],
    "duracao": "8 horas",
    "efeito": "Você define um alarme contra intrusão. Escolha uma porta, uma janela ou uma área no alcance da magia que não seja maior do que um Cubo de 6 metros de lados. Até que a magia termine, um alarme o avisa sempre que uma criatura tocar ou entrar na área protegida. Ao conjurar a magia, você pode designar criaturas que não disparam o alarme. Você também escolhe se o alarme é audível ou mental: Alarme Mental. Você é alertado por um bipe mental se estiver a menos de 1,5 quilômetro da área protegida. Este bipe o acorda se você estiver dormindo. Alarme Sonoro. O alarme produz o som de uma sineta por 10 segundos a até 18 metros da área protegida."
  },
  {
    "magia_id": "4",
    "nome": "Aliado Extraplanar",
    "circulo": "6",
    "escola": "Invocação",
    "classes": ["Clérigo"],
    "tempo_de_conjuracao": "10 minutos",
    "alcance": "18 metros",
    "componentes": ["V", "S"],
    "duracao": "Instantânea",
    "efeito": "Você implora pela ajuda de uma entidade sobrenatural. Você deve conhecer o ser: um deus, um príncipe demônio ou algum outro ser de poder cósmico. Essa entidade envia um Celestial, um Elemental ou um Ínfero leal a ela para ajudá-lo, fazendo com que a criatura apareça em um espaço desocupado no alcance da magia. Se você souber o nome de uma criatura específica, você pode proferir esse nome quando conjurar a magia para solicitar essa criatura, embora você possa obter uma criatura diferente de qualquer modo (à escolha do Mestre). Quando a criatura aparece, ela não é obrigada a comportar-se de uma maneira específica. Você pode pedir que ela realize um serviço em troca de pagamento, mas ela não é obrigada a fazê-lo. A tarefa solicitada pode variar de simples (nos levar voando através do abismo ou nos ajudar a lutar em uma batalha) a complexa (espionar nossos inimigos ou nos proteger durante nossa incursão na masmorra). Você deve ser capaz de se comunicar com a criatura para negociar pelos serviços dela. O pagamento pode assumir várias formas. Um Celestial pode exigir uma doação considerável de ouro ou itens mágicos para um templo aliado, enquanto um Ínfero pode exigir um sacrifício vivo ou um presente na forma de um tesouro. Algumas criaturas podem trocar o serviço por uma missão realizada por você. Uma tarefa que pode ser medida em minutos requer um pagamento no valor de 100 PO por minuto. Uma tarefa medida em horas requer 1.000 PO por hora. Já uma tarefa medida em dias (até 10 dias) requer 10.000PO por dia. O Mestre pode ajustar esses pagamentos com base nas circunstâncias em que você conjurou a magia. Se a tarefa estiver alinhada com os interesses da criatura, o pagamento pode ser reduzido pela metade ou até mesmo dispensado. Tarefas não perigosas normalmente exigem apenas metade do pagamento sugerido, enquanto tarefas especialmente perigosas podem demandar um pagamento maior. Criaturas raramente aceitam tarefas que parecem suicidas. Depois que a criatura conclui a tarefa, ou quando a duração combinada do serviço acaba, a criatura retorna ao seu plano de origem após se reportar a você, se possível. Se você não conseguir chegar a um acordo sobre um preço pelo serviço da criatura, a criatura retorna imediatamente ao seu plano de origem."
  },
  {
    "magia_id": "5",
    "nome": "Aljava Veloz",
    "circulo": "5",
    "escola": "Transmutação",
    "classes": ["Guardião"],
    "tempo_de_conjuracao": "Ação Bônus",
    "alcance": "Pessoal",
    "componentes": ["V", "S", "M","(uma Aljava no valor de 1 ou mais PO)"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Ao conjurar a magia e como uma Ação Bônus até que ela termine, você pode realizar dois ataques com uma arma que dispara Flechas ou Virotes, como um Arco Longo ou uma Besta Leve. A magia gera magicament a munição necessária para cada ataque. Cada Flecha ou Virote criado pela magia causa dano equivalente ao de munição não mágica do seu tipo e se desintegra imediatamente após atingir ou errar o alvo."
  },
  {
    "magia_id": "6",
    "nome": "Alterar-se",
    "circulo": "2",
    "escola": "Transmutação",
    "classes": ["Feiticeiro", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Pessoal",
    "componentes": ["V", "S"],
    "duracao": "Concentração, até 1 hora",
    "efeito": "Você altera sua forma física. Escolha uma das seguintes opções. Seus efeitos permanecem pela duração da magia, durante a qual você pode executar uma ação Usar Magia para substituir a opção escolhida por uma diferente. Adaptação Aquática. Você cria guelras e membranas entre os dedos. Você pode respirar debaixo d’água e recebe um Deslocamento de Natação igual ao seu Deslocamento. Armas Naturais. Você cria garras (Cortante), presas (Perfurante), chifres (Perfurante) ou cascos (Contundente). Ao usar seu Ataque Desarmado para causar dano com essa nova forma, ele causa 1d6 pontos de dano do tipo entre parênteses em vez de causar o dano normal para seu Ataque Desarmado, e você usa seu modificador de atributo de conjuração para as jogadas de ataque e dano em vez de usar Força. Mudar Aparência. Você altera sua aparência. Você decide sua aparência, incluindo altura, peso, traços faciais, som da voz, comprimento e cor do cabelo, entre outras características distintivas. Você pode parecer um membro de outra espécie, embora nenhuma de suas estatísticas mude. Você não pode parecer como uma criatura de um tamanho diferente, e sua forma básica permanece a mesma; se você é bípede, não pode usar essa magia para se tornar quadrúpede, por exemplo. Pela duração da magia, você pode executar uma ação Usar Magia para mudar sua aparência dessa maneira novamente."
  },
  {
    "magia_id": "7",
    "nome": "Amigos",
    "circulo": "0",
    "escola": "Encantamento",
    "classes": ["Bardo", "Bruxo", "Feiticeiro", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "3 metros",
    "componentes": ["S", "M","(um pouco de maquiagem)"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Você emana magicamente um sentimento de amizade em relação a uma criatura à sua vista e no alcance da magia. O alvo deve ser bem-sucedido em uma salvaguarda de Sabedoria ou tem a condição Enfeitiçado pela duração da magia. O alvo é bem-sucedido automaticamente se não for um Humanoide, se você estiver lutando contra ele ou se tiver conjurado esta magia nele nas últimas 24 horas. A magia encerra se o alvo sofrer dano ou se você realizar uma jogada de ataque, causar dano ou forçar alguém a realizar uma salvaguarda. Quando a magia termina, o alvo sabe que foi Enfeitiçado por você."
  },
  {
    "magia_id": "8",
    "nome": "Amizade Animal",
    "circulo": "1",
    "escola": "Encantamento",
    "classes": ["Bardo", "Druida", "Guardião"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "9 metros",
    "componentes": ["V", "S", "M","(um bocado de comida)"],
    "duracao": "24 horas",
    "efeito": "Escolha como alvo uma Fera à sua vista e no alcance da magia. O alvo deve ser bem-sucedido em uma salvaguarda de Sabedoria ou tem a condição Enfeitiçado pela duração da magia. Se você ou um de seus aliados causar dano ao alvo, a magia encerra. Usando um Espaço de Magia de Círculo Superior. Você pode escolher uma criatura adicional para cada círculo de espaço de magia acima de 1."
  },
  {
    "magia_id": "9",
    "nome": "Âncora Planar",
    "circulo": "5",
    "escola": "Abjuração",
    "classes": ["Bardo", "Bruxo", "Clérigo", "Druida", "Mago"],
    "tempo_de_conjuracao": "1 hora",
    "alcance": "18 metros",
    "componentes": ["V", "S", "M","(uma joia no valor de 1.000 ou mais PO, que a magia consome)"],
    "duracao": "24 horas",
    "efeito": "Você tenta vincular um Celestial, um Elemental, um Feérico ou um Ínfero ao seu serviço. A criatura deve estar no alcance da magia durante todo o período de conjuração. Normalmente, a criatura é primeiro invocada para o centro da versão invertida da magia Círculo Mágico para prendê-la enquanto esta magia é conjurada. Ao concluir a conjuração, o alvo deve ser bem-sucedido em uma salvaguarda de Carisma ou é obrigado a atendê- -lo pela duração da magia. Se a criatura foi invocada ou criada por outra magia, a duração daquela magia é estendida para corresponder à duração desta magia. Uma criatura vinculada deve obedecer aos seus comandos da melhor forma possível. Você pode ordenar que a criatura o acompanhe em uma aventura, proteja um local ou entregue uma mensagem. Se a criatura for Hostil, ela se esforça para distorcer seus comandos para atingir seus próprios objetivos. Se a criatura realizar completamente seus comandos antes que a magia termine, ela viaja até você para relatar esse fato se você estiver no mesmo plano de existência. Se você estiver em um plano diferente, ele retorna ao lugar onde você a vinculou e permanece lá até que a magia termine. Usando um Espaço de Magia de Círculo Superior. A duração aumenta com um espaço de magia 6º círculo (10 dias), 7º círculo (30 dias), 8º círculo (180 dias) e 9º círculo (366 dias)."
  },
  {
    "magia_id": "10",
    "nome": "Animar Mortos",
    "circulo": "3",
    "escola": "Necromancia",
    "classes": ["Clérigo", "Mago"],
    "tempo_de_conjuracao": "1 minuto",
    "alcance": "3 metros",
    "componentes": ["V", "S", "M", "uma gota de sangue", "um pedaço de carne", "uma pitada de pó de osso"],
    "duracao": "Instantânea",
    "efeito": "Escolha uma pilha de ossos ou um cadáver de um Humanoide Médio ou Pequeno no alcance da magia. O alvo se torna um Morto-vivo: um Esqueleto se tiver escolhido ossos ou um Zumbi se tiver escolhido um cadáver. Em cada um dos seus turnos, você pode executar uma Ação Bônus para comandar mentalmente qualquer criatura que tenha animado com essa magia se a criatura estiver a até 18 metros de você. A criatura fica sob seu controle por 24 horas, após as quais ela deixa de obedecer a qualquer comando que você tenha dado a ela. Para manter o controle da criatura por mais 24 horas, é necessário conjurar essa magia na criatura novamente antes que o período atual de 24 horas termine. Usando um Espaço de Magia de Círculo Superior, você anima ou reafirma o controle sobre duas criaturas Mortas-vivas adicionais para cada círculo de espaço de magia acima de 3. Cada uma das criaturas deve vir de um cadáver ou pilha de ossos diferente."
  },
  {
    "magia_id": "11",
    "nome": "Animar Objetos",
    "circulo": "5",
    "escola": "Transmutação",
    "classes": ["Bardo", "Feiticeiro", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "36 metros",
    "componentes": ["V", "S"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Objetos são animados ao seu comando. Escolha uma série de objetos não mágicos no alcance da magia que não estejam sendo usados ou carregados, não estejam fixados a uma superfície e não sejam Colossais. O número máximo de objetos é igual ao seu modificador de atributo de conjuração. Cada alvo se anima, faz brotar pernas e se torna um Constructo que usa o bloco de estatísticas do Objeto Animado. Cada criatura que você anima com esta magia é uma aliada sua e de seus aliados. Em combate, ela compartilha a contagem de Iniciativa com você e tem o turno dela imediatamente após o seu. Até que a magia encerre, você pode executar uma Ação Bônus para comandar mentalmente qualquer criatura que tenha animado com essa magia se a criatura estiver a até 150 metros de você. Quando a criatura é reduzida a 0 Pontos de Vida, ela reverte para sua forma de objeto. Usando um Espaço de Magia de Círculo Superior, o dano de Pancada da criatura aumenta em 1d4 (Médio ou menor), 1d6 (Grande) ou 1d12 (Enorme) para cada círculo de espaço de magia acima de 5. Objetos Animados Construto Grande ou Menor, Sem Alinhamento CA 15 PV 10 (Médio ou menor), 20 (Grande), 40 (Enorme) Deslocamento 9 m MOD SG MOD SG MOD SG For 16 +3 +3 Des 10 +0 +0 Con 10 +0 +0 Int 3 –4 –4 Sab 3 –4 –4 Car 1 –5 –5 Imunidades Psíquico, Venenoso; Amedrontado, Enfeitiçado, Envenenado, Exaustão, Paralisado Sentidos Visão às Cegas 9 m, Percepção Passiva 6 Idiomas Compreende os idiomas que você conhece ND Nenhum (XP 0; BP é igual ao seu Bônus de Proficiência) Ações Pancada. Jogada de Ataque Corpo a Corpo: Bônus igual ao seu modificador de ataque mágico, alcance 1,5 m. Dano: Energético igual a 1d4 + 3 (Médio ou menor), 2d6 + 3 + seu modificador de atributo de conjuração (Grande) ou 2d12 + 3 + seu modificador de atributo de conjuração (Enorme)."
  },
  {
    "magia_id": "12",
    "nome": "Antipatia/Simpatia",
    "circulo": "8",
    "escola": "Encantamento",
    "classes": ["Bardo", "Druida", "Mago"],
    "tempo_de_conjuracao": "1 hora",
    "alcance": "18 metros",
    "componentes": ["V", "S", "M","(uma mistura de vinagre e mel)"],
    "duracao": "10 dias",
    "efeito": "Ao conjurar a magia, decida se ela cria antipatia ou simpatia, e escolha como alvo uma criatura ou objeto que seja Enorme ou menor. Em seguida, especifique um tipo de criatura, como dragões vermelhos, goblins ou vampiros. Uma criatura do tipo escolhido realiza uma salvaguarda de Sabedoria quando estiver a até 36 metros do alvo. Sua escolha entre antipatia ou simpatia determina o que acontece com uma criatura ao falhar nessa salvaguarda: Antipatia: A criatura tem a condição Amedrontado. A criatura Amedrontada deve usar o movimento nos turnos dela para se afastar o máximo possível do alvo, movendo-se pela rota mais segura. Simpatia: A criatura tem a condição Enfeitiçado. A criatura Enfeitiçada deve usar o movimento nos turnos dela para chegar o mais próximo possível do alvo, movendo-se pela rota mais segura. Se a criatura estiver a até 1,5 metro do alvo, a criatura não pode se afastar voluntariamente. Se o alvo causar dano à criatura Enfeitiçada, essa criatura deve realizar uma salvaguarda de Sabedoria para encerrar o efeito, conforme descrito abaixo. Encerrando o Efeito. Se a criatura Amedrontada ou Enfeitiçada terminar o turno a mais de 36 metros de distância do alvo, a criatura realiza uma salvaguarda de Sabedoria. Em caso de sucesso, a criatura não é mais afetada pelo alvo e fica imune a ele por 1 minuto, após o qual pode ser afetada novamente."
  },
  {
    "magia_id": "13",
    "nome": "Aprimorar Atributo",
    "circulo": "2",
    "escola": "Transmutação",
    "classes": ["Bardo", "Clérigo", "Druida", "Feiticeiro", "Guardião", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Toque",
    "componentes": ["V", "S", "M","(pelo ou uma pena)"],
    "duracao": "Concentração, até 1 hora",
    "efeito": "Você toca uma criatura e escolhe Força, Destreza, Inteligência, Sabedoria ou Carisma. Pela duração da magia, o alvo tem Vantagem nos testes de atributo usando o atributo escolhido. Usando um Espaço de Magia de Círculo Superior. Você pode escolher uma criatura adicional para cada círculo de espaço de magia acima de 2. Você pode escolher um atributo diferente para cada alvo."
  },
  {
    "magia_id": "14",
    "nome": "Aprisionamento",
    "circulo": "9",
    "escola": "Abjuração",
    "classes": ["Bruxo", "Mago"],
    "tempo_de_conjuracao": "1 minuto",
    "alcance": "9 metros",
    "componentes": ["V", "S", "M","(uma estatueta do alvo no valor de 5.000 ou mais PO)"],
    "duracao": "Até ser dissipada",
    "efeito": "Você cria uma restrição mágica para conter uma criatura à sua vista e no alcance da magia. O alvo deve realizar uma salvaguarda de Sabedoria. Em caso de sucesso, o alvo não é afetado e fica imune a esta magia pelas próximas 24 horas. Se falhar, o alvo é aprisionado. Enquanto estiver aprisionado, o alvo não precisa respirar, comer ou beber e não envelhece. Magias de Adivinhação não podem localizar ou perceber o alvo, e ele não pode se teleportar. Até que a magia termine, o alvo também é afetado por um dos seguintes efeitos à sua escolha: Acorrentar. Correntes firmemente enraizadas ao chão prendem o alvo no lugar. O alvo tem a condição Contido e não pode ser movido de forma alguma. Contenção Reduzida. O alvo encolhe para 2,5 cm de altura e fica preso dentro de uma pedra preciosa indestrutível ou um objeto semelhante. A luz pode passar pela pedra preciosa (permitindo que o alvo veja o que há fora e outras criaturas de fora possam vê-lo), mas nada mais pode passar por qualquer meio. Enterrar. O alvo é enterrado sob a terra em um globo oco de força mágica que é grande o suficiente para contê-lo. Nada pode passar para dentro ou para fora do globo. Prisão Cercada. O alvo está preso em um semiplano e está protegido contra teleporte e viagens planares. O semiplano pode ser um labirinto, uma gaiola, uma torre ou algo semelhante à sua escolha. Torpor. O alvo está Inconsciente e não pode ser despertado. Encerrando a Magia. Ao conjurar a magia, você define uma situação que a encerrará. Essa situação pode ser tão simples ou elaborada quanto você desejar, mas o Mestre deve concordar que existe uma grande probabilidade de isso ocorrer na próxima década. A situação deve ser uma ação observável, como alguém fazendo uma oferenda específica no templo do seu deus, salvando seu verdadeiro amor ou derrotando um monstro específico. Dissipar Magia só pode encerrar a magia se for conjurada com um espaço de magia de 9º círculo, tendo como alvo a prisão ou o componente usado para criá-la."
  },
  {
    "magia_id": "15",
    "nome": "Arca Secreta de Leomund",
    "circulo": "4",
    "escola": "Invocação",
    "classes": ["Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Toque",
    "componentes": ["V", "S", "M","(um baú de 1 m por 60 cm por 60 cm, construído com materiais raros no valor de 5.000 ou mais PO, e uma réplica minúscula do baú fabricada com os mesmos materiais no valor de 50 ou mais PO)"],
    "duracao": "Até ser dissipada",
    "efeito": "Você esconde um baú e todo o seu conteúdo no Plano Etéreo. Você deve tocar no baú e na réplica em miniatura que servem como componentes Materiais para a magia. O baú pode armazenar até 340 litros de material não vivo (1 m por 60 cm por 60 cm). Enquanto o baú permanecer no Plano Etéreo, você pode executar uma ação Usar Magia e tocar na réplica para recuperar o baú. Ele aparece em um espaço desocupado no chão a até 1,5 metro de você. Você pode enviar o baú de volta ao Plano Etéreo como uma ação Usar Magia para tocar o baú e a réplica. Após 60 dias, há uma chance cumulativa de 5% no final de cada dia de que a magia encerre. A magia também se encerra se você conjurá-la novamente ou se a réplica Minúscula for destruída. Se a magia encerrar e o baú maior estiver no Plano Etéreo, o baú permanece lá para você ou outra pessoa encontrar."
  },
  {
    "magia_id": "16",
    "nome": "Arma Elemental",
    "circulo": "3",
    "escola": "Transmutação",
    "classes": ["Druida", "Guardião", "Paladino"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Toque",
    "componentes": ["V", "S"],
    "duracao": "Concentração, até 1 hora",
    "efeito": "Uma arma não-mágica que você toca se torna uma arma mágica. Escolha um dos seguintes tipos de dano: Ácido, Elétrico, Gélido, Ígneo ou Trovejante. Pela duração da magia, a arma tem um bônus de +1 para jogadas de ataque e causa 1d4 pontos de dano adicional do tipo escolhido quando atinge. Usando um Espaço de Magia de Círculo Superior. Se você usar um espaço de magia de 5º ou 6º círculo, o bônus nas jogadas de ataque aumenta para +2, e o dano adicional aumenta para 2d4. Se você usar um espaço de magia de 7º círculo ou superior, o bônus aumenta para +3 e o dano adicional aumenta para 3d4."
  },
  {
    "magia_id": "17",
    "nome": "Arma Espiritual",
    "circulo": "2",
    "escola": "Evocação",
    "classes": ["Clérigo"],
    "tempo_de_conjuracao": "Ação Bônus",
    "alcance": "18 metros",
    "componentes": ["V", "S"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Você cria uma energia espectral flutuante que se assemelha a uma arma à sua escolha e permanece pela duração da magia. A energia aparece no alcance da magia em um espaço à sua escolha, e você pode realizar imediatamente um ataque mágico corpo a corpo contra uma criatura a até 1,5 metro dela. Em caso de acerto, o alvo sofre 1d8 pontos de dano Energético mais o seu modificador de atributo de conjuração. Como uma Ação Bônus em seus turnos posteriores, você pode mover a energia até 6 metros e repetir o ataque contra uma criatura a até 1,5 metro dela. Usando um Espaço de Magia de Círculo Superior. O dano aumenta em 1d8 para cada círculo de espaço de magia acima de 2."
  },
  {
    "magia_id": "18",
    "nome": "Arma Mágica",
    "circulo": "2",
    "escola": "Transmutação",
    "classes": ["Feiticeiro", "Guardião", "Mago", "Paladino"],
    "tempo_de_conjuracao": "Ação Bônus",
    "alcance": "Toque",
    "componentes": ["V", "S"],
    "duracao": "1 hora",
    "efeito": "Você toca uma arma não-mágica. Até que a magia encerre, essa arma se torna uma arma mágica com bônus de +1 para jogadas de ataque e dano. A magia encerra se você a conjurar novamente. Usando um Espaço de Magia de Círculo Superior. O bônus aumenta para +2 com um espaço de magia de 3º–5º círculo. O bônus aumenta para +3 com um espaço de magia de 6º círculo ou superior."
  },
  {
    "magia_id": "19",
    "nome": "Armadura Arcana",
    "circulo": "1",
    "escola": "Abjuração",
    "classes": ["Feiticeiro", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Toque",
    "componentes": ["V", "S", "M","(um pedaço de couro curtido)"],
    "duracao": "8 horas",
    "efeito": "Você toca uma criatura voluntária que não está usando armadura. Até que a magia termine, a CA base do alvo se torna 13 mais o modificador de Destreza dele. A magia se encerra se o alvo vestir uma armadura."
  },
  {
    "magia_id": "20",
    "nome": "Armadura de Agathys",
    "circulo": "1",
    "escola": "Abjuração",
    "classes": ["Bruxo"],
    "tempo_de_conjuracao": "Ação Bônus",
    "alcance": "Pessoal",
    "componentes": ["V", "S", "M","(um caco de vidro azul)"],
    "duracao": "1 hora",
    "efeito": "Um frio mágico protetor envolve você. Você recebe 5 Pontos de Vida Temporários. Se uma criatura acertar você com uma jogada de ataque corpo a corpo antes que a magia termine, a criatura sofre 5 pontos de dano Gélido. A magia encerra se você não tiver Pontos de Vida Temporários. Usando um Espaço de Magia de Círculo Superior. Os Pontos de Vida Temporários e o dano Gélido aumentam em 5 para cada círculo de espaço de magia acima de 1."
  },
  {
    "magia_id": "21",
    "nome": "Arrombar",
    "circulo": "2",
    "escola": "Transmutação",
    "classes": ["Bardo", "Feiticeiro", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "18 metros",
    "componentes": ["V"],
    "duracao": "Instantânea",
    "efeito": "Escolha um objeto à sua vista e no alcance da magia. O objeto pode ser uma porta, uma caixa, um baú, um conjunto de grilhões, um cadeado ou outro objeto que contenha um meio mundano ou mágico que impeça o acesso. Um alvo mantido fechado por uma fechadura mundana ou que está preso ou barrado fica destrancado, desemperrado ou desobstruído. Se o objeto tiver várias fechaduras, apenas uma delas é destrancada. Se o alvo for mantido fechado por Tranca Arcana, essa magia é suprimida por 10 minutos, durante os quais o alvo pode ser aberto e fechado. Ao conjurar a magia, um estrondo, audível a até 90 metros de distância, emana do alvo."
  },
  {
    "magia_id": "22",
    "nome": "Arte Druídica",
    "circulo": "0",
    "escola": "Transmutação",
    "classes": ["Druida"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "9 metros",
    "componentes": ["V", "S"],
    "duracao": "Instantânea",
    "efeito": "Sussurrando para os espíritos da natureza, você cria um dos seguintes efeitos no alcance da magia:\n\nBrincar com Fogo: Você acende ou apaga uma vela, uma tocha ou uma fogueira.\nEfeito Sensorial: Você cria um efeito sensorial inofensivo, como folhas caindo, fadas dançantes espectrais, uma brisa suave, o som de um animal ou o leve odor de gambá. O efeito deve caber em um Cubo de 1,5 metro de lados.\nFlorescimento: Você instantaneamente faz uma flor desabrochar, uma vagem se abrir ou um botão de folha se abrir.\nSensor Climático: Você cria um efeito sensorial minúsculo e inofensivo que prevê qual será o clima no local onde você está pelas próximas 24 horas. O efeito pode se manifestar como uma esfera dourada para céu claro, uma nuvem para chuva, flocos de neve caindo para neve e assim por diante. Esse efeito persiste por 1 rodada."
  },
  {
    "magia_id": "23",
    "nome": "Assassino Fantasmagórico",
    "circulo": "4",
    "escola": "Ilusão",
    "classes": ["Bardo", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "36 metros",
    "componentes": ["V", "S"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Você entra nos pesadelos de uma criatura à sua vista e no alcance da magia e cria uma ilusão dos medos mais profundos dela, visíveis apenas para essa criatura. O alvo realiza uma salvaguarda de Sabedoria. Se falhar, o alvo sofre 4d10 pontos de dano Psíquico e tem Desvantagem em testes de atributo e jogadas de ataque pela duração da magia. Em caso de sucesso, o alvo sofre metade do dano e a magia encerra.\nPela duração da magia, o alvo realiza uma salvaguarda de Sabedoria no final de cada um dos turnos dele. Se falhar, sofre dano Psíquico novamente. Em caso de sucesso, a magia encerra.\nUsando um Espaço de Magia de Círculo Superior. O dano aumenta em 1d10 para cada círculo de espaço de magia acima de 4."
  },
  {
    "magia_id": "24",
    "nome": "Augúrio",
    "circulo": "2",
    "escola": "Adivinhação",
    "classes": ["Clérigo", "Druida", "Mago"],
    "tempo_de_conjuracao": "1 minuto ou Ritual",
    "alcance": "Pessoal",
    "componentes": ["V", "S", "M","(varetas, ossos, cartas ou símbolos semelhantes especialmente marcados no valor de 25 ou mais PO)"],
    "duracao": "Instantânea",
    "efeito": "Você recebe um presságio de uma entidade sobrenatural a respeito dos resultados de um curso de ação que você planeja realizar nos próximos 30 minutos. O Mestre escolhe o presságio da tabela Presságios.\n\nPresságios:\nProsperidade: Bons\nInfortúnio: Maus\nProsperidade e Infortúnio: Bons e ruins\nNada: Nem bons, nem ruins\n\nA magia não leva em conta circunstâncias, como outras magias, que podem alterar os resultados.\nSe você conjurar a magia mais de uma vez antes de terminar um Descanso Longo, há uma chance cumulativa de 25% para cada conjuração após a primeira de que você não receba resposta."
  },
  {
    "magia_id": "25",
    "nome": "Aumentar/Reduzir",
    "circulo": "2",
    "escola": "Transmutação",
    "classes": ["Bardo", "Druida", "Feiticeiro", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "9 metros",
    "componentes": ["V", "S", "M","(uma pitada de ferro em pó)"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Pela duração da magia, você amplia ou reduz uma criatura, ou objeto, à sua vista e no alcance da magia (veja o efeito escolhido abaixo). Um objeto à vista não deve ser usado nem transportado. Se o alvo for uma criatura involuntária, ele pode realizar uma salvaguarda de Constituição. Em caso de sucesso, a magia não surte efeito.\nTudo o que uma criatura estiver usando e carregando muda de tamanho com ela. Qualquer item que cair retorna ao tamanho normal de uma só vez. Uma arma ou munição arremessada retorna ao tamanho normal imediatamente após atingir ou errar um alvo.\nAumentar: O tamanho do alvo aumenta em uma categoria — de Médio para Grande, por exemplo. O alvo também tem Vantagem em testes de Força e salvaguardas de Força. Os ataques do alvo com suas armas ampliadas ou Ataques Desarmados causam 1d4 pontos de dano adicionais em caso de acerto.\nReduzir: O tamanho do alvo diminui em uma categoria — de Médio para Pequeno, por exemplo. O alvo também tem Desvantagem em testes de Força e salvaguardas de Força. Os ataques do alvo com suas armas reduzidas ou Ataques Desarmados causam 1d4 pontos de dano a menos em caso de acerto (isso não pode reduzir o dano abaixo de 1)."
  },
  {
    "magia_id": "26",
    "nome": "Aura de Pureza",
    "circulo": "4",
    "escola": "Abjuração",
    "classes": ["Clérigo", "Paladino"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Pessoal",
    "componentes": ["V"],
    "duracao": "Concentração, até 10 minutos",
    "efeito": "Uma aura irradia de você em uma Emanação de 9 metros pela duração da magia. Enquanto estiver na aura, você e seus aliados têm Resistência a dano Venenoso e Vantagem nas salvaguardas para evitar ou encerrar efeitos que incluem a condição Amedrontado, Atordoado, Cego, Enfeitiçado, Envenenado, Paralisado ou Surdo."
  },
  {
    "magia_id": "27",
    "nome": "Aura de Vida",
    "circulo": "4",
    "escola": "Abjuração",
    "classes": ["Clérigo", "Paladino"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Pessoal",
    "componentes": ["V"],
    "duracao": "Concentração, até 10 minutos",
    "efeito": "Uma aura irradia de você em uma Emanação de 9 metros pela duração da magia. Enquanto estiver na aura, você e seus aliados têm Resistência a Dano Necrótico, e seus Pontos de Vida máximos não podem ser reduzidos. Se um aliado com 0 Pontos de Vida começar o turno na aura, esse aliado recupera 1 Ponto de Vida."
  },
  {
    "magia_id": "28",
    "nome": "Aura de Vitalidade",
    "circulo": "3",
    "escola": "Abjuração",
    "classes": ["Clérigo", "Druida", "Paladino"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Pessoal",
    "componentes": ["V"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Uma aura irradia de você em uma Emanação de 9 metros pela duração da magia. Quando você cria a aura e no início de cada um dos seus turnos enquanto ela persiste, você pode restaurar 2d6 Pontos de Vida em uma criatura dentro dela."
  },
  {
    "magia_id": "29",
    "nome": "Aura Mágica de Nystul",
    "circulo": "2",
    "escola": "Ilusão",
    "classes": ["Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Toque",
    "componentes": ["V", "S", "M","(um pequeno quadrado de seda)"],
    "duracao": "24 horas",
    "efeito": "Com um toque, você coloca uma ilusão em uma criatura voluntária ou em um objeto que não esteja sendo usado ou carregado. Uma criatura adquire o efeito Máscara descrito abaixo, e um objeto adquire o efeito Falsa Aura descrito abaixo. O efeito permanece pela duração da magia. Se você conjurar a magia na mesma criatura ou objeto todos os dias por 30 dias, a ilusão dura até ser dissipada."
  },
  {
    "magia_id": "30",
    "nome": "Aura Sagrada",
    "circulo": "8",
    "escola": "Abjuração",
    "classes": ["Clérigo"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Pessoal",
    "componentes": ["V", "S", "M","(um relicário no valor de 1.000 ou mais PO)"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Pela duração, você emite uma aura em uma Emanação de 9 metros. Enquanto estão dentro da aura, criaturas à sua escolha têm Vantagem em todas as salvaguardas, enquanto as outras têm Desvantagem nas jogadas de ataque contra elas. Além disso, se um Ínfero ou um Morto-Vivo atinge uma criatura afetada em uma jogada de ataque corpo a corpo, o atacante deve ser bem-sucedido em uma salvaguarda de Constituição ou fica Cego até o final do próximo turno dele."
  },
  {
    "magia_id": "31",
    "nome": "Auxílio",
    "circulo": "2",
    "escola": "Abjuração",
    "classes": ["Bardo", "Clérigo", "Druida", "Guardião", "Paladino"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "9 metros",
    "componentes": ["V", "S", "M","(uma tira de pano branco)"],
    "duracao": "8 horas",
    "efeito": "Escolha até três criaturas no alcance da magia. Os Pontos de Vida máximos e os Pontos de Vida atuais de cada alvo aumentam em 5 pela duração da magia. Usando um Espaço de Magia de Círculo Superior. Os Pontos de Vida de cada alvo aumentam em 5 para cada círculo de espaço de magia acima de 2."
  },
  {
    "magia_id": "32",
    "nome": "Badalar Fúnebre",
    "circulo": "0",
    "escola": "Necromancia",
    "classes": ["Clérigo", "Bruxo", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "18 metros",
    "componentes": ["V", "S"],
    "duracao": "Instantânea",
    "efeito": "Você aponta para uma criatura à sua vista e no alcance da magia, então um único toque de um badalar doloroso é audível a até 3 metros do alvo. O alvo deve ser bem-sucedido em uma salvaguarda de Sabedoria ou sofre 1d8 pontos de dano Necrótico. Caso o alvo tenha perdido algum de seus Pontos de Vida, em vez de 1d8, ele sofre 1d12 pontos de dano Necrótico. O dano aumenta em um dado quando você atinge os níveis 5 (2d8 ou 2d12), 11 (3d8 ou 3d12) e 17 (4d8 ou 4d12)."
  },
  {
    "magia_id": "33",
    "nome": "Banimento",
    "circulo": "4",
    "escola": "Abjuração",
    "classes": ["Bruxo", "Clérigo", "Feiticeiro", "Mago", "Paladino"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "9 metros",
    "componentes": ["V", "S", "M","(um pentagrama)"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Uma criatura à sua vista e no alcance da magia deve ser bem-sucedida em uma salvaguarda de Carisma ou é transportada para um semiplano inofensivo pela duração da magia. Enquanto estiver lá, o alvo tem a condição Incapacitado. Quando a magia encerra, o alvo reaparece no espaço que deixou ou no espaço desocupado mais próximo, se o primeiro espaço estiver ocupado. Se o alvo for uma Aberração, Celestial, Elemental, Feérico ou Ínfero, o alvo não retorna se a magia durar 1 minuto. Em vez disso, o alvo é transportado para um local aleatório em um plano (à escolha do Mestre) associado ao tipo da criatura. Usando um Espaço de Magia de Círculo Superior. Você pode escolher uma criatura adicional para cada círculo de espaço de magia acima de 4."
  },
  {
    "magia_id": "34",
    "nome": "Banquete de Heróis",
    "circulo": "6",
    "escola": "Invocação",
    "classes": ["Bardo", "Clérigo", "Druida"],
    "tempo_de_conjuracao": "10 minutos",
    "alcance": "Pessoal",
    "componentes": ["V", "S", "M","(uma tigela incrustada de pedras preciosas no valor de 1.000 ou mais PO, que a magia consome)"],
    "duracao": "Instantânea",
    "efeito": "Você conjura um banquete que aparece em uma superfície em um Cubo desocupado de 3 metros de lado próximo a você. O banquete leva 1 hora para ser consumido e desaparece no final dessa duração, e os efeitos benéficos não aparecem até que essa hora passe. Até doze criaturas podem participar do banquete. Uma criatura que partilha do banquete recebe vários benefícios, que duram 24 horas. A criatura tem Resistência a dano Venenoso e Imunidade às condições Amedrontado e Envenenado. Seus Pontos de Vida máximos também aumentam em 2d10 e recebe o mesmo valor de Pontos de Vida."
  },
      
  {
    "magia_id": "35",
    "nome": "Barreira de Lâminas",
    "circulo": "6",
    "escola": "Evocação",
    "classes": ["Clérigo"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "27 metros",
    "componentes": ["V", "S"],
    "duracao": "Concentração, até 10 minutos",
    "efeito": "Você cria uma barreira de lâminas rodopiantes formadas de energia mágica. A barreira aparece no alcance da magia e permanece pela duração. Você cria uma barreira reta de até 30 metros de comprimento, 6 metros de altura e 1,5 metro de espessura, ou uma barreira circular de até 18 metros de diâmetro, 6 metros de altura e 1,5 metro de espessura. A barreira oferece Cobertura de Três Quartos e seu espaço é considerado Terreno Difícil. Qualquer criatura no espaço da barreira realiza uma salvaguarda de Destreza, sofrendo 6d10 pontos de dano Energético se falhar, ou metade desse dano em caso de sucesso. Uma criatura também realiza essa salvaguarda se entrar no espaço da barreira ou terminar seu turno lá. Uma criatura realiza essa salvaguarda apenas uma vez por turno."
},
{
    "magia_id": "36",
    "nome": "Bênção",
    "circulo": "1",
    "escola": "Encantamento",
    "classes": ["Clérigo", "Paladino"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "9 metros",
    "componentes": ["V", "S", "M","(um Símbolo Sagrado no valor de 5 ou mais PO)"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Você abençoa até três criaturas no alcance da magia. Sempre que um alvo realiza uma jogada de ataque ou uma salvaguarda antes que a magia termine, o alvo adiciona 1d4 à jogada de ataque ou salvaguarda. Usando um Espaço de Magia de Círculo Superior. Você pode escolher uma criatura adicional para cada círculo de espaço de magia acima de 1."
},
{
    "magia_id": "37",
    "nome": "Boca Encantada",
    "circulo": "2",
    "escola": "Ilusão",
    "classes": ["Bardo", "Mago"],
    "tempo_de_conjuracao": "1 minuto ou Ritual",
    "alcance": "9 metros",
    "componentes": ["V", "S", "M","(poeira de jade no valor de 10 ou mais PO, que a magia consome)"],
    "duracao": "Até ser dissipada",
    "efeito": "Você implanta uma mensagem em um objeto que esteja no alcance da magia. Essa mensagem é revelada quando uma circunstância de disparo ocorrer. Escolha um objeto à sua vista e que não esteja sendo usado ou carregado por outra criatura. Fale, então, a mensagem, que deve possuir 25 palavras ou menos, embora ela possa ser emitida ao longo de um período de até 10 minutos. Por fim, determine a circunstância de disparo para magia revelar a mensagem. Quando tal circunstância ocorrer, uma boca encantada aparece no objeto e recita a mensagem com a sua voz e no mesmo volume que você falou. Se o objeto escolhido tiver uma boca ou algo que se assemelhe (por exemplo, a boca de uma estátua), a boca encantada se sobrepõe para parecer que as palavras saem da boca do próprio objeto. Ao conjurar a magia, você determina se ela se encerra após entregar a mensagem ou se permanece para repetir o conteúdo sempre que a circunstância de disparo ocorrer. A circunstância de disparo pode ser tão abrangente ou específica quanto você quiser, mas deve ser baseada em condições visuais ou auditivas que ocorram a até 9 metros do objeto. Por exemplo, você pode instruir a boca a falar sempre que uma criatura se aproxime a até 9 metros do objeto, ou quando um sino de prata soar a até 9 metros de distância do objeto."
},
{
    "magia_id": "38",
    "nome": "Bola de Fogo",
    "circulo": "3",
    "escola": "Evocação",
    "classes": ["Feiticeiro", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "45 metros",
    "componentes": ["V", "S", "M","(uma bola de guano de morcego e enxofre)"],
    "duracao": "Instantânea",
    "efeito": "Uma faixa brilhante emerge de você até um ponto à sua escolha no alcance da magia e, em seguida, desabrocha com um estrondo baixo em uma explosão de fogo. Cada criatura em uma Esfera de 6 metros de raio centrada nesse ponto realiza uma salvaguarda de Destreza, sofrendo 8d6 pontos de dano Ígneo se falhar, ou metade desse dano em caso de sucesso. Objetos inflamáveis na área que não estão sendo usados ou carregados entram em combustão. Usando um Espaço de Magia de Círculo Superior. O dano aumenta em 1d6 para cada círculo de espaço de magia acima de 3."
},
{

    "magia_id": "39",
    "nome": "Bola de Fogo Adiável",
    "circulo": "7",
    "escola": "Evocação",
    "classes": ["Feiticeiro", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "45 metros",
    "componentes": ["V", "S", "M","(uma bola de guano de morcego e enxofre)"],
    "duracao": "Concentração, até 1 minuto",
    "efeito": "Um feixe de luz amarela dispara de você, depois se condensa em um ponto escolhido no alcance da magia. Se uma criatura tocar o grânulo brilhante antes da magia terminar, ela realiza uma salvaguarda de Destreza. Se falhar, a magia se encerra, fazendo com que o grânulo exploda. Em caso de sucesso, a criatura pode arremessar o grânulo até 12 metros. Se o arremesso atingir o espaço de uma criatura ou colidir com um objeto sólido, a magia se encerra e o grânulo explode. Quando o grânulo explode, objetos inflamáveis na explosão que não estão sendo usados ou carregados entram em combustão. Usando um Espaço de Magia de Círculo Superior. O dano base aumenta em 1d6 pontos para cada círculo de espaço de magia acima de 7."
  },
  {
    "magia_id": "40",
    "nome": "Bolha Ácida",
    "circulo": "0",
    "escola": "Evocação",
    "classes": ["Feiticeiro", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "18 metros",
    "componentes": ["V", "S"],
    "duracao": "Instantânea",
    "efeito": "Você cria uma bolha ácida em um ponto no alcance da magia, onde ela explode em uma Esfera de 1,5 metro de raio. Cada criatura nessa Esfera deve ser bem-sucedida em uma salvaguarda de Destreza ou sofre 1d6 pontos de dano Ácido. Aprimoramento de Truque. O dano aumenta em 1d6 quando você atinge os níveis 5 (2d6), 11 (3d6) e 17 (4d6)."
  },
  {
    "magia_id": "41",
    "nome": "Bom Fruto",
    "circulo": "1",
    "escola": "Invocação",
    "classes": ["Druida", "Guardião"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Pessoal",
    "componentes": ["V", "S", "M","(um ramo de visco)"],
    "duracao": "24 horas",
    "efeito": "Dez frutos aparecem em sua mão e são infundidos magicamente pela duração da magia. Uma criatura pode executar uma Ação Bônus para comer um fruto. Comer um fruto restaura 1 Ponto de Vida e fornece alimento suficiente para sustentar uma criatura por um dia. Frutos não comidos desaparecem quando a magia termina."
  },
  {
    "magia_id": "42",
    "nome": "Bordão Místico",
    "circulo": "0",
    "escola": "Transmutação",
    "classes": ["Druida"],
    "tempo_de_conjuracao": "Ação Bônus",
    "alcance": "Pessoal",
    "componentes": ["V", "S", "M","(um ramo de visco)"],
    "duracao": "1 minuto",
    "efeito": "Um Cajado ou Clava que você está segurando é imbuído com o poder da natureza. Pela duração da magia, você pode usar seu atributo de conjuração em vez de Força para as jogadas de ataque e dano de ataques corpo a corpo com essa arma, e o dado de dano da arma se torna um d8. Se o ataque causar dano, ele pode ser de dano Energético ou do tipo de dano normal da arma (à sua escolha)."
  },
  {
    "magia_id": "43",
    "nome": "Braços de Hadar",
    "circulo": "1",
    "escola": "Invocação",
    "classes": ["Bruxo"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Pessoal",
    "componentes": ["V", "S"],
    "duracao": "Instantânea",
    "efeito": "Clamando por Hadar, você faz com que tentáculos irrompam em você. Cada criatura em uma Emanação de 3 metros originada em você realiza uma salvaguarda de Força. Se falhar, um alvo sofre 2d6 pontos de dano Necrótico e não pode executar Reações até o início do próximo turno dele. Em caso de sucesso, um alvo sofre apenas metade do dano. Usando um Espaço de Magia de Círculo Superior. O dano aumenta em 1d6 pontos para cada círculo de espaço de magia acima de 1."
  },
  {
    "magia_id": "44",
    "nome": "Caldeirão Borbulhante de Tasha",
    "circulo": "6",
    "escola": "Invocação",
    "classes": ["Bruxo", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "1,5 metro",
    "componentes": ["V", "S", "M","(uma colher de mexer caldeirão dourada no valor de 500 ou mais PO)"],
    "duracao": "10 minutos",
    "efeito": "Você conjura um caldeirão com pés de garra cheio de líquido borbulhante. O caldeirão aparece em um espaço desocupado no chão a até 1,5 metro de você e permanece pela duração da magia. O caldeirão não pode ser movido e desaparece quando a magia termina, junto com o líquido borbulhante dentro dele. O líquido no caldeirão copia as propriedades de uma poção Comum ou Incomum à sua escolha (como uma Poção de Cura). Como uma Ação Bônus, você ou um aliado pode alcançar o caldeirão e retirar dele uma poção desse tipo. A poção está contida em um frasco que desaparece quando a poção é consumida. O caldeirão pode produzir um número dessas poções igual ao seu modificador de atributo de conjuração (mínimo 1). Quando a última dessas poções é retirada do caldeirão, o caldeirão desaparece e a magia termina. Poções obtidas do caldeirão que não são consumidas desaparecem quando você conjura esta magia novamente."
  },
  {
    "magia_id": "45",
    "nome": "Caminhar no Vento",
    "circulo": "6",
    "escola": "Transmutação",
    "classes": ["Druida"],
    "tempo_de_conjuracao": "1 minuto",
    "alcance": "9 metros",
    "componentes": ["V", "S", "M","(uma vela)"],
    "duracao": "8 horas",
    "efeito": "Você e até dez criaturas voluntárias à sua escolha no alcance da magia assumem formas gasosas pela duração da magia, aparecendo como fiapos de nuvem. Enquanto estiver nesta forma de nuvem, um alvo tem um Deslocamento de Voo de 90 metros e pode pairar; tem Imunidade à condição Caído; e tem Resistência a dano Contundente, Cortante e Perfurante. As únicas ações que um alvo pode executar nesta forma são a ação Correr ou Usar Magia para começar a reverter à sua forma normal. Reverter leva 1 minuto, durante o qual o alvo tem a condição Atordoado. Até que a magia termine, o alvo pode voltar à forma de nuvem, o que também requer uma ação Usar Magia seguida de uma transformação de 1 minuto. Se um alvo estiver em forma de nuvem e voando quando o efeito terminar, ele desce 18 metros por rodada por 1 minuto até pousar, o que faz com segurança. Se não conseguir pousar após 1 minuto, ele cai pela distância restante."
  },
  {
    "magia_id": "46",
    "nome": "Caminhar Sobre as Águas",
    "circulo": "3",
    "escola": "Transmutação",
    "classes": ["Clérigo", "Druida", "Feiticeiro", "Guardião"],
    "tempo_de_conjuracao": "Ação ou Ritual",
    "alcance": "9 metros",
    "componentes": ["V", "S", "M","(um pedaço de cortiça)"],
    "duracao": "1 hora",
    "efeito": "Esta magia concede a capacidade de se mover através de qualquer superfície líquida — como ácido, água, areia movediça, lama, lava ou neve — como se fosse um solo sólido inofensivo (criaturas que cruzam a lava derretida ainda podem sofrer dano devido ao calor). Até dez criaturas voluntárias à sua escolha no alcance da magia recebem essa habilidade pela duração da magia. Um alvo afetado deve executar uma Ação Bônus para passar da superfície do líquido para dentro dele e vice-versa, mas, se o alvo cair no líquido, ele atravessa a superfície e entra no líquido abaixo."
  },
  {
    "magia_id": "47",
    "nome": "Campo Antimagia",
    "circulo": "8",
    "escola": "Abjuração",
    "classes": ["Clérigo", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "Pessoal",
    "componentes": ["V", "S", "M","(raspas de ferro)"],
    "duracao": "Concentração, até 1 hora",
    "efeito": "Uma aura de antimagia envolve você em uma Emanação de 3 metros. Ninguém pode conjurar magias, executar a ação Usar Magia ou criar outros efeitos mágicos dentro da aura, e esses efeitos não podem ter como alvo ou afetar qualquer coisa dentro dela. As propriedades mágicas dos itens mágicos não funcionam dentro da aura ou em qualquer coisa dentro dela. Áreas de efeito criadas por magias ou outros efeitos mágicos não podem se estender para dentro da aura, e ninguém pode se teleportar para dentro ou para fora dela ou usar viagens planares para lá. Os portais se fecham temporariamente enquanto estão na aura. Magias em andamento, exceto aquelas conjuradas por um Artefato ou por uma divindade, são suprimidas na área. Enquanto um efeito é suprimido, ele não funciona, mas o tempo que ele gasta suprimido conta para sua duração. Dissipar Magia não tem efeito sobre a aura, e as auras criadas por diferentes magias de Campo Antimagia não se anulam."
  },
  {
    "magia_id": "48",
    "nome": "Cão Fiel de Mordenkainen",
    "circulo": "4",
    "escola": "Invocação",
    "classes": ["Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "9 metros",
    "componentes": ["V", "S", "M","(um apito de prata)"],
    "duracao": "8 horas",
    "efeito": "Você conjura um cão de guarda fantasmagórico em um espaço desocupado à sua vista e no alcance da magia. O cão permanece pela duração da magia ou até que vocês dois estejam separados por mais de 90 metros. Ninguém além de você pode ver o cão, e ele é intangível e invulnerável. Quando uma criatura de tamanho Pequeno ou maior se aproxima a 9 metros dele sem antes falar a senha que você especificou ao conjurar essa magia, o cão começa a latir alto. O cão possui Visão Verdadeira com alcance de 9 metros. No início de cada um dos seus turnos, o cão tenta morder um inimigo a até 1,5 metro dele. Esse inimigo deve ser bem-sucedido em uma salvaguarda de Destreza ou sofre 4d8 pontos de dano Energético. Nos seus turnos subsequentes, você pode executar uma ação Usar Magia para mover o cão até 9 metros."
  },
  {
    "magia_id": "49",
    "nome": "Cárcere de Energia",
    "circulo": "7",
    "escola": "Evocação",
    "classes": ["Bardo", "Bruxo", "Mago"],
    "tempo_de_conjuracao": "Ação",
    "alcance": "30 metros",
    "componentes": ["V", "S", "M","(rubi em pó no valor de 1.500 ou mais PO, que a magia consome)"],
    "duracao": "Concentração, até 1 hora",
    "efeito": "Uma prisão imóvel, invisível e em forma de Cubo composta de força energética surge em torno de uma área à sua escolha no alcance da magia. A prisão pode ser uma jaula ou uma caixa sólida, à sua escolha. Uma prisão na forma de uma jaula pode ter até 6 metros de lado e é formada com barras de 1,5 centímetro de diâmetro com espaços de 1,5 centímetro entre elas. Uma prisão na forma de caixa pode ter até 3 metros de lado, criando uma barreira sólida que impede que qualquer matéria passe por ela e bloqueia quaisquer magias conjuradas para dentro ou para fora da área. Ao conjurar a magia, qualquer criatura que esteja completamente na área da jaula fica presa. Criaturas apenas parcialmente dentro da área, ou aquelas grandes demais para caber dentro dela, são empurradas para longe do centro da área até que estejam completamente fora dela. Uma criatura na jaula não pode deixá-la por meios não mágicos. Se a criatura tentar usar teleporte ou viagem interplanar para sair, ela deve primeiro realizar uma salvaguarda de Carisma. Em caso de sucesso, a criatura pode usar essa magia para sair da jaula. Se falhar, a criatura não sai da jaula e desperdiça a magia ou o efeito. A jaula também se estende para o Plano Etéreo, bloqueando viagens etéreas. Esta magia não pode ser dissipada por Dissipar Magia."
  }
];


export async function getDatabase(): Promise<SQLiteDatabase> {
  const sqliteDir = `${FileSystem.documentDirectory}SQLite`;
  await FileSystem.makeDirectoryAsync(sqliteDir, { intermediates: true });

  const dbPath = `${sqliteDir}/${DB_NAME}`;

  if (RESET_DATABASE_ON_START) {
    try {
      const fileInfo = await FileSystem.getInfoAsync(dbPath);
      if (fileInfo.exists) {
        console.log("🗑 Apagando banco local para recriação...");
        await FileSystem.deleteAsync(dbPath, { idempotent: true });
      }
    } catch (error) {
      console.warn("⚠️ Não foi possível apagar o banco:", error);
    }
  }

  // garante que estamos abrindo o mesmo caminho que apagamos
  const db = SQLite.openDatabaseSync(dbPath);
  return db;
}

export async function initializeDatabase(database: SQLiteDatabase) {
    try {
        // tabela personagens
        await database.execAsync(`
        CREATE TABLE IF NOT EXISTS caracter ( 
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            race TEXT NOT NULL,
            classe TEXT NOT NULL,
            level INTEGER NOT NULL,
            playerName TEXT
        );
        `);

        // tabela spells
        await database.execAsync(`
        CREATE TABLE IF NOT EXISTS spell (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            level INTEGER NOT NULL CHECK (level >= 0 AND level <= 9),
            school TEXT NOT NULL,
            classe TEXT NOT NULL,
            castingTime TEXT NOT NULL,
            range TEXT NOT NULL,
            components TEXT NOT NULL,
            duration TEXT NOT NULL,
            description TEXT NOT NULL
        );        
        `);

        await database.execAsync(`
        CREATE TABLE IF NOT EXISTS character_spell (
            character_id INTEGER NOT NULL,
            spell_id INTEGER NOT NULL,
            PRIMARY KEY (character_id, spell_id),
            FOREIGN KEY (character_id) REFERENCES caracter(id) ON DELETE CASCADE,
            FOREIGN KEY (spell_id) REFERENCES spell(id) ON DELETE CASCADE
        );
        `);

        // verifica se spells está vazia
        const result = await database.getFirstAsync<{ count: number }>('SELECT COUNT(*) as count FROM spell;');
        if (result && result.count === 0) {
            console.log("ℹ️ Tabela 'spell' vazia. Iniciando seed de magias...");

            for (const spell of spellsData) {
               await database.execAsync(
                    `INSERT INTO spell (name, level, school, classe, castingTime, range, components, duration, description) 
                     VALUES ('${spell.nome}', ${Number(spell.circulo)}, '${spell.escola}', '${spell.classes.join(",")}', '${spell.tempo_de_conjuracao}', '${spell.alcance}', '${spell.componentes.join(",")}', '${spell.duracao}', '${spell.efeito}');`
                );
            }
            console.log("✅ Seed de magias concluído!");
        } else {
            console.log("ℹ️ Tabela 'spell' já contém dados, seed ignorado.");
        }

    } catch (error) {
        console.error("❌ Erro ao inicializar o banco de dados:", error);
    }
}
