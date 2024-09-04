import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BasicContainer } from '@view/atoms';
import styled from 'styled-components';
import { authStore, sectionStore } from '@store';
import { uploadImage } from '@api/ImageApi';
import { S3_PATH, PATH_BOOK } from '@util/constans';
import { fetchSection, ISectionNLabel } from '@api/SectionApi';
import { createLabel, deleteLabel, ISectionOptLabel } from '@api/LabelApi';
import Router, { useRouter } from 'next/router';
import { useError } from '@view/etc';
import {printLog, swapOriginal} from '@util/Utils';
import InputModal from '@view/etc/modals/InputModal';
import ConfirmModal from '@view/etc/modals/ConfirmModal';

const ImageContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  position: relative; // 배경 이미지를 위해 추가
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const FileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const LabelContainer = styled.div`
display: flex;
  flex-direction: row;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Label = styled.div`
  flex: 1;
  padding: 5px;
`;

const DeleteButton = styled.div`
  flex: 1;
  padding: 5px;
`;

const ContentInput = styled.input`
  flex: 3;
  padding: 5px;
  border: 1px solid;
  border-radius: 4px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; // 이미지 비율을 유지하면서 전체가 표시되도록 함
  position: relative; // 배경 이미지 위에 표시되도록 함
  z-index: 1; // 배경 이미지 위에 표시되도록 함
`;

const BackgroundImage = styled.div<{ src: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  filter: blur(10px); // 배경 흐림 효과
  opacity: 0.5; // 배경 투명도
`;

export const ImageComponent = React.memo(function ImageComponent({ src }: { src: string }) {
    return (
        <>
          <BackgroundImage src={src} />
          <StyledImage src={src} alt="Book" />
        </>
    );
});

export const NoImageComponent = React.memo(function NoImageComponent() {
    return (
        <>
          <BackgroundImage src='/icons/no_photography.png' />
          <StyledImage src='/icons/no_photography.png' alt="Book" />
        </>
    );
});

const SectionUpdate: React.FC = observer(() => {
    const router = useRouter();
    const { setErrorState } = useError();
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalShow, setIsAddModalShow] = useState(false);
    const [isDelModalShow, setIsDelModalShow] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<{ file: File, preview: string } | null>(null);
    const [updatedSectionData, setUpdatedSectionData] = useState<ISectionNLabel | null>(null);
    const [sectionData, setSectionData] = useState<ISectionNLabel | null>(null);
    const [delTargetId, setDelTargetId] = useState<number>(0);

    useEffect(() => {
        const initAllData = async () => {
            if(!router.isReady) return;

            const sectionId = router.query.sectionId;
            if(!sectionId || Array.isArray(sectionId)) {
                setErrorState(new Error("잘못된 접근입니다."), "잘못된 접근입니다.");
                router.push('/section/list');
                return;
            }

            try{
                if (authStore.isLoading) 
                    await authStore.loadUser();
                if (!authStore.isLoading && authStore.user)
                {
                    await fetchSection(Number(sectionId));
                    const sectionNLabel = sectionStore.getSectionNLabel();
                    if(sectionNLabel) {
                        setSectionData(sectionNLabel);
                        setUpdatedSectionData(sectionNLabel);
                    }
                    setIsLoading(false);
                }
            }catch(err) {
                if(err instanceof Error)
                    setErrorState(err, "데이터 로드 실패");
                else
                    setErrorState(new Error('An unknown error occurred'));
            }
        };
        initAllData();
    }, [router, router.isReady, router.query.sectionId, setErrorState]);

    const handleImageChange = () => {
        fileInputRef.current?.click();
    }

    const handleImageDelete = () => {
        alert('delete image api call');
    }

    const handleFileChange = useCallback(async(event: React.ChangeEvent<HTMLInputElement>, userId: number | undefined) => {
        const file = event.target.files?.[0];
        if (file && userId) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage({
                file,
                preview: reader.result as string
                });
            };
            reader.readAsDataURL(file);
            //TODO image upload만 하도록 BE에 옵션 추가 해야 함
            const imageResult = await uploadImage(file, userId, PATH_BOOK);
            if(imageResult && updatedSectionData){
                setUpdatedSectionData({
                    ...updatedSectionData,
                    sec_thumb_path: imageResult.thumbnail_path
                });
            }
        }
    }, [updatedSectionData]);

    const handleContentChange = (key: string, value: string) => {
        if (updatedSectionData) {
            if (key === 'label') {
                setUpdatedSectionData({
                    ...updatedSectionData,
                    label: value
                });
            } else {
                const updatedLabelExtra = updatedSectionData.label_extra?.map(item =>
                    'key' + item.id === key ? { ...item, label_name: value } : item
                );
                setUpdatedSectionData(prev => ({
                    ...prev!,
                    label_extra: updatedLabelExtra
                }));
            }
        }
    };

    const handleUpdate = async() => {
        printLog(updatedSectionData);
    }

    const handleAddLabel = async(input: string) => {
        printLog('input: ' + input);
        setIsLoading(true);
        if(sectionData?.id)
        {
            const label: ISectionOptLabel = {
                section_id: sectionData.id,
                label_name: input,
                order: (sectionData?.label_extra.length) ? (sectionData?.label_extra.length + 1) : 1
            };
            try{
                await createLabel(label);
            }catch(err) {
                if(err instanceof Error)
                    setErrorState(err, "Label 추가 실패");
                else
                    setErrorState(new Error('An unknown error occurred'));
            }finally{
                setIsAddModalShow(false);
                setIsLoading(false);
            }
        }
    }

    const handleShowModal = () => {
        setIsAddModalShow(true);
    }

    const handleCancel = () => {
        setIsAddModalShow(false);    
    }

    const handleDeleteLabel = async() => {
        if(delTargetId !== 0)
        {
            setIsLoading(true);
            try{
                await deleteLabel(delTargetId);
            }catch(err) {
                if(err instanceof Error)
                    setErrorState(err, "Label 삭제 실패");
                else
                    setErrorState(new Error('An unknown error occurred'));
            }finally{
                setIsDelModalShow(false);
                setIsLoading(false);
            }
        }
    }

    const handleDelShow = (labelId: number) => {
        setDelTargetId(labelId);
        setIsDelModalShow(true);
    }

    const handleDelHide = () => {
        setIsDelModalShow(false);
    }

    let originPath = '';
    if(sectionData?.sec_thumb_path)
        originPath = swapOriginal(sectionData.sec_thumb_path);

    const imageSrc = useMemo(() => {
        if (selectedImage?.preview) {
            return selectedImage.preview;
        } else if (originPath) {
            return S3_PATH + originPath;
        }
        return '';
    }, [selectedImage, originPath]);

    if(isLoading)
        return (<BasicContainer isAlignCenter={true}><p>Loading book info...</p></BasicContainer>);

    return (
        <BasicContainer isAlignCenter={true}>
            <ImageContainer>
                {imageSrc ? <ImageComponent src={imageSrc} /> : <NoImageComponent />}
            </ImageContainer>
            <ButtonContainer>
                <FileInput
                    key={selectedImage ? selectedImage.preview : "fileInputKey"}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, authStore.user?.id)}
                    ref={fileInputRef}
                />
                <Button onClick={handleImageChange}>이미지 변경</Button>
                <Button onClick={handleImageDelete}>이미지 삭제</Button>
            </ButtonContainer>
            <LabelContainer>
                <Label>제목</Label>
                <ContentInput
                    value={updatedSectionData?.label || ''}
                    onChange={(e) => handleContentChange('label', e.target.value)}
                />
            </LabelContainer>
            {updatedSectionData?.label_extra?.map((item, index) => (
                <LabelContainer key={index}>
                    <Label>{index + 1}번째 Label</Label>
                    <DeleteButton>
                        <Button onClick={() => handleDelShow(item.id as number)}>삭제</Button>
                    </DeleteButton>
                    <ContentInput
                        value={item.label_name}
                        onChange={(e) => handleContentChange('key' + item.id, e.target.value)}
                    />
                </LabelContainer>
            ))}
            <ButtonContainer>
                <Button onClick={handleShowModal}>Label 추가</Button>
                <Button onClick={handleUpdate}>수정 완료</Button>
            </ButtonContainer>
            <InputModal 
                isVisible={isAddModalShow}
                title='Label 추가'
                message='Label 이름을 입력해 주세요'
                onSubmit={handleAddLabel}
                onCancel={handleCancel}/>
            <ConfirmModal 
                key={`confirm-${delTargetId}`}
                isVisible={isDelModalShow}
                title='삭제 확인'
                message='삭제 하시겠습니까?' 
                cancelName='취소'
                confirmName='삭제'
                onConfirm={handleDeleteLabel}
                onCancel={handleDelHide}
                setIsVisible={setIsDelModalShow} />
        </BasicContainer>
    );
});

export default SectionUpdate;