import React, { PureComponent } from 'react';
import { Row, Col, Form, Button, Tooltip, Modal, Input, message, Select,DatePicker } from 'antd';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import DatasetListSelector from '@/components/Dataset/DatasetListSelector';
import Wordcloud from '../GG/wordcloud';

import styles from './index.less';
import { getSessoinInfo } from '../../../utils/authority';
import list from 'less/lib/less/functions/list';
import moment from 'moment';

const {RangePicker} = DatePicker
@connect(({ tchart }) => ({
  tchart,
}))
class TypeDrivenChart extends PureComponent {
  componentDidMount() {
    const userInfo = getSessoinInfo();
    const { dispatch } = this.props;
    dispatch({
      type: 'tchart/fetchAll',
      payload: userInfo,
    });
  };

  render() {

    const { dispatch,tchart } = this.props;
    const { currentDataset,selectedDataSetDesc,wordCloud } = tchart

    const datasetOptions = tchart.list.map(item => {
      return (<Option key={item.id} value={item.predicted}>{item.predicted}</Option>);
    });

    const channelOptionsl = selectedDataSetDesc.map(item => {
      return (<Option key={item} value={item}>{item}</Option>);
    });


    const handleDatasetChange = (value,type) => {
        const payload = {payload:value}
        dispatch({
          type: 'dataset/getDatasetDesc',
          payload: payload,
        });

    };


    const datasetChanged = (value) => {
      // get the time range of the predicted
      dispatch({
        type: 'tchart/updateSelected',
        payload: value,
      });

      const payload = {payload:value}
      dispatch({
        type: 'tchart/getDatasetDesc',
        payload: payload,
      });


    };

    const sentimentalChange = (value) =>{
      dispatch({
        type:'tchart/updateSelectedSentiment',
        payload:value
      })
    };


    const channelChange = (value) =>{
      dispatch({
        type:'tchart/updateSelectedChannel',
        payload:value
      })
    };

    const keyWordsChangeColumn = (value) =>{
      dispatch({
        type:'tchart/updateSelectedKeyWordsColumn',
        payload:value
      })
    };



    const timeRangeChange = (dates, dateString) => {
      dispatch({
        type: 'tchart/updateSelectedDateTime',
        payload: {
          'startTime': dateString[0],
          'endTime': dateString[1],
        },
      });
    };

    const appNameChaged = e => {
      const value = e.target.value
      dispatch({
        type:'tchart/updateAppName',
        payload:value
      })
    }


    const wordcloud = () => {
      dispatch({
        type:'tchart/getWordCloud',
        payload:currentDataset
      })
    }



    return (
      <PageHeaderWrapper>
        <div>
          <Row gutter={16} >
            <Col span={6}>
              <h3>Predicted DataSet</h3>
              <Select placeholder="Sentimental"
                      showSearch
                      style={{ width: '100%' }}
                      value={currentDataset.name}
                      onChange={datasetChanged}
              >
                {datasetOptions}
              </Select>

              <h3>Channel</h3>
              <Select placeholder="Channel"
                      showSearch
                      style={{ width: '100%' }}
                      value={currentDataset.channel}
                      onChange={ channelChange}
              >
                {channelOptionsl}
              </Select>

              <h3>App Name</h3>
              <Input placeholder="inMotion" onChange={appNameChaged} />

              <h3>KeyWords Column</h3>
              <Select placeholder="Channel"
                      showSearch
                      style={{ width: '100%' }}
                      value={currentDataset.keywordColumn}
                      onChange={ keyWordsChangeColumn　}
              >
                {channelOptionsl}
              </Select>



              <h3>Sentimental</h3>
              <Select placeholder="Sentimental"
                      showSearch
                      style={{ width: '100%' }}
                      onChange={sentimentalChange}
                      value={currentDataset.sentiment}
              >
                <Option value='positive'>Positive</Option>
                <Option value='negative'>Negative</Option>
              </Select>

              <h3>Time Range</h3>
              <RangePicker style={{width:'100%'}}
                ranges={{
                  Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                showTime
                format='YYYY/MM/DD HH:mm:ss'
                onChange={timeRangeChange}
              />



              <div style={{marginTop:'10px'}}>
                <Button type='primary' htmlType='button' onClick={wordcloud}>Word Cloud</Button>
              </div>


            </Col>
            <Col span={16}>
              <h3>WordCloud</h3>
              <Row>
                <img src={wordCloud}/>
              </Row>
            </Col>
          </Row>

        </div>

      </PageHeaderWrapper>
    );
  }
}

export default TypeDrivenChart;
