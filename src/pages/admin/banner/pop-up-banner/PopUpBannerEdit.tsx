import { useState } from 'react';
import PopUpBannerInputContent, {
  PopUpBannerInputContentProps,
} from '../../../../components/admin/banner/pop-up-banner/PopUpBannerInputContent';
import EditorTemplate from '../../../../components/admin/program/ui/editor/EditorTemplate';

const PopUpBannerEdit = () => {
  const [value, setValue] = useState<PopUpBannerInputContentProps['value']>({
    title: '',
    link: '',
    startDate: '',
    endDate: '',
    image: undefined,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue({ ...value, image: e.target.files });
    } else {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <EditorTemplate
      title="팝업 수정"
      onSubmit={handleSubmit}
      submitButton={{
        text: '수정',
      }}
      cancelButton={{
        text: '취소',
        to: '-1',
      }}
    >
      <PopUpBannerInputContent value={value} onChange={handleChange} />
    </EditorTemplate>
  );
};

export default PopUpBannerEdit;