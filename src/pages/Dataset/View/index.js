import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import DatasetListSelector from '@/components/Dataset/DatasetListSelector';
import DatasetTable from '@/components/Dataset/DatasetTable';
import { getSessoinInfo } from '../../../utils/authority';

@connect(({ dataset, query, loading }) => ({
  dataset,
  query,
  loading: loading.effects['dataset/fetch'],
}))
class Dataset extends PureComponent {
  componentDidMount() {
    const userInfo = getSessoinInfo();
    const { dispatch } = this.props;
    dispatch({
      type: 'dataset/fetch',
      payload: userInfo
    });
  }

  render() {
    const { dataset, query, dispatch } = this.props;
    const { dataSource, columns, name } = dataset.currentDataset;
    const savedQueryList = [];

    Object.keys(query.savedQuery).forEach(key =>
      savedQueryList.push({ name: query.savedQuery[key].name })
    );

    const handleChange = (value, type) => {
      console.log(`selected ${value}`);
      if (type === 'dataset') {
        dispatch({
          type: 'dataset/fetchSelected',
          payload: value,
        });
      } else if (type === 'query') {
        const selectedQuery = query.savedQuery[value];
        dispatch({
          type: 'dataset/updateSelected',
          payload: selectedQuery,
        });
      }
    };

    return (
      <PageHeaderWrapper>
        <div>
          <Row gutter={16}>
            <Col span={8}>
              <Row>
                <DatasetListSelector
                  datasetList={dataset.list}
                  queryList={savedQueryList}
                  handleChange={handleChange}
                  selected={name}
                />
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <DatasetTable dataSource={dataSource} columns={columns} />
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Dataset;
