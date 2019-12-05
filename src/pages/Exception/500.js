import React from 'react';
import { formatMessage } from 'umi/locale';
import Link from 'umi/link';
import Exception from '@/components/Exception';

const Exception500 = (type) => (
  <Exception
    type={type}
    desc={formatMessage({ id: 'app.exception.description.500' })}
    linkElement={Link}
    backText={formatMessage({ id: 'app.exception.back' })}
  />
);

export default Exception500(500);
