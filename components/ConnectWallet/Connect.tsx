"use client";
import { ConnectButton } from "./ConnectButton";
import { useEffect, useState } from "react";

export const Connect = ({}): JSX.Element => {
  const [showContent, setShowContent] = useState<boolean>(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return <>{showContent ? <ConnectButton /> : null}</>;
};
