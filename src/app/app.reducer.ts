import { IAppActions, IAppReducerState } from './app.model'

export const initialState: IAppReducerState = {
  sessionInfo: {
    userId: sessionStorage.getItem('userId') || null,
    userType: sessionStorage.getItem('userType') || null,
    sessionLoggedIn: !!sessionStorage.getItem('sessionLoggedIn'),
    sessionStarted: sessionStorage.getItem('sessionStarted') || null,
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
        userId: action.payload.userId || null,
        userType: action.payload.userType || null,
        sessionLoggedIn: !!action.payload.sessionLoggedIn,
        sessionStarted: action.payload.sessionStarted || null,
      },
    }
  default:
    return state
  }
}
