import { useEffect, useState } from 'react';
import cn from 'classnames';

import styles from './MemberSelect.module.scss';
import AlertModal from '../../../components/AlertModal';
import { useNavigate, useParams } from 'react-router-dom';

interface MemberSelectProps {
  setApplyPageIndex: (applyPageIndex: number) => void;
}

const MemberSelect = ({ setApplyPageIndex }: MemberSelectProps) => {
  const navigate = useNavigate();
  const params = useParams();

  const [memberChecked, setMemberChecked] = useState<'USER' | 'GUEST' | ''>('');
  const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
  const [isLoginModal, setIsLoginModal] = useState(false);

  const handleMemberSelected = (newMemberValue: 'USER' | 'GUEST') => {
    setMemberChecked(newMemberValue);
    setIsLoginModal(true);
  };

  const handleNextButtonClicked = () => {
    if (!isNextButtonDisabled) {
      setApplyPageIndex(2);
    }
  };

  const handleAlertConfirm = () => {
    setIsLoginModal(false);
    navigate(`/login?redirect=/program/detail/${params.programId}`);
    setMemberChecked('USER');
  };

  const handleAlertClose = () => {
    setIsLoginModal(false);
    memberChecked === 'GUEST'
      ? setMemberChecked('GUEST')
      : setMemberChecked('');
  };

  useEffect(() => {
    if (memberChecked !== '') {
      setIsNextButtonDisabled(false);
    } else {
      setIsNextButtonDisabled(true);
    }
  }, [memberChecked]);

  return (
    <div
      className={styles.content}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={styles.top}>
        <ul>
          <li onClick={() => handleMemberSelected('USER')}>
            {memberChecked === 'USER' && (
              <i>
                <img src="/icons/check.svg" alt="체크" />
              </i>
            )}
            <span>회원 신청</span>
          </li>
          <li onClick={() => handleMemberSelected('GUEST')}>
            {memberChecked === 'GUEST' && (
              <i>
                <img src="/icons/check.svg" alt="체크" />
              </i>
            )}
            <span>비회원 신청</span>
          </li>
        </ul>
      </div>
      {isLoginModal && memberChecked === 'USER' && (
        <AlertModal
          title="로그인이 필요합니다."
          onConfirm={handleAlertConfirm}
          onCancel={handleAlertClose}
          highlight="confirm"
        >
          회원 신청을 하기 위해서는
          <br />
          로그인이 필요합니다.
          <br />
          로그인 페이지로 이동하시겠습니까?
        </AlertModal>
      )}
      {isLoginModal && memberChecked === 'GUEST' && (
        <AlertModal
          title="회원으로 지원하면 마이페이지에서<br />신청현황을 확인하실 수 있습니다."
          onConfirm={handleAlertConfirm}
          onCancel={handleAlertClose}
          highlight="confirm"
          confirmText="회원으로 신청"
          cancelText="비회원으로 신청"
        >
          비회원으로 지원 시 다시 지원하거나
          <br />
          취소할 수 없습니다.
        </AlertModal>
      )}
      <button
        onClick={handleNextButtonClicked}
        className={cn('next-button', {
          disabled: isNextButtonDisabled,
        })}
      >
        다음
      </button>
    </div>
  );
};

export default MemberSelect;
