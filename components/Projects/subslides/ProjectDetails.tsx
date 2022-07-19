import React, { useRef, useState, useEffect } from 'react';

import { BackIcon, EditIcon, ShareIcon, DeleteIcon, VoucherIcon, PlusIcon } from 'components/icons';
import { SwitchBox, DropDown } from 'components/items/elements';
import { NFTCard } from 'components/items';

interface ProjectProp {
  name: string;
  description: string;
  image: string;
}

interface Props {
  project: ProjectProp;
  onBack: () => void;
}

interface NFTProp {
  name: string;
  description: string;
  image: string;
}

export const ProjectDetails: React.FC<Props> = ({ project, onBack }) => {
  const logoRef = useRef(null);
  const [nfts, setNfts] = useState<NFTProp[]>([{ name: 'COOL PIZZA', description: 'COOL pizza', image: '/user.png' }]);
  const [selectedNFT, setSelectedNFT] = useState<NFTProp>();

  const addNewNFT = (nft: NFTProp) => {
    setNfts([...nfts, nft]);
  };

  useEffect(() => {
    logoRef.current.style.backgroundImage = 'url(' + project.image + ')';
  }, []);

  return (
    <div className="relative w-full space-y-8">
      <div
        className="group absolute invisible xs:visible sm:left-14 md:left-40 w-14 h-14 rounded-full bg-white hover:bg-black shadow-2xl flex items-center justify-center cursor-pointer"
        onClick={() => onBack()}
      >
        <BackIcon className="text-darkGrey group-hover:text-white" />
      </div>
      <div className="absolute right-6 sm:right-10 md:right-40 -top-4 bg-white flex items-center justify-center gap-4 cursor-pointer">
        <SwitchBox />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-100p h-100p rounded-full bg-cover bg-no-repeat bg-center bg-primary" ref={logoRef}></div>
        <p className="text-heading-lg uppercase mt-6">{project.name}</p>
        <p className="text-darkGrey text-body-md mt-1">{project.description}</p>
        <div className="flex flex-row justify-center gap-4 mt-8">
          <button className="group sm:p-3 xs:p-4 rounded-full bg-lightGrey hover:bg-black sm:flex flex-row justify-center items-center hidden">
            <EditIcon className="text-black group-hover:text-white" />
          </button>
          <button className="group sm:p-3 xs:p-4 rounded-full bg-lightGrey hover:bg-black sm:flex flex-row justify-center items-center hidden">
            <ShareIcon className="text-black group-hover:text-white" />
          </button>
          <button className="group sm:p-3 xs:p-4 rounded-full bg-error hover:bg-black sm:flex flex-row justify-center items-center hidden">
            <DeleteIcon className="text-white group-hover:text-white" />
          </button>
        </div>
        <div className="flex w-full md:w-1/2 h-92p bg-white rounded-none sm:rounded-3xl border border-lightGrey mt-10">
          <div className="w-1/3 h-92p flex flex-col items-center justify-center">
            <p className="text-heading-sm sm:text-heading-md">0</p>
            <p className="text-body-sm sm:text-body-md text-darkGrey">Redeemed items</p>
          </div>
          <div className="w-1/3 h-92p flex flex-col items-center justify-center border border-t-0 border-b-0 border-l-lightGrey border-r-lightGrey">
            <p className="text-heading-sm sm:text-heading-md">0</p>
            <p className="text-body-sm sm:text-body-md text-darkGrey">Total items</p>
          </div>
          <div className="w-1/3 h-92p flex flex-col items-center justify-center">
            <VoucherIcon className="text-primary sm:mb-1" />
            <p className="text-body-sm sm:text-body-md text-darkGrey pt-1">Vouchers</p>
          </div>
        </div>
        {nfts.length === 0 && (
          <div className="cursor-pointer mt-10 w-11/12 sm:w-full md:w-1/2 sm:h-36 h-80 flex flex-col justify-center items-center rounded-3xl border border-primary border-dashed bg-lightPrimary">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary">
              <PlusIcon className="text-white" />
            </div>
            <p className="text-primary text-body-md mt-4">Add new NFT</p>
          </div>
        )}
        {nfts.length !== 0 && (
          <div className="mt-10 w-full">
            <div className="flex flex-row justify-between mx-8">
              <div className="flex items-center gap-4 cursor-pointer">
                <div className="cursor-pointer w-14 h-14 rounded-full flex items-center justify-center bg-primary">
                  <PlusIcon className="text-white" />
                </div>
                <p className="text-body-md text-darkGrey hidden sm:block">Add new NFT</p>
              </div>
              <DropDown name="Status" value="Active" items={['Active', 'InActive']} />
            </div>
            <div className="mt-10 flex justify-center flex-wrap gap-6">
              {nfts.map((item, index) => {
                return (
                  <NFTCard
                    key={index}
                    name={item.name}
                    description={item.description}
                    image={item.image}
                    onClick={(nft: NFTProp) => {
                      console.log(nft);
                      setSelectedNFT(nft);
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
