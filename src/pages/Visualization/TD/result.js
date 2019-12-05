import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { connect } from 'dva';
import DataSet from '@antv/data-set';
import Wordcloud from '../GG/wordcloud';

import styles from '../GG/index.less';
import { Table, Divider, Tag } from 'antd';

import { Row, Col } from 'antd';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Legend,
  Coord,
  Label,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import chart from '../../../../mock/chart';
import Dataset from '../../Dataset/View';


@connect(({ analysis }) => ({
  analysis,
}))
class Result extends PureComponent {


  render() {
    const { datasetsList, selectedDatasetProperties, conditions, querySet } = this.props.analysis;

    const columns = [
      {
        title: 'Demension',
        dataIndex: 'Demension',
        key: 'Demension',
      },
      {
        title: 'Data Type',
        dataIndex: 'Data Type',
        key: 'Data Type',
      },
      {
        title: 'Max Value',
        dataIndex: 'Max Value',
        key: 'Max Value',
      },

      {
        title: 'Min Value',
        dataIndex: 'Min Value',
        key: 'Min Value',
      },


    ];
    let dataDesc = []
    Object.entries(selectedDatasetProperties).forEach(([item,value]) => {
      let record = {}
      record['Demension'] = item
      record['Data Type'] = value['dtype']
      record['Max Value'] = value['drange'][0]
      record['Min Value'] = value['drange'][1]
      dataDesc.push(record)
    });

    let chartIns = null;
    const colors = ['#ffc53d','#ffc069','#36cfc9','#ff85c0','#ff9c6e','#ff7875']
    const ds = new DataSet();
    const dv = ds.createView().source(querySet);
    dv.transform({
      type:'map',
      callback(row){
        if(conditions.groups.length > 1){
          row[conditions.groups[0]] = row[conditions.groups[0]].toString()
        }
        return row
      }
    })

    let gemos = []
    let legend_items= []
    let axis = []
    let geomIndex = 0
    let isOdd = 0
    conditions.groups.forEach(group => {

      let color = colors[geomIndex]
      // console.log(conditions.metric.length)

      if (conditions.metric.length > 1){
        for (let i=0;  i<conditions.metric.length; i++){
          if (i%2 === 0){
            gemos.push(<Geom　type='line' position={`${group}*${conditions.metric[i]['column']}`} size={2} />)
            gemos.push(<Geom　type='point' position={`${group}*${conditions.metric[i]['column']}`} size={2} shape={'circle'}>

              <Label content={`${conditions.metric[i]['column']}`} position='middle'/>

            </Geom>)


          }else{
            gemos.push(<Geom type='interval' position={`${group}*${conditions.metric[i]['column']}`} color={color}>
              <Label content={`${conditions.metric[i]['column']}`} position='middle'/>
            </Geom>)

          }
          geomIndex ++;
        }
      }else{
        gemos.push(<Geom type='interval' position={`${group}*${conditions.metric[0]['column']}`} color={color}>
          <Label content={`${conditions.metric[0]['column']}`} position='middle'/>
        </Geom>)
      }
        axis.push(<Axis name={group} grid={null} label={{textStyle:{ fill: "#fdae6b",fontSize:'14',fontWeight:'bold'}}} />)
        })




    return (
      // select the predicted dataset to be analyzed
      <div>
        <Row>
            {/*{column}*/}
            {/*{ dataDesc }*/}
            <Table dataSource={dataDesc} columns={columns} size='small' scroll={{ y: 100 }}/>
        </Row>

        <Row>
          <div>
            <Chart
              height={400}
              padding={{ top: 20, right: 30, bottom: 20, left: 40 }}
              forceFit
              data={dv}
              onGetG2Instance={chart1 => {
                chartIns = chart1;
              }}
            >
              <Legend
                textStyle={{
                  fontSize:'14',
                  fontWeight:'bold'
                }}
              />
              <Tooltip />
              { axis }
              {
                gemos
              }
            </Chart>
          </div>
        </Row>



      </div>

    );
  }
}


export default Result;
