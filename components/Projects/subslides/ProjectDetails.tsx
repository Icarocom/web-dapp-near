import React, { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';

import { BackIcon, EditIcon, ShareIcon, DeleteIcon, VoucherIcon, PlusIcon } from 'components/icons';
import { SwitchBox, DropDown } from 'components/items/elements';
import { NFTCard } from 'components/items';
import { CloseIcon, MapIcon } from 'components/icons';
import { useAppSelector } from 'lib/hooks';
import { AppState } from 'lib/store';

import { AddNewNFT } from './AddNewNFT';

import { Project, NFTProp } from '../projectSlice';

interface Props {
  project: Project;
  onBack: () => void;
  onNewNFT: (nft: NFTProp, selectedProj: Project) => void;
}

const DEFAULT_NFT_VIEW_BOX_CLASSES = clsx('fixed top-0 w-full h-full backdrop-brightness-95 transition-all delay-500');
const HIDDEN_NFT_VIEW_BOX_CLASSES = clsx('left-full');
const SHOWN_NFT_VIEW_BOX_CLASSES = clsx('left-0');

const DEFAULT_NFT_VIEW_CLASSES = clsx(
  'fixed top-0 w-full sm:w-[448px] h-full p-6 bg-white transition-all delay-500 overflow-y-auto'
);
const HIDDEN_NFT_VIEW_CLASSES = clsx('right-full');
const SHOWN_NFT_VIEW_CLASSES = clsx('right-0');

export const ProjectDetails: React.FC<Props> = ({ project, onBack, onNewNFT }) => {
  const projs = useAppSelector((state: AppState) => state.projects);

  const logoRef = useRef<HTMLDivElement>(null);
  const nftViewRef = useRef<HTMLDivElement>(null);

  const [nfts, setNfts] = useState<NFTProp[]>(project.nfts);
  const availablePageStatus = {
    explorer: 'explorer',
    adding: 'adding',
  };
  const [pageStatus, setPageStatus] = useState(availablePageStatus.explorer);

  const [selectedNFT, setSelectedNFT] = useState<NFTProp>();

  const [isShow, setIsShow] = useState(false);

  const [isNFTActive, setIsNFTActive] = useState(true);

  useEffect(() => {
    if (pageStatus == availablePageStatus.explorer) {
      if (null !== logoRef.current) logoRef.current.style.backgroundImage = 'url(' + project.image + ')';

      if (null !== nftViewRef.current) nftViewRef.current.style.backgroundImage = 'url(' + selectedNFT?.image + ')';
    }
  }, [selectedNFT, pageStatus]);

  useEffect(() => {
    projs.projects?.data.map((proj, index) => {
      if (proj.name === project.name && proj.description === project.description && proj.image === project.image)
        setNfts(proj.nfts);
    });
  }, [projs]);

  return (
    <div className="relative w-full">
      {pageStatus === availablePageStatus.explorer && (
        <div>
          <div
            className="group absolute invisible xs:visible sm:left-14 md:left-40 w-14 h-14 rounded-full bg-white hover:bg-black shadow-2xl flex items-center justify-center cursor-pointer"
            onClick={() => onBack()}
          >
            <BackIcon className="text-darkGrey group-hover:text-white" />
          </div>
          <div className="absolute right-6 sm:right-10 md:right-40 -top-4 bg-white flex items-center justify-center gap-4 cursor-pointer">
            <SwitchBox label={true} isOn={isNFTActive} onChange={() => setIsNFTActive(!isNFTActive)} />
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
              <div
                className="cursor-pointer mt-10 w-11/12 sm:w-full md:w-1/2 sm:h-36 h-80 flex flex-col justify-center items-center rounded-3xl border border-primary border-dashed bg-lightPrimary"
                onClick={() => setPageStatus(availablePageStatus.adding)}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary">
                  <PlusIcon className="text-white" />
                </div>
                <p className="text-primary text-body-md mt-4">Add new NFT</p>
              </div>
            )}
            {nfts.length !== 0 && (
              <div className="mt-10 w-full">
                <div className="flex flex-row justify-between mx-8 md:mx-16">
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={() => setPageStatus(availablePageStatus.adding)}
                  >
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
                        nft={item}
                        onClick={(nft: NFTProp) => {
                          console.log(nft);
                          setSelectedNFT(nft);
                          setIsShow(true);
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          <div
            className={clsx(
              DEFAULT_NFT_VIEW_BOX_CLASSES,
              isShow ? SHOWN_NFT_VIEW_BOX_CLASSES : HIDDEN_NFT_VIEW_BOX_CLASSES
            )}
          ></div>
          <div className={clsx(DEFAULT_NFT_VIEW_CLASSES, isShow ? SHOWN_NFT_VIEW_CLASSES : HIDDEN_NFT_VIEW_CLASSES)}>
            <div className="flex flex-col w-full relative break-words">
              <div
                className="h-[312px] sm:w-[400px] sm:h-[400px] border p-4 border-lightGrey rounded-3xl bg-center bg-cover bg-no-repeat"
                ref={nftViewRef}
              >
                <div className="w-14 h-14 rounded-full bg-white flex flex-col justify-center items-center cursor-pointer">
                  <CloseIcon className="text-darkGrey" onClick={() => setIsShow(false)} />
                </div>
              </div>
              <p className="text-heading-lg uppercase mt-6">{selectedNFT?.name}</p>
              <div className="mt-2 p-2 w-[138px] bg-secondary rounded-3xl">
                <p className="text-body-md font-bold">$3 off NFT voucher</p>
              </div>
              <div className="text-body-md text-darkGrey mt-4">{selectedNFT?.description}</div>
              <div className="sm:w-[400px] h-14 border border-lightGrey rounded-lg text-body-md mt-8 px-[52px] py-[18px] relative">
                <MapIcon className="text-primary absolute top-4 left-[18px]" />
                <input type="text" className="w-full outline-none" value="Picadelia 13th St, New York, NY 10011" />
                <CloseIcon className="text-error absolute top-4 right-[18px] cursor-pointer" />
              </div>
              {selectedNFT && (
                <div className="mt-6 flex flex-row justify-between">
                  <div className="flex gap-2">
                    <p className="text-black">Status:</p>{' '}
                    <p className="text-darkGrey">{selectedNFT.status ? 'Active' : 'InActive'}</p>
                  </div>
                  <SwitchBox
                    label={false}
                    isOn={selectedNFT.status}
                    onChange={() => {
                      setSelectedNFT({
                        ...selectedNFT,
                        status: !selectedNFT.status,
                      });
                    }}
                  />
                </div>
              )}
              <div className="mt-[72px] flex justify-center gap-4">
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
            </div>
          </div>
        </div>
      )}
      {pageStatus == availablePageStatus.adding && (
        <AddNewNFT
          onAdded={() => setPageStatus(availablePageStatus.explorer)}
          onBack={() => setPageStatus(availablePageStatus.explorer)}
          onNewNFT={(nft: NFTProp) => onNewNFT(nft, project)}
        />
      )}
    </div>
  );
};
