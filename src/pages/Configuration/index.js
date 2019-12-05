import React, { PureComponent } from 'react';
import { Row, Col, Steps, Tabs, Button, Tooltip, Modal ,message} from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ConfigTab from './ConfigTab';
import Modeluploader from './Modeluploader'
import ModelReview from './ModelReview'
import ModelInfo from './ModelInfo'
import styles from './index.less';

const { TabPane } = Tabs;
const { confirm } = Modal;
const { Step} = Steps;

@connect(({ config }) => ({
  config,
}))
class Configuration extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'config/fetchAll',
    });
  }

  render() {
    const { config,dispatch } = this.props;
    const { currentStep } = config;

    const next = () => {
      dispatch({
        type:'config/forward'
      })
    };

    const  prev = () => {
      dispatch({
        type:'config/backward'
      })
    }

    const steps = [
      {
        title: 'Upload Model File',
        content: <Modeluploader />,
      },
      {
        title: 'Input Model Information',
        content: <ModelInfo />,
      },
      {
        title: 'Review Model',
        content: <ModelReview />,
      },
    ];





// build tab content and tab name is specified by domain
    const buildTabContent = (data, domain) => {
      // deal with row
      const callback = row => {
        if ((row.filename.indexOf('pkl') === -1) && (row.filename.indexOf('joblib') === -1) && (row.filename.indexOf('specific functionality') === -1)) {
          message.warn('Sorry, we only deploy pkl or joblib file to be model service only')
          return;
        }
        const content = row.isDeployed === false ? `When clicked the OK button, ${row.filename}.
           will be a model service to generate a callable api and a interface to predict`:
          `When clicked the OK button, ${row.filename}.
           will not be a model service, which means it couldn't supply prediction`
        confirm({
          title: 'Do you confirm to deploy the model?',
          content: content,
          onOk() {

            row.isDeployed = !row.isDeployed
            dispatch({
              type: 'config/updateModelInfo',
              payload: row,
            });
            dispatch({
              type: 'config/fetchAll',
            });

          },
          onCancel() {},
        });
      };
      return <ConfigTab data={data} handleChange={callback} />;
    };

    const buildTabPanel = () => {
      const tabs = [];
      Object.keys(config).forEach(domain => {
        if(Array.isArray(config[domain])){
          const content = buildTabContent(config[domain], domain);
          tabs.push(
            <TabPane tab={domain} key={domain}>
              {content}
            </TabPane>
          );
        }

      });
      return tabs;
    };

    const handleSave = () => {};
    const handleDone = () =>　{
      message.success('Processing complete!');
      dispatch(
        {
        type:'config/initUploader',
        }
      );
      dispatch(
        {
          type:'config/fetchAll'
        }
      )
    }

    return (
      <PageHeaderWrapper>

        <div className={styles.importBorder}>
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



        <div>
          <Row type="flex" justify="end">
            <Col span={6}>
              <div className={styles.configHeader}>
                <Tooltip placement="top" title="save configuration">
                  <Button icon="save" onClick={handleSave} />
                </Tooltip>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Tabs>{buildTabPanel()}</Tabs>
            </Col>
          </Row>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Configuration;
