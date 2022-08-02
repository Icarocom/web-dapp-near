import React, { useState, useEffect, useRef } from 'react';

import { DropDown, Input, TextEdit } from 'components/items/elements';

import { FileInputPreview } from '../../Auth/fileInput/fileInput';
import { BackIcon, CloseIcon, CheckIcon } from '../../icons';
import { NFTProp } from '../projectSlice';

interface Props {
  onAdded: () => void;
  onBack: () => void;
  onNewNFT: (nft: NFTProp) => void;
}

export const AddNewNFT: React.FC<Props> = ({ onAdded, onBack, onNewNFT }) => {
  const nftPreviewRef = useRef<HTMLDivElement>(null);
  const smallNftPreviewRef = useRef<HTMLDivElement>(null);

  const creatingStatus = {
    idle: 'idle',
    uploading: 'uploading',
    created: 'created',
  };

  const [steps, setSteps] = useState(1);

  const [name, setName] = useState('');

  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');

  const [isVisibleCreatingModal, setIsVisibleCreatingModal] = useState(false);

  const [image, setImage] = useState('');

  const [currentCreatingStatus, setCurrentCreatingStatus] = useState(creatingStatus.idle);

  const proceeedCreating = () => {
    setIsVisibleCreatingModal(true);
    setCurrentCreatingStatus(creatingStatus.uploading);
    onNewNFT({
      name: name,
      description: description,
      image: image,
      label: label,
      position: '',
      status: true,
    });
    setTimeout(() => successfullyCreated(), 2000);
  };

  const successfullyCreated = () => {
    setIsVisibleCreatingModal(true);
    setCurrentCreatingStatus(creatingStatus.created);
  };

  useEffect(() => {
    setCurrentCreatingStatus(creatingStatus.idle);
  }, []);

  useEffect(() => {
    if (currentCreatingStatus == creatingStatus.created) {
      if (null !== nftPreviewRef.current) nftPreviewRef.current.style.backgroundImage = 'url(' + image + ')';

      if (null !== smallNftPreviewRef.current) smallNftPreviewRef.current.style.backgroundImage = 'url(' + image + ')';
    }
  }, [currentCreatingStatus]);

  return (
    <div className="">
      {steps == 1 && ( // Add New NFT
        <div className="">
          <div className="group absolute invisible xs:visible sm:left-14 md:left-40 w-14 h-14 rounded-full bg-white hover:bg-black shadow-2xl flex items-center justify-center cursor-pointer">
            <BackIcon className="text-darkGrey group-hover:text-white" onClick={() => onBack()} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-heading-xl text-center text-gray-900 uppercase">
            Add new nft
          </h2>
          <div className="mt-8 flex flex-col items-center">
            <div>
              <FileInputPreview imageChanged={(img) => setImage(img)} />
            </div>
            <div className="-space-y-px w-72 sm:w-80 rounded-md flex flex-col gap-4">
              <Input label="Name" value={name} onChange={(name) => setName(name)} />
              <DropDown
                className="border-darkGrey w-full rounded-lg"
                label={false}
                name="Type"
                value="Type"
                items={['Type', 'Type 1', 'Type 2']}
              />
              <Input label="Label" value={label} onChange={(label) => setLabel(label)} />
              <TextEdit
                label="Description"
                value={description}
                onChange={(description) => setDescription(description)}
                className="h-[111px]"
              />
            </div>
            <button
              className="bg-primary hover:bg-secondary text- text-white w-72 sm:w-80 mt-10 py-4 rounded-lg transition-all  delay-300"
              onClick={() => setSteps(2)}
            >
              Set location
            </button>
          </div>
        </div>
      )}
      {steps == 2 && ( // Set Location
        <div className="">
          <div className="group absolute invisible xs:visible sm:left-14 md:left-40 w-14 h-14 rounded-full bg-white hover:bg-black shadow-2xl flex items-center justify-center cursor-pointer">
            <BackIcon className="text-darkGrey group-hover:text-white" onClick={() => setSteps(1)} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-heading-xl text-center uppercase text-gray-900">
            Set Location
          </h2>
          <div className="mt-8 flex flex-col items-center">
            <button
              className="bg-primary hover:bg-secondary text- text-white w-72 sm:w-80 mt-10 py-4 rounded-lg transition-all delay-300 disabled:bg-darkGrey disabled:hover:bg-darkGrey"
              disabled={currentCreatingStatus == creatingStatus.uploading}
              onClick={() => proceeedCreating()}
            >
              {currentCreatingStatus == creatingStatus.uploading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-2 w-4 h-4 text-lightGrey animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#8383A5"
                  />
                </svg>
              )}
              Finish
            </button>
          </div>
        </div>
      )}
      {isVisibleCreatingModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-white">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <div
              className="absolute top-6 left-6 sm:top-8 sm:left-14 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer"
              onClick={() => {
                setIsVisibleCreatingModal(false);
              }}
            >
              <CloseIcon className="text-darkGrey" />
            </div>
            {currentCreatingStatus == creatingStatus.uploading && (
              <div className="flex flex-col items-center justify-center">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline mr-2 w-[49px] h-[49px] text-lightGrey animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#7871FF"
                  />
                </svg>
                <p className="mt-9 text-heading-lg uppercase">Uploading</p>
                <p className="mt-2 text-body-sm text-darkGrey">We are uploading your NFT...</p>
              </div>
            )}
            {currentCreatingStatus == creatingStatus.created && (
              <div className="flex flex-col items-center justify-end sm:justify-center">
                <div className="relative">
                  <div
                    className="w-[220px] h-[220px] rounded-full flex justify-center items-center relative bg-cover bg-center bg-no-repeat opacity-20"
                    ref={nftPreviewRef}
                  ></div>
                  <div
                    className="absolute top-5 left-5 w-[180px] h-[180px] rounded-full bg-cover bg-center bg-no-repeat opacity-100"
                    ref={smallNftPreviewRef}
                  ></div>
                  <div className="absolute top-4 right-4 w-14 h-14 rounded-full border-4 border-primary flex items-center justify-center invisible md:visible">
                    <CheckIcon className="text-primary font-black" />
                  </div>
                </div>
                <p className="mt-8 text-heading-lg uppercase">Success!</p>
                <p className="mt-3 text-body-sm text-darkGrey">We&apos;ve have added your NFT</p>
                <button
                  className="mt-[110px] sm:mt-8 w-312 h-14 py-4 bg-primary text-white font-bold rounded-2xl"
                  onClick={() => onAdded()}
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
