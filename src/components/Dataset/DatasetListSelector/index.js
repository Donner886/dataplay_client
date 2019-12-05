import React, { PureComponent } from 'react';
import { Select, Icon } from 'antd';

import styles from './index.less';

const { Option } = Select;

class DatasetListSelector extends PureComponent {
  render() {

    // datasetList: a set of datalist
    // selected: tag of selected
    // handlechange: function of handle selected option
    // queryList: ???
    // size: ???

    const { datasetList, queryList, selected, handleChange, size } = this.props;

    const buildOption = (item, type) => {
      let icon = 'table';
      if (type === 'query') {
        icon = 'search';
      }
      return (
        <Option key={item.dataSetName} value={item.dataSetName} type={type}>
          <span>
            {item.dataSetName} <Icon type={icon} />{' '}
          </span>
        </Option>
      );
    };

    const optionContents = datasetList.map(item => {
      return buildOption(item, 'dataset');
    });

    queryList.forEach(item => {
      optionContents.push(buildOption(item, 'query'));
    });

    const handleFilter = (input, option) => {
      return (
        option.props.children.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    };

    const handleSelectionChange = (value, option) => {
      handleChange(value, option.props.type);
    };

    return (
      <div className={styles.datasetListSelector}>
        <Select
          size={size}
          showSearch
          style={{ width: '100%' }}
          placeholder="Select a dataset"
          optionFilterProp="children"
          onChange={handleSelectionChange}
          filterOption={handleFilter}
          value={selected}
        >
          {optionContents}
        </Select>
      </div>
    );
  }
}

export default DatasetListSelector;
