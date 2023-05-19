'use client';

import React from 'react';
import { Range } from 'react-date-range';

import Calendar from '../inputs/Calendar';
import Button from '../Button';

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates?: Date[];
}

const ListingReservations: React.FC<
  ListingReservationProps
> = ({
  price,
  totalPrice,
  disabledDates,
  disabled,
  onChangeDate,
  onSubmit,
  dateRange,
}) => {
  return (
    <div className="bg-white border rounded-xl border-neutral-200 overflow-hidden">
      <div className="flex flex-row gap-1 p-4 items-center">
        <span className="text-2xl font-semibold">
          $ {price}
        </span>
        <p className="font-ligth text-neutral-600">
          night
        </p>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) =>
          onChangeDate(value.selection)
        }
      />
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          onClick={onSubmit}
          label="Reserve"
        />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <h2>Total</h2>
        <span>$ {totalPrice}</span>
      </div>
    </div>
  );
};

export default ListingReservations;
