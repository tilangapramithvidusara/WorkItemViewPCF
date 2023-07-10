import { Avatar, List } from 'antd';
import * as React from 'react';
import { memo } from 'react'

const ListItem = ({item, index, itemPressHandler}: {item: any; index: number; itemPressHandler: any}) => {
  return (
    <List.Item style={{ textAlign: 'left' }} key={item.id} onClick={() => itemPressHandler(item)}>
      <List.Item.Meta
        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
        title={item.name}
        // {<a href="https://ant.design">{item.name}</a>}
        // description=""
      />
    </List.Item>
  )
}

export default memo(ListItem);
