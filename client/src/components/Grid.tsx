import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Grid({ children }: Props) {
  return (
 
      <div className="grid grid-cols-12 gap-4">
        {children}
      </div>
  );
}

export default Grid;
