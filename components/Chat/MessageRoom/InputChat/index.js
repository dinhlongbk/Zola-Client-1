import { LikeOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons';
import { uploadImgSingle } from 'actions/uploadImgActions';
import { Button, Input, Form, Upload } from 'antd';
import { SocketIOContext } from 'components/common/context/SocketIOContext';
import React, { useContext, useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
const prefix = 'message-room';
const c = classPrefixor(prefix);
const InputChat = () => {
  const [message, SetMessage] = useState('');
  const onHandleChangeMessage = e => {
    SetMessage(e.target.value);
    setType('String');
    if (e.target.value == '') {
      setStatus(false);
    } else {
      setStatus(true);
    }
  };
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const { socket } = useContext(SocketIOContext);
  const [file, setFile] = useState(null);
  const [type, setType] = useState('String');
  const [status, setStatus] = useState(false);
  const [multipleImage, setMutipleImage] = useState(false);
  const onFinish = values => {
    const formData = new FormData();
    if (file && multipleImage.length == 1) {
      formData.append('files', file);
      uploadImgSingle(formData).then(res => {
        socket.emit('send_and_recive', {
          message: res.data[0],
          type: type
        });
      });
    }
    // else if (file && multipleImage.length > 1) {
    //   for (let i = 0; i < multipleImage.length; i++) {
    //     formData.append('files', multipleImage[i]);
    //     uploadImgSingle(formData).then(res => {
    //       console.log(res);
    //       // socket.emit('send_and_recive', {
    //       //   message: res.data[0],
    //       //   type: type
    //       // });
    //     });
    //   }
    // }
    else {
      socket.emit('send_and_recive', {
        message: values.chatting,
        type: type
      });
    }
    resetFieldOnSubmit();
  };
  const resetFieldOnSubmit = () => {
    form.resetFields();
  };
  const onChangeFile = e => {
    if (e.fileList == '') {
      setType('String');
      setStatus(false);
      setFile(null);
    } else {
      setType('Image');
      setStatus(true);
      setFile(e.file.originFileObj);
      setMutipleImage(e.fileList);
    }
  };
  return (
    <>
      <Form className={c`chat_tab`} onFinish={onFinish} form={form}>
        <div className={c`icon_chat_tab`}>
          <div className={`content__inside`}>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              onChange={onChangeFile}
              listType="picture"
              className="upload-image-message"
              multiple
            >
              <Button icon={<i className="fa fa-image"></i>}></Button>
            </Upload>
            {/* <Upload>
            <Button icon={<i className="fa fa-paperclip"></i>}></Button>
          </Upload> */}
          </div>
        </div>
        <hr style={{ background: 'rgba(0, 0, 0, 0.1)' }} />
        <Form.Item
          name="chatting"
          style={{ width: '85%', display: 'inline-block' }}
        >
          {type && type === 'String' ? (
            <TextArea
              onChange={onHandleChangeMessage}
              value={message}
              placeholder="Nhập tin nhắn của bạn"
              autoFocus
              style={{ border: 'none', height: '64px' }}
            />
          ) : (
            <></>
          )}
        </Form.Item>
        <div className="icon" style={{ marginTop: '25px' }}>
          <Button>
            <SmileOutlined style={{ color: '#767676' }} />
          </Button>
          {status ? (
            <Button htmlType="submit">
              <SendOutlined />
            </Button>
          ) : (
            <Button>
              <LikeOutlined />
            </Button>
          )}
        </div>
      </Form>
    </>
  );
};

export default InputChat;
