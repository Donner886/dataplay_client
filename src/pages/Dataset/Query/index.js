import React, { PureComponent } from 'react';
import { Row, Col, Divider } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetTable from '@/components/Dataset/DatasetTable';
import QueryBuilder from './QueryBuilder';
import { getSessoinInfo } from '../../../utils/authority';


import styles from './index.less';

@connect(({ query, dataset }) => ({
  dataset,
  query
}))
class QueryPage extends PureComponent {
  render() {

    const { dataset, dispatch } = this.props;
    const userinfo = getSessoinInfo()
    const { currentQueryResult } = dataset;

    const handleQuery = () => {
      console.log('do query');
      dispatch({
        type: 'query/fetchQuery',
        payload: currentQuery,
      });
    };

    return (
      <PageHeaderWrapper>
        <div className={styles.getDataIn}>
          <Row gutter={16}>
            <Col>
              <QueryBuilder onQuery={handleQuery} />
            </Col>
          </Row>
          <Divider orientation="left">Predict Result</Divider>
          <Row>
            <DatasetTable
              dataSource={currentQueryResult.dataSource}
              columns={currentQueryResult.columns}
            />
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default QueryPage;
