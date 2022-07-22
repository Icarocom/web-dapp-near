import React, { useState } from 'react';
import clsx from 'clsx';

const BASE_CLASSES = 'relative w-14 h-8 rounded-3xl cursor-pointer transition-all delay-300';
const ON_CLASSES = 'bg-primary';
const OFF_CLASSES = 'bg-lightGrey';

const BALL_BASE_CLASSES = 'absolute w-7 h-7 rounded-full bg-white cursor-pointer transition-all delay-500';
const BALL_ACTIVE_CLASSES = 'top-[2px] right-[2px]';
const BALL_INACTIVE_CLASSES = 'top-[2px] left-[2px] shadow-3xl';

interface Props {
  label: boolean;
  isOn: boolean;
  onChange: () => void;
}

export const SwitchBox: React.FC<Props> = ({ label, isOn, onChange }) => {
  return (
    <div className="flex justify-center items-center gap-4">
      {label && <p className="text-body-md text-darkGrey hidden xs:block">{isOn ? 'Active' : 'InActive'}</p>}
      <div className={clsx(BASE_CLASSES, isOn ? ON_CLASSES : OFF_CLASSES)} onClick={() => onChange()}>
        <div className={clsx(BALL_BASE_CLASSES, isOn ? BALL_ACTIVE_CLASSES : BALL_INACTIVE_CLASSES)}></div>
      </div>
    </div>
  );
};
