import React, { useRef, useEffect } from 'react';

interface NFTProp {
  name: string;
  description: string;
  image: string;
  label: string;
  position: string;
  status: boolean;
}

interface Props {
  nft: NFTProp;
  onClick: (nft: NFTProp) => void;
}

export const NFTCard: React.FC<Props> = ({ nft, onClick }) => {
  const nftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nftRef.current !== null) nftRef.current.style.backgroundImage = 'url(' + nft.image + ')';
  }, []);

  return (
    <div
      className="w-36 sm:w-[308px] md:w-64 rounded-3xl border border-lightGrey flex flex-col justify-end cursor-pointer relative"
      onClick={() => onClick(nft)}
    >
      <div
        className="absolute top-[-1px] left-[-1px] w-36 h-36 sm:w-[308px] sm:h-[308px] md:w-64 md:h-64 rounded-3xl bg-cover bg-no-repeat bg-center"
        ref={nftRef}
      ></div>
      <div className="absolute top-1 right-2 mt-2 p-2 w-[138px] bg-secondary rounded-3xl">
        <p className="text-body-md font-bold">$3 off NFT voucher</p>
      </div>
      <div className="pb-[15px] md:pb-6 px-2 sm:px-4 pt-[158px] sm:pt-[322px] md:pt-[274px] flex flex-col gap-2">
        <p className="text-heading-sm md:text-heading-md">{nft.name}</p>
        <p className="text-body-md text-darkGrey hidden sm:block">{nft.description}</p>
      </div>
    </div>
  );
};
