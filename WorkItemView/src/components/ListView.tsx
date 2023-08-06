import { Avatar, List, Spin } from 'antd';
import * as React from 'react';

// import { data, sampleDBData, sampleObject } from '../sample/data';
import ListItem from './ListItem';
import { openSidePane } from '../utils/pane.open.utils';
import { retrieveTreeDataRequest } from '../apis/data.retrive';
import { paneValues } from '../constants/state.constants';

const ListView = ({imageUrl, defaultimageUrl}: {imageUrl: string, defaultimageUrl: string}) => {
  const [listData, setListData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = React.useState<string>('')
  // const [currentInternalId, setCurrentInternalId] = React.useState<string>('')
  const currentInternalId = React.useRef(null);
  
  const openDetailViewHandler = React.useCallback((info: any) => {
    
    openSidePane(
      info.logicalName,
      info?.key,
      info,
    );
  }, []);

  const findEntityDetails = React.useCallback(async(id?: any) => {
    setLoading(true);
    const retriveData = await retrieveTreeDataRequest({internalId: id});
    setListData(retriveData);
    setLoading(false);
  }, [])

  const useEffectHandler = async() => {
    const internalId = await window.parent.Xrm.Page.getAttribute("gyde_internalid").getValue()
    currentInternalId.current = internalId
    await findEntityDetails(internalId);
    const currentLogicalName = await window.parent.Xrm.Page.ui._formContext.contextToken.entityTypeName;
    // const internalId = window.parent.Xrm.Page.getAttribute("gyde_internalid").getValue()
    setCurrentLocation(currentLogicalName);
  }

  React.useEffect(() => {
    useEffectHandler();
  }, []);

  const handleClickOutside = (event: any) => {
    // const currentLogicalName = window.parent.Xrm.Page.ui._formContext.contextToken.entityTypeName;
    console.log('lllllll===> ', currentLocation);
    
    if (
      // currentLogicalName === currentLocation &&
      (event.toElement?.textContent === paneValues.SAVE || 
      event.toElement?.textContent === paneValues.DELETE || 
      event.toElement?.textContent === paneValues.SAVEANDCLOSE || 
      event.toElement?.textContent === paneValues.DEACTIVATE)
    ) {
      setTimeout(() => {
        findEntityDetails(currentInternalId?.current);
      }, 1000)
      
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
      // width: '50%',
      alignContent: 'flex-start',
      alignItems: 'flex-start'
    }}>
      <Spin spinning={loading}>
        <List
          itemLayout="horizontal"
          dataSource={listData}
          renderItem={(item, index) => (
            <ListItem item={item} index={index} itemPressHandler={openDetailViewHandler} imageUrl={imageUrl} defaultimageUrl={defaultimageUrl}/>
          )}
        />
      </Spin>
    </div>
  )
}

export default React.memo(ListView);