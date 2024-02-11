import { Choremon } from "./constants/Choremon"

export interface toDos{
    name: string
    id: string,
    child_check: boolean,
    parent_check: boolean,
    difficulty: 1 | 2 | 3 | 4 | 5,
    selected?: boolean
    image: NodeRequire;
}

export interface app{
    width: number,
    height: number,
    isParent: boolean,
    tasks: toDos[]
}

export type appProvider = {
    toDos: toDos[] | undefined,
    width: number | undefined,
    height: number | undefined,
    isParent: boolean | undefined,
    level: number | undefined,
    currentTask: toDos | undefined,
    intent: boolean | undefined,
    barNum: number | undefined,
    choremon: Choremon | undefined,
    addToDo: (tasks: toDos) => void,
    removeToDo: (task: toDos) => void,
    updateWidth: () => void,
    updateHeight: () => void,
    updateMode: (userMode: boolean) => void,
    updateLevel: (remainder: number) => void,
    updateTask: (task: toDos) => void,
    updateIntent: (val: boolean) => void,
    deleteToDo: (task: toDos) => void,
    updateChildCheck: (task: toDos) => void,
    updateParentCheck: (task: toDos) => void,
    selectChoremon: (choremon: Choremon) => void,

}