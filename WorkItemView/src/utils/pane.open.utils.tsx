export const openSidePane = (
  entName?: string,
  entId?: string,
  e?: any
) => {
  const openPanes = window.parent.Xrm.App.sidePanes.getAllPanes();
  openPanes.forEach((item: any) => {
    window.parent.Xrm.App.sidePanes.getPane(item.paneId).close();
  });
  if (entId != null) {
    window.parent.Xrm.App.sidePanes
      .createPane({
        title: e?.title,
        // imageSrc: e?.imgUrl,
        paneId: e?.workItemsequance?.sequanceid,
        hideHeader: false,
        canClose: true,
        width: 800,
      })
      .then((pane: any) => {
        pane.navigate({
          pageType: "entityrecord",
          entityName: e?.workItemsequance?.logicalname,
          entityId: e?.workItemsequance?.sequanceid,
        });
      });
  } else {
    entId = "";
  }
}