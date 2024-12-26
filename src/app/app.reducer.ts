import { IAppActions, IAppReducerState } from './app.model'

export const initialState: IAppReducerState = {
  sessionInfo: {
    userId: '',
    userType: '',
    sessionLoggedIn: false,
    sessionStarted: null as Date | null,
  },
}

export const AppReducer = (
  state: IAppReducerState = initialState,
  action: IAppActions,
): IAppReducerState => {
  switch (action.type) {
  case '@@app/SET_SESSION':
    return {
      ...state,
      sessionInfo: {
        ...state.sessionInfo,
        userId: action.payload.userId,
        userType: action.payload.userType,
        sessionLoggedIn: action.payload.sessionLoggedIn,
        sessionStarted: action.payload.sessionStarted,
      },
    }
  default:
    return state
  }
}
