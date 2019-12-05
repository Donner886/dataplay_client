import React, { PureComponent } from 'react'
import { Row, Button, message } from 'antd'
import {connect} from 'dva';
import { getSessoinInfo } from '../../utils/authority';

import { createModel} from '@/services/dataset';
import construct from '@babel/runtime/helpers/esm/construct';
import { use } from 'umi/src/runtimePlugin';

@connect(({ config }) => ({
  config,
}))
class ModelReview extends PureComponent{
  render() {
    const { config } = this.props
    const { model } = config
    const userinfo = getSessoinInfo()
    const payload= {...model, ...userinfo}

    const info = []
    Object.keys(model).forEach(key =>{
      info.push(
        <li>
          {key} : {model[key]}
        </li>
      )
    });

    const handleCreate = () =>{
      const response = createModel(payload);
      response.then( _=> {
        message.success(`Model ${model.name} has been created!`)
      }, error =>{
        message.error(  `Failed to create ${model.name} due to ${error}`)
      })
    };


    return (
      <div>
        <Row gutter={16}>
          <p>Following model will be added</p>
          {info}
          <p>
            click <Button size='large' type='primary' icon='save' onClick={handleCreate} />
            button to create the model
          </p>
        </Row>
      </div>
    )
  }
}

export default ModelReview
