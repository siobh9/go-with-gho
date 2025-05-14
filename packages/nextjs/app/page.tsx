"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { Address as AddressType } from "viem";
import { useAccount } from "wagmi";
import { Address, AddressInput } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [inputAddress, setInputAddress] = useState<AddressType>();

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
            <p className="my-2 font-medium">Delegate Contract:</p>
            <AddressInput value={inputAddress ?? ""} onChange={value => setInputAddress(value as AddressType)} />
          </div>
          <p className="text-center text-lg" />
          <div className="flex justify-center items-center space-x-2 flex-col">
            <button className="btn btn-secondary btn-sm px-2 rounded-full">Delegate to {inputAddress}!</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
