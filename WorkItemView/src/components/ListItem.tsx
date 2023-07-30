import { Avatar, List } from 'antd';
import * as React from 'react';
import { memo } from 'react';
interface MyComponentProps {
  imageUrl: string;
}

const ListItem = ({item, index, itemPressHandler, imageUrl}: {item: any; index: number; itemPressHandler: any, imageUrl: string}) => {
  return (
    <List.Item style={{ textAlign: 'left' }} key={item.id} onClick={() => itemPressHandler(item)}>
      <List.Item.Meta
        avatar={item?.icon ? <img src={`data:image/png;base64,${item?.icon}`} alt="icon" style={iconStyle} /> : null}
        title={item?.title}
        description={item?.workItemtype?.type}
      />
    </List.Item>
  )
}

const iconStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  marginRight: '10px',
  width: '20px',
  height: '20px',
};

export default memo(ListItem);
