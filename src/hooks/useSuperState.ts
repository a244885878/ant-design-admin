import { useState } from "react"
import _ from 'lodash';

export default function useSuperState<T>(state: T): [T, Function] {
  const [backState, setBackState] = useState<T>(state)

  const updateState = (val?: T) => {
    if (typeof backState === 'object' && backState !== null) {
      const newState = _.cloneDeep(backState)
      return setBackState(newState)
    } else {
      return setBackState(val!)
    }
  }

  return [backState, updateState]
}