import styled from 'styled-components';

import TD from '../TD';
import ActionButton from '../ActionButton';

interface TableBodyProps {
  programList: any;
  copyReviewCreateLink: any;
}

const TableBody = ({ programList, copyReviewCreateLink }: TableBodyProps) => {
  return (
    <thead>
      {programList.map((program: any) => (
        <tr>
          <TD>{program.title}</TD>
          <TD>{program.announcementDate}</TD>
          <TD>
            <ButtonGroup>
              <ActionButton to={`/admin/reviews/${program.id}`} bgColor="blue">
                상세
              </ActionButton>
              <ActionButton
                bgColor="lightBlue"
                width="6rem"
                onClick={() => copyReviewCreateLink(program.id)}
              >
                링크 복사하기
              </ActionButton>
            </ButtonGroup>
          </TD>
        </tr>
      ))}
    </thead>
  );
};

export default TableBody;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;
