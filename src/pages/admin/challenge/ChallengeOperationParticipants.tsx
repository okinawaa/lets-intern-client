import { z } from 'zod';
import { useMissionsOfCurrentChallenge } from '../../../context/CurrentChallengeProvider';
import { missionStatusType } from '../../../schema';


const ChallengeOperationParticipants = () => {
  const missions = useMissionsOfCurrentChallenge();
  return (
    <main>
      
     
    </main>
  );
};

export default ChallengeOperationParticipants;
