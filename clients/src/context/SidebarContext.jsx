import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((s) => !s);
  const close = () => setOpen(false);

  return (
    <SidebarContext.Provider value={{ open, toggle, close, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);

export default SidebarContext;
