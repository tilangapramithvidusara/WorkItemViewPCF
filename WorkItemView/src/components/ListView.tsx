import { Avatar, List, Spin } from 'antd';
import * as React from 'react';

// import { data, sampleDBData, sampleObject } from '../sample/data';
import ListItem from './ListItem';
import { openSidePane } from '../utils/pane.open.utils';
import { retrieveTreeDataRequest } from '../apis/data.retrive';
import { paneValues } from '../constants/state.constants';

const ListView = ({imageUrl}: {imageUrl: string}) => {
  const [listData, setListData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  
  const openDetailViewHandler = React.useCallback((info: any) => {
    
    openSidePane(
      info.logicalName,
      info?.key,
      info,
    );
  }, []);

  const findEntityDetails = React.useCallback(async() => {
    setLoading(true);
    const retriveData = await retrieveTreeDataRequest();
    setListData(retriveData);
    setLoading(false);
  }, [])

  React.useEffect(() => {
    findEntityDetails();
  }, []);

  const handleClickOutside = (event: any) => {
    if (
      event.toElement?.textContent === paneValues.SAVE || 
      event.toElement?.textContent === paneValues.DELETE || 
      event.toElement?.textContent === paneValues.SAVEANDCLOSE || 
      event.toElement?.textContent === paneValues.DEACTIVATE
    ) {
      findEntityDetails();
    }
  };

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={{
      width: '50%',
      alignContent: 'flex-start',
      alignItems: 'flex-start'
    }}>
      <Spin spinning={loading}>
        <List
          itemLayout="horizontal"
          dataSource={listData}
          renderItem={(item, index) => (
            <ListItem item={item} index={index} itemPressHandler={openDetailViewHandler} imageUrl={imageUrl}/>
          )}
        />
      </Spin>
    </div>
  )
}

export default React.memo(ListView);