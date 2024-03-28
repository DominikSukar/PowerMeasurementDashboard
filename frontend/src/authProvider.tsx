import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

interface TokenContextType {
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string>>;
  }

const TokenContext = createContext<TokenContextType>({
    accessToken: "0000",
    setAccessToken: () => {}
  });

export const TokenProvider = ({children}: {children: ReactNode}) => {
  const [accessToken, setAccessToken] = useState("0000");

  return (
    <TokenContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;