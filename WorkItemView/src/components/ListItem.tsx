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
        avatar={<Avatar src={imageUrl} />}
        title={item?.title}
        description={item?.workItemtype?.type}
      />
    </List.Item>
  )
}

export default memo(ListItem);
