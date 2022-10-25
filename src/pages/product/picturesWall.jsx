import { PlusOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import React, { useImperativeHandle, useState, forwardRef, useEffect } from 'react';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const App = (props, ref) => {
  
  const [previewOpen, setPreviewOpen] = useState(false);    // 预览图显示状态
  const [previewImage, setPreviewImage] = useState('');     // 预览图路径
  const [previewTitle, setPreviewTitle] = useState('');     // 预览图标题
  const [fileList, setFileList] = useState([
    {
      uid: '-1',        // 每个file都需要有唯一的uid, 建议设置为负数，防止冲突
      name: 'image.png',            // 图片文件名
      status: 'done',               // 图片上传状态  *uploading 正在上传中  * removed 已删除
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }
  ]);
  useEffect(() => {
    // 动态显示数据库中已上载的图片
    // const {imgs} = props
    // let fileList = []
    // if(imgs && imgs.length > 0){
    //     // console.log(imgs);
    //     fileList = imgs.map((img, index) => ({
    //         uid: -index,
    //         name: img,
    //         status: 'done',
    //         url: BASE_IMG_URL + img
    //     }))
    //     setFileList(fileList) 
    // }
  }, [])

  console.log(ref);
  useImperativeHandle(ref, () => ({ 
    getImgs: () => {
        return fileList.map( item => {
            if( item.status === 'done'){
                return {
                    name: item.name,
                    url: item.url
                }
            }else{
              return null
            }
        })
    }
  }))

  const handleCancel = () => setPreviewOpen(false);

  // 显示预览大图
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = async({ fileList: newFileList, file: newFile }) => {
    // console.log(newFileList, newFile);
    if(newFile.status === 'done'){
        const result = newFile.response()
        if(result.status === 0){
            message.success('上传图片成功！')
        }else{
            message.error('上传图片失败')
        }
    }else if(newFile.status === 'error'){
        message.error('上传图片失败o(╥﹏╥)o')
    }else if(newFile.status === 'removed'){
        message.info("图片已删除")

        // 有接口后的写法
        // const result = await reqDeleteImage(newFile.name)
        // if(result.status === 0){
        //     message.success("删除图片成功")
        // }else{
        //     message.error("删除图片失败")
        // }
    }
    setFileList(newFileList)
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        action="/manage/img/upload"  /*上传图片的接口地址 */
        accept='image/*'            /* 上传文件的格式 */
        name = 'image'              /* 指定请求参数的名字 */
        listType="picture-card"
        fileList={fileList}         /* 所有已经上传图撇文件对象的数组 */
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 3 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default forwardRef(App);