import { MutableState, Tools } from "final-form"

export function changeValueMutator<S, V>(
  [name, newValue]: string[],
  state: MutableState<S, V>,
  { changeValue }: Tools<S, V>
) {
  console.log(state, name)
  if (name !== undefined) {
    changeValue(state, name, (value) => newValue)
  }
}

export type MutatorFunc = Record<string, (...args: any[]) => any>
