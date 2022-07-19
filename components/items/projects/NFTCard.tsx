import React, { useRef, useEffect } from 'react';

interface NFTProp {
  name: string;
  description: string;
  image: string;
}

interface Props {
  name: string;
  description: string;
  image: string;
  onClick: (nft: NFTProp) => void;
}

export const NFTCard: React.FC<Props> = ({ name, description, image, onClick }) => {
  const nftRef = useRef(null);

  useEffect(() => {
    nftRef.current.style.backgroundImage = 'url(' + image + ')';
  }, []);

  return (
    <div
      className="w-36 sm:w-[308px] md:w-64 rounded-3xl border border-lightGrey flex flex-col justify-end cursor-pointer relative"
      onClick={() => onClick({ name: name, image: image, description: description })}
    >
      <div
        className="absolute top-[-1px] left-[-1px] w-36 h-36 sm:w-[308px] sm:h-[308px] md:w-64 md:h-64 rounded-3xl bg-cover bg-no-repeat bg-center"
        ref={nftRef}
      ></div>
      <div className="pb-[15px] md:pb-6 px-2 sm:px-4 pt-[158px] sm:pt-[322px] md:pt-[274px] flex flex-col gap-2">
        <p className="text-heading-sm md:text-heading-md">{name}</p>
        <p className="text-body-md text-darkGrey hidden sm:block">{description}</p>
      </div>
    </div>
  );
};
