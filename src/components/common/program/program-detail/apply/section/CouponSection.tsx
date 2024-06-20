import axios from '../../../../../../utils/axios';
import Input from '../../../../ui/input/Input';
import { PayInfo } from '../../section/ApplySection';
import { useState } from 'react';

interface CouponSectionProps {
  setPayInfo: (payInfo: (prevPayInfo: PayInfo) => PayInfo) => void;
  programType: string;
}

const CouponSection = ({ setPayInfo, programType }: CouponSectionProps) => {
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string>('');

  const fetchCouponAvailability = async () => {
    try {
      const res = await axios.get(`/coupon`, {
        params: {
          code: code,
          programType: programType.toUpperCase(),
        },
      });
      setPayInfo((prevPayInfo: PayInfo) => ({
        ...prevPayInfo,
        couponId: res.data.data.couponId,
        couponPrice: res.data.data.discount,
      }));
    } catch (error) {
      setPayInfo((prevPayInfo: PayInfo) => ({
        ...prevPayInfo,
        couponId: null,
        couponPrice: 0,
      }));
      setError('쿠폰 등록에 실패하였습니다.');
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setError('');
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="font-semibold text-neutral-0">쿠폰 등록</div>
      <div className="flex w-full gap-2.5 items-center justify-start">
        <Input
          type="text"
          className=""
          placeholder="쿠폰 코드 입력"
          value={code}
          onChange={handleCodeChange}
        />
        <button
          className="flex shrink-0 py-3 items-center justify-center rounded-sm bg-primary px-4 text-sm font-medium text-neutral-100"
          onClick={() => fetchCouponAvailability()}
        >
          쿠폰 등록
        </button>
      </div>
      { error && <div className='text-system-error text-sm h-3'>{error}</div> }
    </div>
  );
};

export default CouponSection;
