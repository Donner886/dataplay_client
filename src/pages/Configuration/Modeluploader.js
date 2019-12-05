import React, { PureComponent } from 'react'
import {Upload, Icon, message} from 'antd'
import {connect} from 'dva';
import { serverUri } from '../../defaultSettings'
import styles from './Modeluploader.less'

const { Dragger } = Upload

@connect(({ config }) => ({
  config,
}))
class Modeluploader extends PureComponent{
  render() {
    const { dispatch } = this.props;

    const checkname = name => {
      return name
        .split('.')
        .slice(0,-1)
        .join('.')
    }

    const checkType = type => {
      // if(type === 'pkl'){
      //   return 'pkl'
      // }
      // if(type === 'joblib'){
      //   return 'joblib'
      // }
      // message.error('Model file type is not supported.');
      return type
    }

    const props = {
      name: 'file',
      multiple: false,
      type:'post',
      withCredentials:true,
      action: serverUri + '/api/uploadModelFile',
      onChange(info){
        const { status } = info.file;
        if(status === 'done'){
          message.success(`${info.file.name} file upload successfully.`);
          const data = {
            name: checkname(info.file.name),
            content:info.file.name,
            type:checkType(info.file.type),
            size:info.file.size,
            description:info.file.description
          };
          dispatch(
           { type:'config/updateModelInfoReduce',  // uri of uploading file to server.
            payload: data,}
          )

        }else if(status === 'error'){
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div className={styles.modelUploader}>
        <Dragger {...props}>
          <p>
            <Icon type='inbox' />
          </p>
          <p>Click or drag file to this area to upload your model file.</p>
          <p>Support for a single upload.</p>
        </Dragger>
      </div>
    )
  }
}

export default Modeluploader;
