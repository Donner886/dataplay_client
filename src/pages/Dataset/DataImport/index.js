import React, { PureComponent } from 'react';
import { Row, Col, Steps, Button, message } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import DatasetUploader from './DatasetUploader';
import DatasetReview from './DatasetReview';
import DatasetInfo from './DatasetInfo';

import styles from './index.less';

const { Step } = Steps;

@connect(({ dataimport }) => ({
  dataimport,
}))
class GetDataIn extends PureComponent {
  render() {
    const { dataimport, dispatch } = this.props;
    const { currentStep } = dataimport;

    const next = () => {
      dispatch({
        type: 'dataimport/forward',
      });
    };

    const handleDone = () => {
      message.success('Processing complete!');
      dispatch(
        {
          type:'dataimport/initUploader',
        }
      );
    };

    const prev = () => {
      dispatch({
        type: 'dataimport/backward',
      });
    };

    const steps = [
      {
        title: 'Upload Dataset',
        content: <DatasetUploader />,
      },
      {
        title: 'Input Dataset Information',
        content: <DatasetInfo />,
      },
      {
        title: 'Review Dataset',
        content: <DatasetReview />,
      },
    ];

    return (
      <PageHeaderWrapper>
        <div>
          <Row gutter={16}>
            <Col span={16}>
              <Steps current={currentStep} size="small">
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={16}>
              <div className={styles.content}>{steps[currentStep].content}</div>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col offset={12} span={4}>
              <div className={styles.action}>
                {currentStep < steps.length - 1 && (
                  <Button type="primary" onClick={() => next()}>
                    Next
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button type="primary" onClick={handleDone}>
                    Done
                  </Button>
                )}
                {currentStep > 0 && (
                  <Button className={styles.actionButton} onClick={() => prev()}>
                    Previous
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default GetDataIn;
