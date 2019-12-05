import React, { PureComponent } from 'react';
import { Row, Col, Form, Button, Tooltip, Modal, Input, message ,Select} from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetListSelector from '@/components/Dataset/DatasetListSelector';
import Condition from './conditions'
import Result from '../TD/result'
import styles from './index.less';

const { Option } = Select;



class GrammerGraph extends PureComponent {


  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <PageHeaderWrapper>
        <div>
          <Row gutter={16}>
            <Col span={8}>
              <h3 className={styles.title_margin}>Specify Analysis Logic</h3>
              <Condition />
            </Col>
            <Col span={16}>
              <h3 className={styles.title_margin}>DataSet Description And Dashboard</h3>
              <Result />
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default GrammerGraph;
