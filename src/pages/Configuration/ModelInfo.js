import React, { PureComponent } from 'react'
import { Button, Form, Input, Icon} from 'antd';

import {connect} from 'dva';
import styles from './ModelInfo.less';


const { TextArea } = Input

@connect(({ config }) => ({
  config,
}))
class ModelInfo extends PureComponent{
  render() {
    const { config, dispatch } = this.props
    const { model } = config
    const { currentSteps } = config

    const formItemLayout = {
      labelCol: {
        xs:{ span:24},
        sm:{span:8}
      },
      wrapperCol:{
        xs:{ span:25},
        sm:{ span:16}
      }
    };

    const handleNameChange = e =>{
      const payload = {};
      payload.name = e.target.value;
      dispatch({
        type:'config/updateModelInfoReduce',
        payload
      })
    };

    const handleDescriptionChange = e=>{
        const payload = {}
        payload.description = e.target.value;
        dispatch({
          type:'config/updateModelInfoReduce',
          payload
        })
    }

    const handleVersionChange = e=>{
      const payload = {}
      payload.version = e.target.value;
      dispatch({
        type:'config/updateModelInfoReduce',
        payload
      })
    }

    const handleFeaturesChange = e=>{
      const payload = {}
      payload.features = e.target.value;
      dispatch({
        type:'config/updateModelInfoReduce',
        payload
      })
    }




    return (
      <div className={styles.modelInfo}>
        <Form {...formItemLayout}>



          <Form.Item label='name'>
            <Input defaultValue={model.name} onChange={handleNameChange} />
          </Form.Item>
          <Form.Item label='description'>
            <TextArea defaultValue={model.description} onChange={handleDescriptionChange} />
          </Form.Item>

          <Form.Item label='version'>
            <Input defaultValue={model.version} onChange={handleVersionChange} />
          </Form.Item>


          <Form.Item label='Features'>
            <TextArea defaultValue={model.features} onChange={handleFeaturesChange} />
            <span style={{color:'blue'}}>Please specify features model supported.Separate Each feature with commas</span>
          </Form.Item>

        </Form>
      </div>
    )

  }
}

export default ModelInfo;
