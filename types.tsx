export interface toDos{
    name: string
    id: string,
    child_check: boolean,
    parent_check: boolean,
    difficulty: 1 | 2 | 3 | 4 | 5,
    selected?: boolean
}

export interface app{
    width: number,
    height: number,
    isParent: boolean,
    tasks: toDos[]
}

export interface PlayerInfo {
    id: string,
    health: number,
}

export type appProvider = {
    toDos: toDos[] | undefined,
    width: number | undefined,
    height: number | undefined,
    isParent: boolean | undefined,
    level: number | undefined,
    currentTask: toDos | undefined,
    intent: boolean | undefined,
    maxHealth: number;
    defense: number;
    speed: number;
    id: string;
    addToDo: (tasks: toDos) => void,
    removeToDo: (task: toDos) => void,
    updateWidth: () => void,
    updateHeight: () => void,
    updateMode: (userMode: boolean) => void,
    updateLevel: (newLevel: number) => void,
    updateTask: (task: toDos) => void,
    updateIntent: () => void,
    updateMaxHealth: (newMax: number) => void,
    updateDefense: (newDefense: number) => void,
    updateSpeed: (newSpeed: number) => void
}

export interface GameState { 
    turnId: string | undefined,
    players: PlayerInfo[],
}

export type ActionType = "attack" | "defend"

export interface Action {
    actionType: ActionType;
}
