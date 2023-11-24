import styled from 'styled-components';

import ActionButton from '../ActionButton';
import Table from '../Table';
import UserTableHead from './UserTableHead';
import UserTableBody from './UserTableBody';

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const ActionButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
`;

const ProgramUsers = () => {
  return (
    <>
      <Top>
        <Heading>참여자 보기 - 챌린지 1기</Heading>
        <ActionButtonGroup>
          <ActionButton bgColor="blue">등록</ActionButton>
          <ActionButton to="/admin/programs/1/check-attendance" bgColor="blue">
            출석체크
          </ActionButton>
        </ActionButtonGroup>
      </Top>
      <Table>
        <UserTableHead />
        <UserTableBody />
      </Table>
    </>
  );
};

export default ProgramUsers;
