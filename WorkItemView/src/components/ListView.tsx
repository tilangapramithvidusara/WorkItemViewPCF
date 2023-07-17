import { Avatar, List } from 'antd';
import * as React from 'react';

// import { data, sampleDBData, sampleObject } from '../sample/data';
import ListItem from './ListItem';
import { openSidePane } from '../utils/pane.open.utils';
import { retrieveTreeDataRequest } from '../apis/data.retrive';

const ListView = ({imageUrl}: {imageUrl: string}) => {
  const [listData, setListData] = React.useState<any[]>([]);
  
  const openDetailViewHandler = React.useCallback((info: any) => {
    
    openSidePane(
      info.logicalName,
      info?.id,
      info,
    );
  }, []);

  const findEntityDetails = React.useCallback(async() => {
    const retriveData = await retrieveTreeDataRequest();
    setListData(retriveData);
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
      <List
        itemLayout="horizontal"
        dataSource={listData}
        renderItem={(item, index) => (
          <ListItem item={item} index={index} itemPressHandler={openDetailViewHandler} imageUrl={imageUrl}/>
        )}
      />
    </div>
  )
}

export default React.memo(ListView);