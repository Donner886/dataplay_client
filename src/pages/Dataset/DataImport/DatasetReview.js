import React, { PureComponent } from 'react';
import { Row, Button, message } from 'antd';
import { connect } from 'dva';

import { createDataset, addDatasetInfo } from '@/services/dataset';
import { getSessoinInfo } from '../../../utils/authority';


@connect(({ dataimport }) => ({
  dataimport,
}))
class DatasetReview extends PureComponent {
  render() {
    const { dataimport } = this.props;
    const { dataset } = dataimport;
    const userinfo = getSessoinInfo();
    const payload = { ...dataset , ...userinfo};
    payload.id = payload.name;

    const info = [];
    Object.keys(dataset).forEach(key => {
      info.push(
        <li>
          {key} : {dataset[key]}
        </li>
      );
    });

    const handleCreate = () => {
      const response = addDatasetInfo(payload);
      response.then(
        function() {
          message.success(`dataset ${dataset.name} has been created!`);
        },
        function(error) {
          message.error(`failed to create ${dataset.name} due to ${error}`);
        }
      );
    };
    return (
      <div>
        <Row gutter={16}>
          <p>following dataset will be added</p>
          {info}
          <p>
            click <Button size="small" type="primary" icon="save" onClick={handleCreate} /> button
            to create the dataset
          </p>
        </Row>
      </div>
    );
  }
}

export default DatasetReview;
