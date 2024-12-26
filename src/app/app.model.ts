export interface IAppReducerState {
    sessionInfo: {
      userId: string;
      userType: string;
      sessionLoggedIn: boolean;
      sessionStarted: Date | null;
    };
  }

export interface IAppSetSession {
    readonly type: '@@app/SET_SESSION';
    payload: {
      userId: string;
      userType: string;
      sessionLoggedIn: boolean;
      sessionStarted: Date;
    };
  }

export interface IResetState {
    readonly type: '@@app/RESET_INITIAL_STATE';
}

export type IAppActions = IAppSetSession
