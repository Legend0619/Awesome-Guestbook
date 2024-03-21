import React from 'react';
import { type Visitor } from '../types';

interface VisitorContext {
  visitors: Visitor[];
  setVisitors: (visitors: Visitor[]) => void;
}

export const VisitorContext = React.createContext<VisitorContext>({
  visitors: [],
  setVisitors: () => {},
});

export const useVisitorContext = () => React.useContext(VisitorContext);

export const VisitorContextProvider = (props: React.PropsWithChildren) => {
  const [visitors, setVisitors] = React.useState<Visitor[]>(
    localStorage.getItem('visitors') ?
      JSON.parse(localStorage.getItem('visitors') as string)
      : []
  );

  React.useEffect(() => {
    localStorage.setItem(
      'visitors',
      JSON.stringify(visitors)
    );
  }, [visitors]);

  return (
    <VisitorContext.Provider value={{ visitors, setVisitors }}>
      {props.children}
    </VisitorContext.Provider>
  );
}