import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import Metatags from 'components/Metatags';
import { ProjectIcon, TargetIcon, LeftIcon, RightIcon } from 'components/icons';

export default function Dashboard() {
  return (
    <main>
      <Metatags title="Dashboard" description="Catch | Dashboard" />
      <div className="flex items-center justify-center min-h-full px-0 py-12 sm:px-6 lg:px-8 relative">
        <div className="w-full space-y-8 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-heading-xl text-center text-gray-900 uppercase">
            Dashboard
          </h2>
          <div className="flex mx-auto h-[120px] bg-white rounded-none sm:rounded-3xl border border-lightGrey mt-10">
            <div className="w-1/3 min-w-[220px] h-[120px] flex flex-col items-center justify-center">
              <p className="text-heading-sm sm:text-heading-lg">0</p>
              <p className="text-body-sm sm:text-body-md text-darkGrey">Redeemed items</p>
            </div>
            <div className="w-1/3 min-w-[220px] h-[120px] flex flex-col items-center justify-center border border-t-0 border-b-0 border-l-lightGrey border-r-lightGrey relative">
              <p className="text-heading-sm sm:text-heading-lg">0</p>
              <p className="text-body-sm sm:text-body-md text-darkGrey">Total items</p>
              <div className="absolute w-6 h-6 top-12 -left-[11px]">
                <ProjectIcon />
              </div>
              <div className="absolute w-6 h-6 top-12 -right-[13px]">
                <TargetIcon />
              </div>
            </div>
            <div className="w-1/3 min-w-[220px] h-[120px] flex flex-col items-center justify-center">
              <p className="text-heading-sm sm:text-heading-lg">0</p>
              <p className="text-body-sm sm:text-body-md text-darkGrey pt-1">Vouchers</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col md:flex-row justify-center gap-6">
            <div className="sm:w-[630px] md:w-[552px] h-80 border border-lightGrey rounded-3xl p-8">
              <div className="flex justify-between items-start">
                <div className="flex flex-col justify-start">
                  <p className="text-heading-sm uppercase">my performance</p>
                  <p className="text-body-md">Redeemed NFTs / day</p>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <p className="text-darkGrey text-body-sm cursor-pointer">
                    <LeftIcon />
                  </p>
                  <p className="text-darkGrey text-body-md cursor-pointer">This week</p>
                  <p className="text-darkGrey text-body-sm cursor-pointer">
                    <RightIcon />
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:w-[630px] md:w-80 h-80 rounded-3xl bg-primary flex flex-col justify-center items-center pb-8 pt-[72px] relative">
              <CircularProgressbar
                value={3}
                strokeWidth={8}
                styles={buildStyles({
                  textColor: '#FFCE76',
                  pathColor: '#FFCE76',
                  textSize: '18',
                  trailColor: 'white',
                })}
              />
              <div className="absolute top-[132px] flex items-end justify-center">
                <p className="text-secondary text-heading-lg">3</p>
                <p className="text-secondary pb-[3px] text-heading-md">%</p>
              </div>
              <p className="mt-9 text-heading-sm text-white uppercase">Total NFTs Redeemed</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
