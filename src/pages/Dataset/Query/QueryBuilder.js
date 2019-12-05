import React, { PureComponent } from 'react';
import { Row, Col, Input, Button, Tooltip, Modal, message, Card, Progress, Select, Icon, DatePicker } from 'antd';
import { connect } from 'dva';
import DatasetListSelector from '@/components/Dataset/DatasetListSelector';
import moment from 'moment';

import { getSessoinInfo } from '@/utils/authority';


import styles from './QueryBuilder.less';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

@connect(({ dataset }) => ({
  dataset,
}))
class QueryBuilder extends PureComponent {
  componentDidMount() {
    const userInfo = getSessoinInfo();
    const { dispatch } = this.props;
    dispatch({
      type: 'dataset/fetch',
      payload: userInfo,
    });

  };


  render() {

    const { dataset, dispatch } = this.props;
    const { currentDataset, selectedModel,selectedDataSetDesc } = dataset;


    const buildOption = (item, type) => {
      let icon = 'eye';
      return (
        <Option key={item.filename} value={item.id} type={type}>
          <span>
            {item.filename} <Icon type={icon}/>{' '}
          </span>
        </Option>
      );
    };

    const optionContents = dataset.modelList.map(item => {
      return buildOption(item, 'model');
    });


    const handleDatasetChange = (value,type) => {
      if (type === 'dataset') {
        const payload = {payload:value,type:type}
        dispatch({
          type: 'dataset/getDatasetDesc',
          payload: payload,
        });

      }
    };

    const handleModelChange = (value) => {
      dispatch({
        type: 'dataset/updateSelectedModel',
        payload: value,
      });

    };

    const timeRangeChange = (dates, dateString) => {
      dispatch({
        type: 'dataset/updateSelectedDateTime',
        payload: {
          'startTime': dateString[0],
          'endTime': dateString[1],
        },
      });
    };



    const timeRangeColumnChange = (value) => {
      dispatch({
        type: 'dataset/updateSelectedDateTimeColumnChange',
        payload: value
      });
    };


    const dateTimeColumnNameChange = (value, type) => {

      dispatch({
        type: 'dataset/updateSelectedDateTimeColumnChange',
        payload: value,
      });
    };

    const timeColumns = selectedDataSetDesc.map(item => {
      return (<Option key={item} value={item}>{item}</Option>);
    });


    const summitPredict = () => {
      const userInfo = getSessoinInfo();
      const payload = {
        'dataset': currentDataset,
        'model': selectedModel,
        'userInfo': userInfo,
      };
      //  check the pre-requirement
      Object.entries(currentDataset).forEach(([key, value]) => {
        if (key === undefined || value === '') {
          message.error(key + ' is empty, please assign firstly');
          return
        }
      });

      if (Object.entries(selectedModel).length <= 0 ){
        message.error('Please choose a model to predict firstly');
        return
      }

      dispatch({
        type: 'dataset/getService',
        payload: payload
      })




    };

    return (
      <div className={styles.queryBuilder}>
        <Row>
          <Card title='DataSet' bordered='true' hoverable='true'
                style={{
                  background: '#fff',
                  'box-shadow': '-2px 0px 0px 0px #666',
                  marginBottom: '10px',
                }}
          >
            <Col span={8}>
              <div>
                <h4>DataSet</h4>
                <DatasetListSelector
                  datasetList={dataset.list}
                  queryList={[]}
                  handleChange={handleDatasetChange}
                  selected={currentDataset.name}
                />
              </div>
            </Col>

              <Col span={6}>
                <div className={styles.queryAction}>
                  <h4>TimeRange Column</h4>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Select Time Column"
                    optionFilterProp="children"
                    value={currentDataset.timeRangeColumn}
                    onChange={timeRangeColumnChange}
                  >
                    { timeColumns }
                  </Select>
                </div>
            </Col>

            <Col span={10}>
              <div className={styles.queryAction}>
                <h4>DateRange</h4>
                {/*<Col span={8}>*/}
                {/*  <Input allowClear='True' onChange={dateTimeColumnNameChange.bind(this)} />*/}
                {/*</Col>*/}
                <Col span={16}>
                  <RangePicker
                    ranges={{
                      Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    showTime
                    format='YYYY/MM/DD HH:mm:ss'
                    onChange={timeRangeChange}
                  />
                </Col>
              </div>
            </Col>
          </Card>
        </Row>
        <Row>
          <Card title='Model' bordered='true' hoverable='true'
                style={{
                  background: '#fff',
                  'box-shadow': '-2px 0px 0px 0px #666',
                  marginBottom: '10px',
                }}
          >


            <Row>
              <Col span={8}>
                <div>
                  <h4>Model</h4>
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Select a model"
                    optionFilterProp="children"
                    value={selectedModel['filename']}
                    onChange={handleModelChange}
                  >
                    {optionContents}
                  </Select>
                </div>


              </Col>
              <Col>
                <div className={styles.queryAction}>
                  <p className={styles.alert}>
                    <span className={styles.queryAction}>Model Description: {selectedModel.description}</span>
                  </p>

                  <p className={styles.alert}>
                    <span className={styles.queryAction}>Model Features: {selectedModel.features}</span>
                  </p>


                </div>
              </Col>



            </Row>






          </Card>
          <Card
            title='Action' bordered='true' hoverable='true'
            style={{
              background: '#fff',
              'box-shadow': '-2px 0px 0px 0px #666',
              marginBottom: '10px',
            }}
          >
            <Button type='primary' onClick={summitPredict}> Predict </Button>
          </Card>
        </Row>


      </div>
    );
  }
}

export default QueryBuilder;
