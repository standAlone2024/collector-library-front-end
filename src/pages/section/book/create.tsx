import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Router, { useRouter } from 'next/router';
import styled from 'styled-components';
import { useError } from '@view/etc';
import { authStore, bookStore, labelStore } from '@store';
import { fetchLabelList, ISectionOptLabel } from '@api/LabelApi';
import { createBook, IBookObject, ILabelExtra } from '@api/BookApi';
import AlertModal from '@view/etc/modals/AlertModal';
import { printLog } from '@util/Utils';
import { BasicContainer } from '@view/atoms';
import { BasicBook } from '@view/templates';

const ContentContainer = styled.div`
  width: 100%;
  height: calc(100% - 150px); // FloatingArea의 높이를 150px로 가정
  overflow-y: auto;
`;

const FloatingArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px; // 높이를 150px로 증가
  background-color: white;
  padding: 10px 15px;
  overflow-y: auto;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

const ExtractedTextGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  padding: 10px 0;
`;

const ExtractedTextButton = styled.button`
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LibraryBookCreate: React.FC = observer(() => {
    const router = useRouter();
    const { setErrorState } = useError();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sectionId, setSectionId] = useState(0);
    const [extractedText, setExtractedText] = useState<string[]>([]);
    const [inputValues, setInputValues] = useState<{[key: string]: string}>({
        title: '',
        description: '',
    });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [childInputFields, setChildInputFields] = useState<ISectionOptLabel[]>([]);

    const handleInputChange = (name: string, value: string) => {
        setInputValues(prev => ({...prev, [name]: value}));
    };

    const handleInputFocus = (name: string) => {
        setFocusedField(name);
    };

    const handleExtractedTextClick = (text: string) => {
        if (focusedField) {
            setInputValues(prev => ({
                ...prev,
                [focusedField]: prev[focusedField] + ' ' + text
            }));
        }
    };

    const handleExtractedTextChange = (text: string[]) => {
        setExtractedText(text);
    };

    useEffect(() => {
        const initAllData = async() => {
            if (!router.isReady) return;

            const _sectionId = router.query.sectionId;
            if (!_sectionId || Array.isArray(_sectionId)) {
                setErrorState(new Error("잘못된 접근입니다."), "잘못된 접근입니다.");
                router.push('/section/list');
                return;
            }
            setSectionId(Number(_sectionId));
            setIsLoading(true);
            try {
                if (authStore.isLoading) 
                    await authStore.loadUser();
                if (!authStore.isLoading && authStore.user) {
                    await fetchLabelList(Number(_sectionId));
                    setChildInputFields(labelStore.getLabels());
                    
                    // 동적으로 inputValues 초기화
                    const newInputValues = {...inputValues};
                    labelStore.getLabels().forEach(label => {
                        newInputValues[`label_${label.id}`] = '';
                    });
                    setInputValues(newInputValues);
                    setIsLoading(false);
                }
            } catch(err) {
                if(err instanceof Error)
                    setErrorState(err, "데이터 로드 실패");
                else
                    setErrorState(new Error('An unknown error occurred'));
                router.push('/section/book/list');
            }
        }

        initAllData();
    }, [router, router.isReady, router.query.sectionId, setErrorState]);


    const handleOnCreate = async(title: string, thumb_path?: string, description?: string, extracted_text?: string[]) => {
        printLog('Click 완료 ' + title.length);
        if(!title || title.length === 0)
            setErrorState(new Error("No title"), "제목은 필수값입니다.");
        setIsLoading(true);
        //TODO: order에 1이 계속 들어가고 있음 bookStore.getBooks.length 확인해 봐야 함
        const numberOfBook = bookStore.getBooks.length;
        printLog(sectionId, numberOfBook, title);
        const book = makeBook(sectionId, numberOfBook, title, thumb_path, description, extracted_text);
        if(book)
        {
            try{
                const id = await createBook(book);
                if(id)
                    setIsModalVisible(true);
            }catch (err) {
                if(err instanceof Error)
                    setErrorState(err, "데이터 생성 실패");
                else
                    setErrorState(new Error('An unknown error occurred'));
            }
        }
        setIsLoading(false);
    }

    const handleConfirm = () => {
        Router.push(`/section/book/list?sectionId=${sectionId}`);
        setIsModalVisible(false);
    }

    const gatherExtraLabel = () => {
        let labelExtra:ILabelExtra[] = [];
        childInputFields.map((field) => {
            labelExtra.push({
                id: field.id as number,
                order: field.order,
                label_name: field.label_name,
                content: inputValues[`label_${field.id}`],
            });
        });
        return labelExtra;
    }

    const makeBook = (sectionId: number, numberOfBook: number, title: string, thumb_path?: string, description?: string, extracted_text?: string[]) => {
        printLog(sectionId, numberOfBook, title);
        //주의! JavaScript에서 0은 falsy 값입니다. 따라서 !0은 true가 된다.
        if(!sectionId || typeof numberOfBook !== 'number' || !title)
        {
            setErrorState(new Error("Book need more information"), "필수값이 모두 입력되지 않았습니다.");
            return null;
        }
        const labelExtra = gatherExtraLabel();

        const book: IBookObject = {
            section_id: sectionId,
            order: (numberOfBook + 1),
            title,
            book_thumb_path: thumb_path,
            description,
            extracted_text,
            label_extra: labelExtra,
        };
        return book;
    }

    if(authStore.isLoading || isLoading)
        return <BasicContainer isAlignCenter={true} ><p>Loading...</p></BasicContainer>;

    return (
        <BasicContainer isAlignCenter={true}>
            <ContentContainer>
                <BasicBook
                    userId={authStore.user?.id as number}
                    onCreate={handleOnCreate}
                    onExtractedTextChange={handleExtractedTextChange}
                    onInputChange={handleInputChange}
                    onInputFocus={handleInputFocus}
                    inputValues={inputValues} >
                    {childInputFields.map((field) => (
                        <InputField
                            key={field.id}
                            type="text"
                            value={inputValues[`label_${field.id}`] || ''}
                            onChange={(e) => handleInputChange(`label_${field.id}`, e.target.value)}
                            onFocus={() => handleInputFocus(`label_${field.id}`)}
                            placeholder={field.label_name}
                            name={`label_${field.id}`}
                        />
                    ))}
                </BasicBook>
                <AlertModal 
                    isVisible={isModalVisible}
                    title='데이터 생성'
                    message='데이터 생성이 완료되었습니다.'
                    onConfirm={handleConfirm}
                />
            </ContentContainer>
            {extractedText.length > 0 && (
                <FloatingArea>
                    <h4>추출된 텍스트:</h4>
                    <ExtractedTextGrid>
                        {extractedText.map((text, index) => (
                            <ExtractedTextButton 
                                key={index}
                                onClick={() => handleExtractedTextClick(text)} >
                                {text}
                            </ExtractedTextButton>
                        ))}
                    </ExtractedTextGrid>
                </FloatingArea>
            )}
        </BasicContainer>
    )
});

export default LibraryBookCreate;