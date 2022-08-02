import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { limit } from 'firebase/firestore';

import { DropdownDownIcon, DropdownUpIcon, SearchIcon } from 'components/icons';

import { Country_List } from './data';

const BASE_DROPDOWN_CLASSES = clsx(
  'py-2 pl-3 pr-7 relative h-[54px] border flex items-center cursor-pointer select-none '
);
const OPENED_DROPDOWN_CLASSES = clsx('border-primary');
const CLOSED_DROPDOWN_CLASSES = clsx('border-lightGrey');

interface Props {
  className?: string;
  onChange?: (country: string) => void;
}

interface CountryProp {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
  preferred?: boolean | undefined;
}

export const CountrySelector: React.FC<Props> = ({ className, onChange }) => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  const [selectedCountry, setSelectedCountry] = useState<CountryProp>();
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as any)) {
      setIsOpen(false);
    }
  };

  const countrySelected = (country: CountryProp) => {
    setIsOpen(false);
    setSelectedCountry(country);
  };

  useEffect(() => {
    document.addEventListener('mousedown', (event) => handleClickOutside(event as any));
  }, [dropDownRef]);

  return (
    <div
      className={clsx(
        BASE_DROPDOWN_CLASSES,
        isOpen ? OPENED_DROPDOWN_CLASSES : CLOSED_DROPDOWN_CLASSES,
        className ? className : ''
      )}
      ref={dropDownRef}
    >
      {!isOpen && selectedCountry === undefined && (
        <div onClick={() => setIsOpen(!isOpen)} className="w-full">
          <div className="absolute right-3 top-6 w-3 h-3">{isOpen ? <DropdownUpIcon /> : <DropdownDownIcon />}</div>
          <div id="country" className="flex p-2 pl-0 text-sm hover:bg-lightGrey items-center gap-3 w-full">
            <img className="rounded-full w-8 h-8 object-cover" src={`https://flagpedia.net/data/flags/h60/gb.webp`} />
            <div id="country-name">United Kingdom</div>
          </div>
        </div>
      )}
      {!isOpen && selectedCountry && (
        <div onClick={() => setIsOpen(!isOpen)} className="w-full">
          <div className="absolute right-3 top-6 w-3 h-3">{isOpen ? <DropdownUpIcon /> : <DropdownDownIcon />}</div>
          <div id="country" className="flex p-2 pl-0 text-sm hover:bg-lightGrey items-center gap-3 w-full">
            <img
              className="rounded-full w-8 h-8 object-cover"
              src={`https://flagpedia.net/data/flags/h60/${selectedCountry.code.toLowerCase()}.webp`}
            />
            <div id="country-name">{selectedCountry.name}</div>
          </div>
        </div>
      )}
      {isOpen && (
        <>
          <div className="flex flex-row items-center text-body-md w-full">
            <div className="absolute rounded-full bg-lightGrey w-8 h-8 flex items-center justify-center">
              <SearchIcon className="w-4 h-4 text-darkGrey" />
            </div>
            <input
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              type="text"
              className="w-full text-sm text-gray-900 pl-10 outline-none"
              placeholder="Search..."
            />
          </div>
          <div className="absolute right-3 top-6 w-3 h-3" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <DropdownUpIcon /> : <DropdownDownIcon />}
          </div>
          <div
            className={clsx(
              'absolute py-2 border border-lightGrey top-16 left-0 bg-white z-10 max-h-[250px] overflow-y-auto w-full',
              className ? className : ''
            )}
            id="countries"
          >
            {Country_List.map((country, index) => {
              if (country.name.toLowerCase().startsWith(inputValue.toLowerCase())) {
                return (
                  <div
                    id="country"
                    key={index}
                    onClick={() => {
                      countrySelected(country);
                    }}
                    className="flex p-2 text-sm hover:bg-lightGrey items-center gap-3 cursor-pointer w-full"
                  >
                    <img
                      className="rounded-full w-8 h-8 object-cover"
                      src={`https://flagpedia.net/data/flags/h60/${country.code.toLowerCase()}.webp`}
                      alt={country.name}
                    />
                    <div id="country-name">{country.name}</div>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};
