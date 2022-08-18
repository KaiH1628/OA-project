import React, { useEffect, useState } from 'react';
import $http from 'api';
import { Upload, Modal } from 'antd';

const UploadComponent = ({ avatar=null, newAvatar }) => {
  const [token, setToken] = useState('');
  const [fileList, setFileList] = useState([]);
  const [previewImg, setPreviewImg] = useState(null);
  const [isShowModal, setIsShowModal] = useState(false);

  useEffect(() => {
    if (avatar) {
      setFileList([{ url: avatar }]);
      setPreviewImg(avatar);
    }
    getToken();
  }, []);

  //获取token
  const getToken = async () => {
    const { data } = await $http.getUploadToken({
      bucket: 'oademo',
      uploadUrl: 'rgjo0zotc.hd-bkt.clouddn.com',
      accessKey: '-nIwYjYgarBHXmCutaAHAXaOzhMQ2C6Xc3AjrCwb',
      secretKey: 'M8lUp2deC6qdH8aQWsUUemDxgpeO-Q21be6lMg73',
    });
    // console.log(res);
    setToken(data);
  };

  //图片预览处理函数
  const handlePreview = () => {
    setIsShowModal(true);
  };
  //图片改变事件
  const handleChange = (info) => {
    setFileList(info.fileList);
    if (info.file.status === 'done') {
      setPreviewImg('//' + info.file.response.url);
      newAvatar('//' + info.file.response.url);
    }
    if (previewImg || avatar) {
      deletePreviewImg();
    }
  };

  //预览关闭
  const handlePreClose = () => {
    setIsShowModal(false);
  };

  //删除之前的图片
  const deletePreviewImg = async () => {
    const res = await $http.deleteFile({
      bucket: 'oademo',
      fileName: previewImg ? previewImg : avatar,
      accessKey: '-nIwYjYgarBHXmCutaAHAXaOzhMQ2C6Xc3AjrCwb',
      secretKey: 'M8lUp2deC6qdH8aQWsUUemDxgpeO-Q21be6lMg73',
    });
  };

  return (
    <>
      <Upload
        maxCount={1}
        action="https://up-z0.qiniup.com/"
        listType="picture-card"
        fileList={fileList}
        data={{ token }}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        选择图片
      </Upload>

      <Modal
        visible={isShowModal}
        footer={null}
        closable={false}
        onCancel={handlePreClose}
      >
        <img src={previewImg} style={{ width: '100%' }} />
      </Modal>
    </>
  );
};

export default UploadComponent;
