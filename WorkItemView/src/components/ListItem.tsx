import { Avatar, List } from 'antd';
import * as React from 'react';
import { memo } from 'react';
// import dots from '../images/dots.png';

const ListItem = ({item, index, itemPressHandler}: {item: any; index: number; itemPressHandler: any}) => {
  return (
    <List.Item style={{ textAlign: 'left' }} key={item.id} onClick={() => itemPressHandler(item)}>
      <List.Item.Meta
        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
        // avatar={<Avatar src={dots} />}
        title={item.name}
        // {<a href="https://ant.design">{item.name}</a>}
        // description=""
      />
    </List.Item>
  )
}

export default memo(ListItem);
