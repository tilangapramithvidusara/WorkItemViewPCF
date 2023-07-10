import { Avatar, List } from 'antd';
import * as React from 'react';

import { data } from '../sample/data';
import ListItem from './ListItem';
import { openSidePane } from '../utils/pane.open.utils';
import { nameMapping } from '../constants/state.constants';

const ListView = () => {
  const [currenEntityLogicalName, setCurrentEntityLogicalName] = React.useState<string>('');
  const [currenEntity, setCurrentEntity] = React.useState<string>(currenEntityLogicalName ? nameMapping[currenEntityLogicalName] : '');

  const openDetailViewHandler = React.useCallback((info: any) => {
    console.log('openDetailViewHandler =====> ', info);
    
    openSidePane(
      'Sample Entity',
      'id-0001-0002',
      {
        title: "Sample Title",
        imageSrc: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
        id: "id-0001-0002"
      }
    );
  }, []);

  const findEntityDetails = React.useCallback(async() => {
    const currentLogicalName = await window.parent.Xrm.Page.ui._formContext.contextToken.entityTypeName;
    console.log('current logical name ====> ', currentLogicalName);
    setCurrentEntityLogicalName(currentLogicalName);
    // window.parent.Xrm.Page.getAttribute();
  }, [])

  React.useEffect(() => {
    findEntityDetails();
  }, []);

  return (
    <div style={{
      width: '50%',
      alignContent: 'flex-start',
      alignItems: 'flex-start'
    }}>
      <div className='title'>
        <p>{currenEntityLogicalName}</p>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <ListItem item={item} index={index} itemPressHandler={openDetailViewHandler}/>
        )}
      />
    </div>
  )
}

export default React.memo(ListView);