import { Avatar, List } from 'antd';
import * as React from 'react';

import { data } from '../sample/data';
import ListItem from './ListItem';
import { openSidePane } from '../utils/pane.open.utils';
import { nameMapping } from '../constants/state.constants';

const ListView = ({imageUrl}: {imageUrl: string}) => {
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
    const locationId = await window.parent.Xrm.Page.getAttribute(currentLogicalName)?.getValue()[0]?.id?.replace("{", "").replace("}", "");
    console.log('location id =====> ', locationId);
    const result = await window.parent.Xrm.Page.ui.formContext.data.entity.getId();
    // const str = '{AC3FE85C-90E5-ED11-A7C7-000D3A338DD2}';
    const removedBrackets = result.replace(/[{}]/g, '');
    console.log('entity id -=======> ', removedBrackets, result);
    
    
    // window.parent.Xrm.Page.getAttribute();
  }, [])

  React.useEffect(() => {
    findEntityDetails();
  }, []);

  React.useEffect(() => {
    setCurrentEntity(currenEntityLogicalName ? nameMapping[currenEntityLogicalName] : '');
  }, [currenEntityLogicalName])

  return (
    <div style={{
      width: '50%',
      alignContent: 'flex-start',
      alignItems: 'flex-start'
    }}>
      <div className='title'>
        <p>{currenEntity}</p>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <ListItem item={item} index={index} itemPressHandler={openDetailViewHandler} imageUrl={imageUrl}/>
        )}
      />
    </div>
  )
}

export default React.memo(ListView);