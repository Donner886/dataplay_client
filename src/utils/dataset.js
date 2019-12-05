export default function convertDataset(payload) {
  // eslint-disable-line import/prefer-default-export
  const convertedDataset = {};
  if (payload) {
    let dataSource = [];
    let columns = [];

    // update source and columns based on dataset model
    if (payload.rows) {
      const { cols, rows } = payload;
      dataSource = rows
      columns = cols.map(col => {
        return {
          title: col,
          dataIndex: col,
          key: col,
        };
      });
    }

    convertedDataset.dataSource = dataSource;
    convertedDataset.columns = columns;
  }
  return convertedDataset;
}
