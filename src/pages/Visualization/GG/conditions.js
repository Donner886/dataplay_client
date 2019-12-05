import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { connect } from 'dva';

import DynamicFormItem from './form';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  Row,
  Col,
  DatePicker, Card,
} from 'antd';

const { RangePicker } = DatePicker;

import { getSessoinInfo } from '../../../utils/authority';
import moment from 'moment';


const { Option } = Select;

@connect(({ analysis }) => ({
  analysis,
}))
class Condition extends PureComponent {

  componentDidMount() {
    const userInfo = getSessoinInfo();
    const { dispatch } = this.props;
    dispatch({
      type: 'analysis/fetchAll',
      payload: userInfo,
    });
  };


  render() {

    const { dispatch } = this.props;
    const { datasetsList, selectedDataset, selectedDatasetProperties, conditions, fields } = this.props.analysis;
    const datasetOptions = datasetsList.map(item => {
      return (<Option key={item.id} value={item.predicted}>{item.predicted}</Option>);
    });
    const datasetChanged = (value) => {
      // get the time range of the predicted
      dispatch({
        type: 'analysis/getDataSetInfo',
        payload: value,
      });

    };


    const multipleDimension = value => {
      dispatch({
        type:'analysis/multiDimensionAnalysis',
        payload:value
      })
    }


    // If we changed the selected dataset, should render condition option. This means we need automatically
    // Render techology.
    return (
      // select the predicted dataset to be analyzed
      <div>
        <Row>
          <Col span={6}><h4>Datasets</h4></Col>
          <Col span={16}>
            <Select
              placeholder="Select DataSet"
              require='True'
              onChange={datasetChanged}
              style={{ width: '100%' }}
              value={selectedDataset} >
              {datasetOptions}
            </Select>
          </Col>
        </Row>


        <Row>
          <DynamicFormItem dataset={selectedDataset} desc={selectedDatasetProperties} fields={fields}
                           onSubmit={value => multipleDimension(value)} conditions = { conditions } />
        </Row>


      </div>

    );
  }
}


export default Condition;
