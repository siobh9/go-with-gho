"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useSignAuthorization } from "~~/hooks/scaffold-eth/useSignAuthorization"

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const { signAuthorization, signedMessageData, isSuccess } = useSignAuthorization();

  console.log(isSuccess);

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <div className="flex justify-center items-center space-x-2 flex-col">
            <button className="btn btn-secondary btn-sm px-2 rounded-full" onClick={ () => signAuthorization() }>Sign Authorization Methods!</button>
          </div>
          <div className="flex justify-center items-center space-x-2 flex-col">
            <button className="btn btn-secondary btn-sm px-2 rounded-full" onClick={ () => signAuthorization() } disabled={!isSuccess}>Hello!</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
