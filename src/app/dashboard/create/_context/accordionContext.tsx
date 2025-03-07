import { createContext, useContext, useState } from "react";

interface AccordionContextType {
  openAccordion: boolean;
  setOpenAccordion: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AccordionContext = createContext<AccordionContextType | null>(
  null
);

export default function AccordionContextProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [openAccordion, setOpenAccordion] = useState<boolean>(true);

  return (
    <AccordionContext.Provider
      value={{
        openAccordion,
        setOpenAccordion
      }}>
      {children}
    </AccordionContext.Provider>
  );
}

export function useAccordionContext() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error(
      "useAccordionContext must be used within an AccordionContextProvider"
    );
  }
  return context;
}
