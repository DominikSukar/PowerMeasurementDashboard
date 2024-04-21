import { ReactNode, createContext, useState, Dispatch, SetStateAction } from 'react';

interface TokenContextType {
    accessToken: string;
    setAccessToken: Dispatch<SetStateAction<string|undefined>>;
  }

const TokenContext = createContext<TokenContextType>({
    accessToken: "0000",
    setAccessToken: () => {}
  });

export const TokenProvider = ({children}: {children: ReactNode}) => {
  const [accessToken, setAccessToken] = useState<string | undefined>("0000");

  const updateAccessToken: TokenContextType['setAccessToken'] = (newToken) => {
    setAccessToken(newToken);
  };

  return (
    <TokenContext.Provider value={{ accessToken: accessToken || "", setAccessToken: updateAccessToken  }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenContext;