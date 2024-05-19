import './FileDrop.scss';
import React, { useRef, useState, MutableRefObject } from 'react';

interface Props {
  children: any;
  borderRadius?: string;
  onSendFiles: (files: Blob) => void;
}

const FileDrop = ({ children, borderRadius, onSendFiles }: Props) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef: MutableRefObject<HTMLInputElement> = useRef({} as HTMLInputElement);

  const handleDrag = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files[0]) {
      onSendFiles && onSendFiles(e.dataTransfer.files[0] as Blob);
    }
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const inputChangeHandler = async (evt: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    evt.preventDefault();
    const fileList: FileList = evt.target.files || ({} as FileList);
    const files: File[] = [];

    // @ts-ignore
    for (const item of fileList) {
      files.push(item);
    }

    onSendFiles && onSendFiles(files[0] as Blob);
    evt.target.value = '';
  };

  return (
    <form className={'component-file-drop'} onMouseEnter={() => setDragActive(true)} onDragEnter={handleDrag}>
      {children}
      <input ref={inputRef} onChange={inputChangeHandler} type="file" className={'component-file-drop__input'} multiple={true} accept="image/*" />
      {dragActive && (
        <div
          className={'component-file-drop__drag-element'}
          style={{ borderRadius: borderRadius ? borderRadius : '100%' }}
          onClick={handleClick}
          onMouseLeave={() => setDragActive(false)}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {/* <AddAPhotoIcon color="warning" /> */}
        </div>
      )}
    </form>
  );
};

export default FileDrop;
