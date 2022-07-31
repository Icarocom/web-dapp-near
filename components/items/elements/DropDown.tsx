import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { DropdownDownIcon, DropdownUpIcon } from 'components/icons';

const BASE_DROPDOWN_CLASSES = clsx('py-4 pl-3 pr-7 relative cursor-pointer border');
const OPENED_DROPDOWN_CLASSES = clsx('border-primary');
const CLOSED_DROPDOWN_CLASSES = clsx('border-lightGrey');

interface Props {
  name: string;
  value: string;
  label?: boolean;
  className?: string;
  items: string[];
}

export const DropDown: React.FC<Props> = ({ name, value, label, className, items }) => {
  const dropDownRef = useRef<HTMLDivElement>(null);

  const [selectedValue, setSelectedValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOutside = (event: React.MouseEvent<HTMLElement>) => {
    if (dropDownRef.current && !dropDownRef.current.contains(event.target as any)) {
      setIsOpen(false);
    }
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
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-row items-center text-body-md">
        {label ? `${name}: ` : ''}
        {selectedValue}
      </div>
      <div className="absolute right-3 top-6">{isOpen ? <DropdownUpIcon /> : <DropdownDownIcon />}</div>
      {isOpen && (
        <div
          className={clsx(
            'absolute py-4 border border-lightGrey top-16 left-0 bg-white z-10',
            className ? className : ''
          )}
        >
          {items.map((item) => {
            return (
              <div
                className="text-body-md px-3 py-3 bg-white hover:bg-lightGrey"
                onClick={() => {
                  setSelectedValue(item);
                  setIsOpen(false);
                }}
                key={item}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
