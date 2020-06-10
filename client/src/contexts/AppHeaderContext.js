import React from 'react'
const AppHeaderContext = React.createContext({});
export const AppHeaderContextProvider = AppHeaderContext.Provider;
export const AppHeaderContextConsumer = AppHeaderContext.Consumer;
export default AppHeaderContext;