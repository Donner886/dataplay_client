import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Row, Icon, Button, Col, DatePicker, Select, Tooltip,message} from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;
let id = 0;
let metric_id = 0;
const DynamicFormItem = Form.create({
  name: '',

})(class extends React.Component {


    state = {
      dataset: this.props.dataset,
      filters: [],
      groups: [],
      metric: [],
      dataRange: [],
    };
    // state = this.props.conditions;

    setDataset = () => {
      return {
        ...this.state,
        dataset: this.props.dataset,
      };
    };

    setFilters = (k, component, value) => {
      this.state.filters.forEach(item => {
        if (item.id === k) {
          if (component === 'column') {
            item.column = value;
          } else if (component === 'operation') {
            item.operation = value;
          } else if (component === 'value') {
            item.value = value.target.value;

          }
        }
      });
      console.log(this.state);
    };

    // when add the metric, you should duplicate first.
    setMetic = (k, component, value) => {
      this.state.metric.forEach(item => {
        if (item.id === k) {
          if (component === 'column') {
            item.column = value;
          } else if (component === 'metric') {
            item.metric = value;
          }
        }
      });
      console.log(this.state);
    };

    setGroups = (value) => {
      this.state.groups = value;
      console.log(this.state)
    };

    setDateRange = (date,value) => {
      this.state.dataRange = value
      this.state.dataset = this.props.dataset
      console.log(this.state)
    };

    remove = k => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        keys: keys.filter(key => key !== k),
      });

      this.state.filters = this.state.filters.filter(fil => fil.id !== k);

      console.log(this.state.filters);

    };

    metric_remove = k => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('metric_keys');
      // We need at least one passenger
      if (keys.length === 1) {
        return;
      }

      // can use data-binding to set
      form.setFieldsValue({
        metric_keys: keys.filter(key => key !== k),
      });

      this.state.metric = this.state.metric.filter(fil => fil.id !== k);

      console.log(this.state.metric);

    };


    add = () => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('keys');
      let idx = id++;
      const nextKeys = keys.concat(idx);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys,
      });
      this.state.filters.push({ id: idx, column: '', operation: '', value: '' });
      this.state.dataset = this.props.dataset

      console.log(this.state);
    };

    metric_add = () => {
      const { form } = this.props;
      // can use data-binding to get
      const keys = form.getFieldValue('metric_keys');

      let idx = metric_id++;
      const nextKeys = keys.concat(idx);
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        metric_keys: nextKeys,
      });
      this.state.metric.push({ id: idx, column: '', metric: '' });
      this.state.dataset = this.props.dataset
      console.log(this.state);
    };


    handleSubmit = _ => {
      // validation here
      Object.entries(this.state).forEach(([item,value]) => {
        if(item !== 'filters'){
            if (value === '' || value.length === 0){
              message.error(`${item} should be empty` )
              return
            }else{
              this.props.onSubmit(this.state)
            }
        }
      })
    };

    render() {

      const { desc } = this.props;


      const { getFieldDecorator, getFieldValue } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 50 },
          sm: { span: 50 },
        },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 24, offset: 0 },
        },
      };

      const filter_columns_options = Object.keys(desc).map(item => {
        if (item.indexOf('index') === -1) {
          return (<Option key={item} value={item}>{item}</Option>);
        }
      });


      const operations = {
        lg: '>',
        lt: '<',
        eq: '=',
        lge: '>=',
        lte: '<=',
      };


      getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');

      const formItems = keys.map((k, index) => (

        <Form.Item
          required={false}
          key={k}
          style={{ marginBottom: '0px' }}
        >
          {getFieldDecorator(`filter_column[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
          })(
            <Col span={9}>
              <Select placeholder="Column"  onChange={value => this.setFilters(k, 'column', value)}>
                {filter_columns_options}
              </Select>
            </Col>)}
          {getFieldDecorator(`filter_operation[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
          })(
            <Col span={5}>
              <Select placeholder="><" onChange={value => this.setFilters(k, 'operation', value)}>
                <Option value='lg'>{operations.lg}</Option>
                <Option value='lt'>{operations.lt}</Option>
                <Option value='eq'>{operations.eq}</Option>
                <Option value='lge'>{operations.lge}</Option>
                <Option value='lte'>{operations.lte}</Option>
              </Select>
            </Col>)}

          {getFieldDecorator(`filter_value[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
          })(
            <Col span={7}>
              <Input placeholder="Value" onChange={value => this.setFilters(k, 'value', value)}/>
            </Col>)}

          {getFieldDecorator(`filter_deleteB[${k}]`, { validateTrigger: ['onChange', 'onBlur'] })(
            <Col span={2}>
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.remove(k)}
              />
            </Col>,
          )}
        </Form.Item>
      ));

      getFieldDecorator('metric_keys', { initialValue: [] });
      const metric_keys = getFieldValue('metric_keys');

      const metricItems = metric_keys.map((k, index) => (

        <Form.Item
          required={false}
          key={k}
          style={{ marginBottom: '0px' }}
        >
          {getFieldDecorator(`metic_column[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
          })(
            <Col span={9}>
              <Select placeholder="Column" onChange={value => this.setMetic(k, 'column', value)}>
                {filter_columns_options}
              </Select>
            </Col>)}
          {getFieldDecorator(`metric_operation[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
          })(
            <Col span={5}>
              <Select placeholder="Metric" onChange={value => this.setMetic(k, 'metric', value)}>
                <Option value='sum'>sum</Option>
                <Option value='count'>count</Option>
                <Option value='avg'>avg</Option>
                <Option value='mean'>mean</Option>
                <Option value='max'>max</Option>
                <Option value='min'>min</Option>
              </Select>
            </Col>)}


          {getFieldDecorator(`metric_deleteB[${k}]`, { validateTrigger: ['onChange', 'onBlur'] })(
            <Col span={2}>
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.metric_remove(k)}
              />
            </Col>,
          )}
        </Form.Item>
      ));




      return (
        <Form onSubmit={this.handleSubmit}>
          <h4 style={{fontSize:'14', fontWeight:'bold',marginTop:'10px',color:'red'}}>Please Choose correct condition arrording to Dataset Description shown Right Area</h4>
          <Form.Item label='DateRange'>
            {getFieldDecorator('dateRange')(<RangePicker
              ranges={{
                Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              showTime
              format='YYYY/MM/DD HH:mm:ss'
              onChange={this.setDateRange}
              placeholder={['StartTime','EndTime']}
              // value= {[this.state.dataRange[0],this.state.dataRange ]}
            />)}
          </Form.Item>


          <div>
            <Row>
              <h4>Filters
                <Tooltip title='Please assign correct value according to data descriptoin shows,
                Otherwise, can not get subsets you want.'>
                  <Icon type='question-circle' theme='filled' color='red'/>
                </Tooltip>
              </h4>

            </Row>

            {formItems}
            <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
              <Icon type="plus"/> Add Filter
            </Button>
          </div>


          <div>
            <Row>
              <h4>Group
                <Tooltip title='Select the base columns to be grouped.Note, Choosen too much columns will
                result in effectless of grouping function..'>
                  <Icon type='question-circle' theme='filled' color='red'/>
                </Tooltip>
              </h4>
            </Row>

            <Row>
              <Form.Item>
                {getFieldDecorator('groups')(<Select
                  mode='multiple'
                  placeholder="Grouped columns"
                  require='True'
                  // onChange={datasetChanged}
                  onChange={value => this.setGroups(value)}
                  style={{ width: '100%' }}>
                  {filter_columns_options}
                </Select>)}
              </Form.Item>

            </Row>
          </div>


          <div>
            <Row>
              <h4>Metrics
                <Tooltip title='Select Columns and Metrics accordingly.'>
                  <Icon type='question-circle' theme='filled' color='red'/>
                </Tooltip>
              </h4>
            </Row>

            <Row>
              {metricItems}
              <Button type="dashed" onClick={this.metric_add} style={{ width: '60%' }}>
                <Icon type="plus"/> Add Metric
              </Button>
            </Row>
          </div>


          <div>
            <Form.Item>
              <Button type='primary' htmlType='submit'>Analysize</Button>
            </Form.Item>
          </div>



        </Form>
      );
    }
  },
);

export default DynamicFormItem;
