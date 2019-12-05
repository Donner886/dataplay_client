import React, { PureComponent } from 'react';
import { Button, Table, Icon, Popconfirm, Tag} from 'antd';

import { EditableCell, EditableFormRow } from './EditableCell';
import { returnAtIndex } from 'lodash-decorators/utils';

class ConfigTab extends PureComponent {
  render() {
    const { data, handleChange,  } = this.props;
    const handleSave = row => {
      handleChange(row);
    };
    //
    // const handleSave  = function(row) {
    //   return handleChange.bind(row)
    // }

    // Build Tab Content, add row into table
    const buildTabContent = val => {
      const dataSource = [];
      let columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'FileName', // column title, shows in table column
          dataIndex: 'filename', // data index of the column in datasource
          key: 'filename', // data key of the column in datasource
        },
        {
          title: 'Path',
          dataIndex: 'path',
          key: 'path',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Features',
          dataIndex: 'features',
          key: 'features',
        },

        {
          title: 'Department',
          dataIndex: 'department',
          key: 'department',
        },
        {
          title: 'Team',
          dataIndex: 'team',
          key: 'team',
        },
        {
          title: 'Version',
          dataIndex: 'version',
          key: 'version',
        },
        {
          title: 'UpdateTime',
          dataIndex: 'updateDate',
          key: 'updateDate',
        },
        {
          title: 'IsDeployed',
          dataIndex: 'isDeployed',
          key:'status',
          align:'center',
          render: (text,record) => {
            const status = record.isDeployed === false ? 'No' : 'Yes'
            const color = record.isDeployed === false ? 'red' : 'green'
            return (<span><Tag color={color} key={status}>{status}</Tag></span>)
          },

        },
        // {
        //   title: 'IsDeployed',
        //   dataIndex: 'isDeployed',
        //   key: 'isDeployed',
        // },
        {
          title:'Operation',
          dataIndex:'Operation',
          render: (text,record) => {
            const operation = record.isDeployed === false ? 'Deploy' : 'Undeploy';
            const title = record.isDeployed === false ? 'Are you want to deploy the model' : 'are you want to undeploy the model';
            // return ( <Button type={style} onClick={handleSave.bind(record)}>{operation}</Button>)
            return (<Popconfirm title={title} onConfirm={() => handleSave(record)}><a>{operation}</a> </Popconfirm>)
          },
        }
      ];
      Object.keys(val).forEach(section => {
        // Object.keys(val[section]).forEach(item => {
        //   dataSource.push(item);
        // });
        val[section]['key'] = val[section]['id']
        dataSource.push(val[section])
      });

      columns = columns.map(col => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
        };
      });
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
      return (
        <Table components={components} columns={columns} dataSource={dataSource} size="small" />
      );
    };

    return buildTabContent(data);
  }
}

export default ConfigTab;
